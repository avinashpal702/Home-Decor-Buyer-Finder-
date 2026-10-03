# models.py
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List

class Seller(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: str = Field(index=True, unique=True)

    items: List["Item"] = Relationship(back_populates="seller")


class Item(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    seller_id: int = Field(foreign_key="seller.id")
    title: str
    description: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = None
    state: Optional[str] = None          # US state, e.g. "California"
    image_url: Optional[str] = None

    seller: Seller = Relationship(back_populates="items")
    requests: List["BuyerRequest"] = Relationship(back_populates="item")


class BuyerRequest(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    item_id: int = Field(foreign_key="item.id")
    buyer_name: str
    buyer_email: str
    created_at: Optional[str] = Field(default_factory=lambda: None)
    email_sent: bool = Field(default=False)

    item: Item = Relationship(back_populates="requests")