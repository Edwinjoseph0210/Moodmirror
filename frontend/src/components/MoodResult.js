import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaRedo } from 'react-icons/fa';
import { useMood } from '../hooks/useMood';
import MoodChart from './MoodChart';
import ColorPalette from './ColorPalette';

const MoodResult = () => {
  const { currentMood, clearCurrentMood, isLoading } = useMood();

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

  // Function to export mood as image
  const exportAsImage = () => {
    // This would be implemented with html2canvas or similar library
    alert('Export feature coming soon!');
  };

  if (!currentMood && !isLoading) {
    return (
      <motion.div
        className="mood-card flex items-center justify-center h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center text-gray-500 dark:text-gray-400 p-8">
          <div className="text-6xl mb-4">🪞</div>
          <h3 className="text-xl font-medium mb-2">Your Mood Mirror</h3>
          <p>Submit text or a selfie to see your emotional reflection</p>
        </div>
      </motion.div>
    );
  }

  if (isLoading) {
    return (
      <motion.div
        className="mood-card flex items-center justify-center h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Analyzing your mood...</p>
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
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
            <span className="text-3xl mr-2">{getEmoji(currentMood.emotion)}</span>
            Your Mood: {currentMood.emotion.charAt(0).toUpperCase() + currentMood.emotion.slice(1)}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {formatTime(currentMood.timestamp)}
          </p>
        </div>
        <div className="flex space-x-2">
          <motion.button
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            onClick={exportAsImage}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            aria-label="Export as image"
          >
            <FaDownload />
          </motion.button>
          <motion.button
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            onClick={clearCurrentMood}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            aria-label="Reset"
          >
            <FaRedo />
          </motion.button>
        </div>
      </div>

      {currentMood.caption && (
        <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg italic text-gray-700 dark:text-gray-300">
          "{currentMood.caption}"
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Mood Intensity</h3>
        <MoodChart score={currentMood.score} emotion={currentMood.emotion} />
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Color Palette</h3>
        <ColorPalette emotion={currentMood.emotion} />
      </div>
    </motion.div>
  );
};

export default MoodResult;