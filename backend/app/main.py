from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import os
import numpy as np
from typing import Optional
import random

# Import our utility functions
from app.utils.text_analysis import analyze_text_sentiment
from app.utils.image_analysis import analyze_face_emotion
from app.utils.caption_generator import generate_mood_caption

# Create FastAPI app
app = FastAPI(
    title="MoodMirror API",
    description="API for analyzing mood from text and images",
    version="0.1.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class TextRequest(BaseModel):
    text: str
    generate_caption: Optional[bool] = False

class MoodResponse(BaseModel):
    emotion: str
    score: float
    caption: Optional[str] = None

# Routes
@app.get("/")
async def read_root():
    return {"message": "Welcome to MoodMirror API"}

@app.post("/api/analyze/text", response_model=MoodResponse)
async def analyze_text(request: TextRequest):
    try:
        # Analyze text sentiment
        emotion, score = analyze_text_sentiment(request.text)
        
        # Generate caption if requested
        caption = None
        if request.generate_caption:
            caption = generate_mood_caption(emotion, request.text)
        
        return MoodResponse(
            emotion=emotion,
            score=score,
            caption=caption
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/analyze/image", response_model=MoodResponse)
async def analyze_image(image: UploadFile = File(...), generate_caption: bool = Form(False)):
    try:
        # Check if file is an image
        if not image.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Read image content
        contents = await image.read()
        
        # Analyze face emotion
        emotion, score = analyze_face_emotion(contents)
        
        # Generate caption if requested
        caption = None
        if generate_caption:
            caption = generate_mood_caption(emotion)
        
        return MoodResponse(
            emotion=emotion,
            score=score,
            caption=caption
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)