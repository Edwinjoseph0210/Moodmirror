import os
import random
import numpy as np

# In a real implementation, we would use a proper sentiment analysis model
# such as transformers from HuggingFace or OpenAI's API

# For demonstration purposes, we'll create a simple mock implementation
# In production, replace this with actual model inference

def analyze_text_sentiment(text):
    """
    Analyze the sentiment/emotion in the provided text.
    
    Args:
        text (str): The text to analyze
        
    Returns:
        tuple: (emotion, score) where emotion is a string and score is a float 0-100
    """
    # In a real implementation, we would use:
    # 1. HuggingFace transformers for sentiment analysis
    # from transformers import pipeline
    # sentiment_analyzer = pipeline("sentiment-analysis")
    # result = sentiment_analyzer(text)[0]
    # 
    # 2. Or OpenAI API
    # import openai
    # openai.api_key = os.getenv("OPENAI_API_KEY")
    # response = openai.Completion.create(model="text-davinci-003", prompt=f"Analyze the emotion in this text: {text}")
    
    # For demo purposes, we'll use a simple keyword-based approach
    text = text.lower()
    
    # Define emotion keywords
    emotion_keywords = {
        "happy": ["happy", "joy", "excited", "great", "wonderful", "love", "glad", "pleased", "delighted", "content"],
        "sad": ["sad", "unhappy", "depressed", "down", "miserable", "upset", "disappointed", "gloomy", "heartbroken"],
        "angry": ["angry", "mad", "furious", "annoyed", "irritated", "frustrated", "outraged", "enraged"],
        "neutral": ["okay", "fine", "neutral", "average", "alright", "so-so"],
        "surprised": ["surprised", "shocked", "amazed", "astonished", "stunned", "wow", "unexpected"],
        "fearful": ["afraid", "scared", "fearful", "terrified", "anxious", "worried", "nervous", "panic"]
    }
    
    # Count occurrences of emotion keywords
    emotion_counts = {emotion: 0 for emotion in emotion_keywords}
    for emotion, keywords in emotion_keywords.items():
        for keyword in keywords:
            if keyword in text:
                emotion_counts[emotion] += 1
    
    # Determine the dominant emotion
    max_count = max(emotion_counts.values())
    if max_count == 0:  # No emotion keywords found
        dominant_emotion = random.choice(["happy", "sad", "neutral", "angry", "surprised", "fearful"])
    else:
        # Get all emotions with the max count
        dominant_emotions = [emotion for emotion, count in emotion_counts.items() if count == max_count]
        dominant_emotion = random.choice(dominant_emotions)
    
    # Generate a score (0-100) with some randomness but weighted toward the emotion
    base_score = random.randint(60, 90)  # Base score between 60-90
    variation = random.randint(-10, 10)  # Add some variation
    score = min(max(base_score + variation, 0), 100)  # Ensure score is between 0-100
    
    return dominant_emotion, score