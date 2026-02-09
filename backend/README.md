# Booking Backend API

This project uses FastAPI and Supabase.

## Prerequisites

- Python 3.8+
- Supabase Project (URL and Key provided in `.env`)

## Setup

1.  **Initialize Database**:
    Go to your [Supabase Dashboard](https://supabase.com/dashboard) -> SQL Editor.
    Run the content of `backend/schema.sql` to create the table and policies.

2.  **Environment Setup**:
    ```bash
    cd backend
    python -m venv venv
    
    # Windows
    venv\Scripts\activate
    
    # Install dependencies
    pip install -r requirements.txt
    ```

3.  **Run the Server**:
    ```bash
    uvicorn main:app --reload
    ```

    The API will be available at: http://127.0.0.1:8000
    Docs: http://127.0.0.1:8000/docs
