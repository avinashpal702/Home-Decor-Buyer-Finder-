# Home-Decor Buyer Finder

A small marketplace app for home decor sellers and buyers. Sellers can list items, buyers can search listings and request contact, and the backend stores requests and sends an email notification using SendGrid.

## Features

- Seller form to add a new home decor item
- Item listing with search filters by keyword, category, and state
- Buyer request form to request contact for an item
- FastAPI backend with SQLite by default
- React frontend with multiple pages and navigation
- Email support via SendGrid

## Project Structure

```text
buyer-finder/
├── backend/
│   ├── main.py
│   ├── models.py
│   └── __pycache__/
├── frontend/
│   ├── src/
│   ├── package.json
│   └── node_modules/
├── docker-compose.yml
├── README.md
└── .gitignore
```

## Tech Stack

- Frontend: React + React Router
- Backend: FastAPI + SQLModel
- Database: SQLite (default for local development)
- Email: SendGrid
- Container support: Docker Compose

## Prerequisites

Before running the app, install:

- Node.js and npm
- Python 3.10+
- Optional: Docker and Docker Compose

## Backend Setup

1. Go to the backend folder:

```bash
cd buyer-finder/backend
```

2. Create a virtual environment (optional but recommended):

```bash
python -m venv .venv
```

3. Activate the environment:

- Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

- Windows Command Prompt:

```cmd
.venv\Scripts\activate.bat
```

4. Install Python dependencies:

```bash
pip install fastapi uvicorn sqlmodel python-dotenv httpx "pydantic[email]"
```

5. Create a `.env` file in the backend folder with values like:

```env
DATABASE_URL=sqlite:///./buyer_finder.db
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=noreply@yourdomain.com
```

6. Start the API:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

The API will be available at:

- http://localhost:8000
- Swagger UI: http://localhost:8000/docs

## Frontend Setup

1. Go to the frontend folder:

```bash
cd buyer-finder/frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the React app:

```bash
npm start
```

The app will run at:

- http://localhost:3000

## Running with Docker

From the project root:

```bash
docker-compose up --build
```

This will start the PostgreSQL database and API container. The frontend is typically run locally with `npm start`.

## API Overview

### Seller

- `POST /sellers` – create a seller

### Items

- `POST /items` – create an item under a seller
- `GET /items` – list items with optional filters:
  - `category`
  - `state`
  - `keyword`
  - `limit`

### Buyer Requests

- `POST /match` – log a buyer request and trigger email sending

## Notes

- The app uses SQLite by default for local development.
- If `SENDGRID_API_KEY` is missing, email sending will fail with a runtime error until it is configured.
- The frontend proxies API calls to `http://localhost:8000` via the `proxy` field in `frontend/package.json`.

## License

This project is for learning and local development purposes.
