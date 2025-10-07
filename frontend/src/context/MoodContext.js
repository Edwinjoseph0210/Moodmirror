import React, { createContext, useState, useEffect } from 'react';

export const MoodContext = createContext();

export const MoodProvider = ({ children }) => {
  const [currentMood, setCurrentMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load mood history from localStorage on initial render
  useEffect(() => {
    const storedHistory = localStorage.getItem('moodHistory');
    if (storedHistory) {
      try {
        setMoodHistory(JSON.parse(storedHistory));
      } catch (e) {
        console.error('Error parsing mood history from localStorage', e);
      }
    }
  }, []);

  // Save mood history to localStorage whenever it changes
  useEffect(() => {
    if (moodHistory.length > 0) {
      localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
    }
  }, [moodHistory]);

  // Function to analyze text using the backend API
  const analyzeText = async (text) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8000/api/analyze/text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze text');
      }
      
      const data = await response.json();
      const newMood = {
        ...data,
        source: 'text',
        timestamp: new Date().toISOString(),
        id: Date.now().toString(),
      };
      
      setCurrentMood(newMood);
      setMoodHistory(prev => [newMood, ...prev].slice(0, 10)); // Keep only the 10 most recent entries
    } catch (err) {
      setError(err.message);
      console.error('Error analyzing text:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to analyze image using the backend API
  const analyzeImage = async (imageFile) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const response = await fetch('http://localhost:8000/api/analyze/image', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze image');
      }
      
      const data = await response.json();
      const newMood = {
        ...data,
        source: 'image',
        timestamp: new Date().toISOString(),
        id: Date.now().toString(),
      };
      
      setCurrentMood(newMood);
      setMoodHistory(prev => [newMood, ...prev].slice(0, 10)); // Keep only the 10 most recent entries
    } catch (err) {
      setError(err.message);
      console.error('Error analyzing image:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to clear current mood
  const clearCurrentMood = () => {
    setCurrentMood(null);
  };

  // Function to remove a mood from history
  const removeMoodFromHistory = (moodId) => {
    setMoodHistory(prev => prev.filter(mood => mood.id !== moodId));
  };

  return (
    <MoodContext.Provider
      value={{
        currentMood,
        moodHistory,
        isLoading,
        error,
        analyzeText,
        analyzeImage,
        clearCurrentMood,
        removeMoodFromHistory,
      }}
    >
      {children}
    </MoodContext.Provider>
  );
};