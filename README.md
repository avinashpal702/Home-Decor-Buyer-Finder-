# Hearth & Home

Hearth & Home is a polished home-decor marketplace website that helps buyers discover meaningful pieces for their living spaces and gives sellers a simple way to list and share their finds. The experience pairs a warm editorial brand with practical marketplace functionality.

## Overview

This enhanced website includes:

- A contemporary landing page with featured home collections and storytelling content
- A browsing experience with search filters for keyword, category, and location/state
- A seller submission flow for adding listings to the marketplace
- A buyer contact request flow that records interest and triggers email outreach
- A FastAPI backend with SQLite persistence for local development

## Features

- Elegant homepage with curated interior inspiration
- Browse and filter inventory by keyword, category, and state
- Seller onboarding form for adding new product listings
- Buyer request form for contacting a seller about a specific item
- Responsive navigation and refined visual styling
- API-backed data flow between the React frontend and FastAPI backend
- SendGrid integration for buyer confirmation emails and seller notifications

## Tech Stack

- Frontend: React, React Router, Axios
- Styling: custom CSS with responsive layout patterns
- Backend: FastAPI, SQLModel
- Database: SQLite (default for local development)
- Email: SendGrid
- Runtime tooling: Node.js + npm, Python 3.10+

## Project Structure

```text
buyer-finder/
├── backend/
│   ├── main.py
│   ├── models.py
│   ├── buyer_finder.db
│   └── __pycache__/
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── node_modules/
├── docker-compose.yml
├── README.md
├── .gitignore
└── .venv/
```

## Prerequisites

Before running the app locally, install:

- Node.js 18+
- npm
- Python 3.10+
- Optional: Docker and Docker Compose

## Backend Setup

1. Open a terminal in the project root and navigate to the backend folder:

```bash
cd buyer-finder/backend
```

2. Create and activate a virtual environment:

```bash
python -m venv .venv
```

Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

Windows Command Prompt:

```cmd
.venv\Scripts\activate.bat
```

3. Install backend dependencies:

```bash
pip install fastapi uvicorn sqlmodel python-dotenv httpx "pydantic[email]"
```

4. Create a `.env` file in the backend directory:

```env
DATABASE_URL=sqlite:///./buyer_finder.db
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=noreply@yourdomain.com
```

5. Start the API server:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

The API is available at:

- http://localhost:8000
- API docs: http://localhost:8000/docs

## Frontend Setup

1. Open a second terminal and move to the frontend project:

```bash
cd buyer-finder/frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the React development server:

```bash
npm start
```

The website will run at:

- http://localhost:3000

## How the App Works

1. Sellers use the “Sell with us” page to add a new product entry.
2. The item is saved through the backend to the SQLite database.
3. Buyers use the “Explore” page to browse listings and filter by keyword, category, or state.
4. Interested buyers submit a request through the contact form.
5. The backend records the request and sends a confirmation email via SendGrid.

## API Overview

### Sellers

- `POST /sellers` — create a seller profile

### Items

- `POST /items` — create a new item listing
- `GET /items` — list items with optional filters:
  - `category`
  - `state`
  - `keyword`
  - `limit`

### Buyer Requests

- `POST /match` — log a buyer interest request and enqueue the email process

## Optional Docker Workflow

From the project root:

```bash
docker-compose up --build
```

This is useful for a containerized local setup, while the frontend is commonly run locally with `npm start`.

## Notes

- The frontend uses a proxy to `http://localhost:8000` in `frontend/package.json`.
- If `SENDGRID_API_KEY` is missing, email sends will fail until the value is configured.
- The default database is SQLite for easy local development and prototyping.

## License

This project is intended for learning, local development, and small-marketplace experimentation.
