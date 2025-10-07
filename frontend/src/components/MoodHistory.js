import React from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaChartLine } from 'react-icons/fa';
import { useMood } from '../hooks/useMood';

const MoodHistory = () => {
  const { moodHistory, removeMoodFromHistory } = useMood();

  // Function to get emoji based on emotion
  const getEmoji = (emotion) => {
    const emojiMap = {
      happy: '😊',
      sad: '😢',
      angry: '😠',
      neutral: '😐',
      surprised: '😲',
      fearful: '😨',
    };
    return emojiMap[emotion] || '🤔';
  };

  // Function to format timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleString();
  };

  // Function to get color based on emotion
  const getColor = (emotion) => {
    const colorMap = {
      happy: 'bg-yellow-100 border-yellow-300 dark:bg-yellow-900 dark:border-yellow-700',
      sad: 'bg-blue-100 border-blue-300 dark:bg-blue-900 dark:border-blue-700',
      angry: 'bg-red-100 border-red-300 dark:bg-red-900 dark:border-red-700',
      neutral: 'bg-green-100 border-green-300 dark:bg-green-900 dark:border-green-700',
      surprised: 'bg-purple-100 border-purple-300 dark:bg-purple-900 dark:border-purple-700',
      fearful: 'bg-gray-100 border-gray-300 dark:bg-gray-800 dark:border-gray-700',
    };
    return colorMap[emotion] || colorMap.neutral;
  };

  if (moodHistory.length === 0) {
    return (
      <motion.div
        className="mood-card flex items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center text-gray-500 dark:text-gray-400 p-8">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-medium mb-2">No Mood History Yet</h3>
          <p>Your mood entries will appear here once you analyze your first mood</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="mood-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Your Mood History</h2>
        <button className="btn-primary flex items-center">
          <FaChartLine className="mr-2" /> Mood Trends
        </button>
      </div>

      <div className="space-y-4">
        {moodHistory.map((mood) => (
          <motion.div
            key={mood.id}
            className={`border rounded-lg p-4 ${getColor(mood.emotion)}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            layout
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start">
                <span className="text-3xl mr-3">{getEmoji(mood.emotion)}</span>
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-white">
                    {mood.emotion.charAt(0).toUpperCase() + mood.emotion.slice(1)}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatTime(mood.timestamp)}
                  </p>
                  {mood.caption && (
                    <p className="mt-2 text-gray-700 dark:text-gray-300 italic">
                      "{mood.caption}"
                    </p>
                  )}
                  <div className="mt-2 flex items-center">
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Intensity: {mood.score}%
                    </div>
                    <div className="ml-3 text-xs px-2 py-1 rounded-full bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      {mood.source === 'text' ? 'Text' : 'Selfie'}
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors duration-200"
                onClick={() => removeMoodFromHistory(mood.id)}
                aria-label="Delete entry"
              >
                <FaTrash />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MoodHistory;