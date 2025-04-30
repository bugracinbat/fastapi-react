# FastAPI React App

A modern full-stack application built with FastAPI and React.

## Project Structure

```
.
├── backend/         # FastAPI backend
│   ├── main.py
│   └── requirements.txt
└── frontend/        # React frontend
    ├── src/
    ├── package.json
    └── vite.config.ts
```

## Backend Setup

1. Create a virtual environment:

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Run the backend server:

```bash
uvicorn main:app --reload
```

The backend will be available at http://localhost:8000

## Frontend Setup

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Run the development server:

```bash
npm run dev
```

The frontend will be available at http://localhost:5173

## Features

- FastAPI backend with CORS configuration
- React frontend with TypeScript
- Modern UI with Tailwind CSS
- API integration between frontend and backend
