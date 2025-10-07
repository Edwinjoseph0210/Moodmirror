# Moodmirror

MoodMirror is an AI-powered web application that analyzes a user's text or selfie and visualizes their current mood through color palettes, emojis, and smooth data art.

## Features

- **Mood Analysis**: Analyze text or selfies to detect emotional tone
- **Visual Representation**: See your mood represented through color palettes and data visualizations
- **Mood History**: Track your emotional states over time
- **Personalized Captions**: Get AI-generated mood captions based on your emotional state
- **Dark/Light Mode**: Toggle between dark and light themes

## Project Architecture

### Frontend (React + TailwindCSS)

- React for UI components and state management
- TailwindCSS for styling
- Framer Motion for smooth animations
- Chart.js for data visualization
- Local storage for persisting mood history

### Backend (Python + FastAPI)

- FastAPI for the REST API
- Sentiment analysis for text inputs
- Facial emotion detection for selfies
- Caption generation using language models

## Data Flow

1. User inputs text or uploads a selfie
2. Frontend sends data to backend API
3. Backend processes the input:
   - For text: Performs sentiment analysis
   - For images: Performs facial emotion detection
4. Backend returns emotion data (emotion type, intensity score, optional caption)
5. Frontend visualizes the results with colors, charts, and animations
6. Results are stored in local storage for history tracking

## Setup Instructions

### Frontend

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

### Backend

```bash
# Navigate to backend directory
cd backend

# Create a virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server
python -m app.main
```

## API Endpoints

- `POST /api/analyze/text`: Analyze text input
  - Request body: `{"text": "your text here", "generate_caption": true}`
  
- `POST /api/analyze/image`: Analyze image input
  - Request body: Form data with `image` file and optional `generate_caption` boolean

## Future Enhancements

- Export mood as a shareable "card" image
- More detailed mood trend analysis
- Integration with external APIs for more accurate emotion detection
- User accounts for cross-device synchronization

## Technologies Used

- React
- TailwindCSS
- Framer Motion
- Chart.js
- FastAPI
- Python
- Sentiment Analysis Models
- Facial Emotion Detection
