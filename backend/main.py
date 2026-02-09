from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client, Client
import os
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Initialize Supabase Client
url: str = os.environ.get("SUPABASE_URL") or ""
key: str = os.environ.get("SUPABASE_KEY") or ""

if not url or not key:
    raise ValueError("SUPABASE_URL and SUPABASE_KEY must be set in .env file")

supabase: Client = create_client(url, key)

# Pydantic Models
class BookingCreate(BaseModel):
    guest_name: str
    booking_date: str  # Format: "2023-10-27T10:00:00"
    notes: str | None = None
    user_id: str | None = None  # Optional for now to support both guest and auth bookings

class BookingUpdate(BaseModel):
    status: str

# API Endpoints

@app.get("/")
def read_root():
    return {"message": "Welcome to the Booking API. Use /bookings to interact."}

@app.get("/bookings")
def get_bookings(user_id: str | None = None):
    """Fetch all bookings, optionally filtered by user_id."""
    try:
        query = supabase.table("bookings").select("*").order("created_at", desc=True)
        if user_id:
            query = query.eq("user_id", user_id)
        
        response = query.execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/bookings")
def create_booking(booking: BookingCreate):
    """Create a new booking."""
    data = booking.model_dump()
    data['status'] = 'pending' # Default status
    
    try:
        response = supabase.table("bookings").insert(data).execute()
        return response.data
    except Exception as e:
        # Check for specific Supabase errors if needed
        raise HTTPException(status_code=400, detail=f"Error creating booking: {str(e)}")

@app.put("/bookings/{booking_id}")
def update_booking_status(booking_id: int, booking: BookingUpdate):
    """Update booking status (e.g., 'confirmed', 'cancelled')."""
    try:
        response = supabase.table("bookings").update({"status": booking.status}).eq("id", booking_id).execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.delete("/bookings/{booking_id}")
def delete_booking(booking_id: int):
    """Delete a booking."""
    try:
        response = supabase.table("bookings").delete().eq("id", booking_id).execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/search")
def search_places(q: str = Query(..., min_length=1)):
    """Search for places using SerpApi."""
    api_key = os.environ.get("SERPAPI_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="Server configuration error: Missing API Key")

    try:
        # SerpApi Google Maps Search
        params = {
            "engine": "google_maps",
            "q": q,
            "type": "search",
            "api_key": api_key,
            "limit": 10 
        }
        
        if "hotel" in q.lower():
             params["engine"] = "google_hotels"
             params["engine"] = "google_maps"

        response = requests.get("https://serpapi.com/search.json", params=params)
        response.raise_for_status()
        data = response.json()

        results = []
        
        # Parse Local Results
        if "local_results" in data:
            for item in data["local_results"]:
                results.append({
                    "title": item.get("title"),
                    "thumbnail": item.get("thumbnail"),
                    "rating": item.get("rating"),
                    "reviews": item.get("reviews"),
                    "address": item.get("address"),
                    "gps_coordinates": item.get("gps_coordinates"), # {latitude, longitude}
                    "place_id": item.get("place_id")
                })
        
        return results

    except Exception as e:
        print(f"Search Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
