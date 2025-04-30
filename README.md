# FastAPI React Todo App

A modern, full-stack todo application built with FastAPI and React, featuring user authentication and a beautiful Vercel-inspired UI.

## Features

- 🔐 User Authentication (Signup/Login)
- ✅ Todo Management
  - Create, Read, Update, Delete todos
  - Priority levels (Low, Medium, High)
  - Categories/Tags
  - Due dates
- 🎨 Modern UI with Vercel-inspired design
- 🔍 Search and filter capabilities
- 🌙 Dark theme

## Tech Stack

### Backend

- FastAPI (Python web framework)
- SQLAlchemy (ORM)
- Pydantic (Data validation)
- JWT Authentication
- SQLite Database

### Frontend

- React 18
- TypeScript
- Tailwind CSS
- Axios for API calls
- Vite for development and building

## Project Structure

```
fastapi-react/
├── backend/
│   ├── app/
│   │   ├── models/       # SQLAlchemy models
│   │   ├── schemas/      # Pydantic schemas
│   │   ├── routes/       # API endpoints
│   │   └── utils/        # Helper functions
│   ├── requirements.txt
│   └── main.py          # FastAPI application
└── frontend/
    ├── src/
    │   ├── components/   # React components
    │   ├── App.tsx      # Main React component
    │   └── main.tsx     # Entry point
    ├── package.json
    └── index.html
```

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Create and activate virtual environment:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Run the FastAPI server:

```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## API Documentation

Once the backend is running, you can access:

- Interactive API documentation: `http://localhost:8000/docs`
- Alternative API documentation: `http://localhost:8000/redoc`

## Development

### Environment Variables

Create a `.env` file in the backend directory:

```
SECRET_KEY=your_secret_key
```

### Available Scripts

Backend:

- `uvicorn main:app --reload` - Start the FastAPI development server

Frontend:

- `npm run dev` - Start the Vite development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
