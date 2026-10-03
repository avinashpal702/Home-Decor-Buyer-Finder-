# main.py
import os
from typing import Optional

from fastapi import FastAPI, HTTPException, BackgroundTasks
from sqlmodel import Session, SQLModel, create_engine, select
from pydantic import BaseModel, EmailStr
from dotenv import load_dotenv
import httpx

from models import Seller, Item, BuyerRequest

load_dotenv()  # reads .env (or .env.example)
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./buyer_finder.db")
SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")
FROM_EMAIL = os.getenv("FROM_EMAIL", "noreply@yourdomain.com")

engine = create_engine(DATABASE_URL, echo=False)
SQLModel.metadata.create_all(engine)

app = FastAPI(title="Home‑Decor Buyer Finder")


# ---------- Pydantic request bodies ----------
class SellerCreate(BaseModel):
    name: str
    email: EmailStr


class ItemCreate(BaseModel):
    seller_id: int
    title: str
    description: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = None
    state: Optional[str] = None
    image_url: Optional[str] = None


class BuyerRequestCreate(BaseModel):
    item_id: int
    buyer_name: str
    buyer_email: EmailStr


# ---------- Helper: send email ----------
def send_email(to_email: str, subject: str, html_body: str):
    """Send a transactional email via SendGrid (replace with any provider)."""
    if not SENDGRID_API_KEY:
        raise RuntimeError("SENDGRID_API_KEY not configured")

    payload = {
        "personalizations": [{"to": [{"email": to_email}]}],
        "from": {"email": FROM_EMAIL},
        "subject": subject,
        "content": [{"type": "text/html", "value": html_body}],
    }
    response = httpx.post(
        "https://api.sendgrid.com/v3/mail/send",
        headers={
            "Authorization": f"Bearer {SENDGRID_API_KEY}",
            "Content-Type": "application/json",
        },
        json=payload,
        timeout=10.0,
    )
    response.raise_for_status()


# ---------- API routes ----------
@app.post("/sellers")
def create_seller(seller: SellerCreate):
    with Session(engine) as s:
        db_seller = Seller.from_orm(seller)
        s.add(db_seller)
        s.commit()
        s.refresh(db_seller)
        return db_seller


@app.post("/items")
def create_item(item: ItemCreate):
    with Session(engine) as s:
        seller = s.get(Seller, item.seller_id)
        if not seller:
            raise HTTPException(status_code=404, detail="Seller not found")
        db_item = Item.from_orm(item)
        s.add(db_item)
        s.commit()
        s.refresh(db_item)
        return db_item


@app.get("/items")
def list_items(
    category: Optional[str] = None,
    state: Optional[str] = None,
    keyword: Optional[str] = None,
    limit: int = 50,
):
    """Simple filter – good for an MVP."""
    with Session(engine) as s:
        stmt = select(Item)
        if category:
            stmt = stmt.where(Item.category.ilike(f"%{category}%"))
        if state:
            stmt = stmt.where(Item.state.ilike(f"%{state}%"))
        if keyword:
            stmt = stmt.where(
                (Item.title.ilike(f"%{keyword}%"))
                | (Item.description.ilike(f"%{keyword}%"))
            )
        stmt = stmt.limit(limit)
        results = s.exec(stmt).all()
        return results


@app.post("/match")
def match_item(
    payload: BuyerRequestCreate,
    background_tasks: BackgroundTasks,
):
    """Buyer selects an item → we record the request and email the buyer."""
    with Session(engine) as s:
        item = s.get(Item, payload.item_id)
        if not item:
            raise HTTPException(status_code=404, detail="Item not found")

        br = BuyerRequest(
            item_id=payload.item_id,
            buyer_name=payload.buyer_name,
            buyer_email=payload.buyer_email,
        )
        s.add(br)
        s.commit()
        s.refresh(br)

        html = f"""
        <p>Hello {payload.buyer_name},</p>
        <p>Thanks for your interest in <strong>{item.title}</strong>.</p>
        <p>Seller contact details:</p>
        <ul>
          <li>Name: {item.seller.name}</li>
          <li>Email: {item.seller.email}</li>
        </ul>
        <p>Item description: {item.description or "N/A"}</p>
        <p>We’ve forwarded your request to the seller. They will get back to you shortly.</p>
        """
        subject = f"Info about \"{item.title}\" – Home‑Decor Marketplace"
        background_tasks.add_task(send_email, payload.buyer_email, subject, html)

        return {"msg": "Request recorded – email on its way", "request_id": br.id}
