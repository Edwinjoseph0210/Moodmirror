import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ColorPalette = ({ emotion }) => {
  const [theme, setTheme] = useState('pastel'); // 'pastel' or 'neon'
  
  // Color palettes based on emotions
  const colorPalettes = {
    pastel: {
      happy: ['#FFD166', '#F9F7F3', '#FFE8D1', '#FFDAB9', '#FFB347'],
      sad: ['#118AB2', '#EFF7F6', '#D8E2DC', '#B7C9E2', '#7D98A1'],
      angry: ['#EF476F', '#FFF0F3', '#FFCCD5', '#FFB3C1', '#FF8FA3'],
      neutral: ['#06D6A0', '#F0FFF4', '#D1FAE5', '#A7F3D0', '#6EE7B7'],
      surprised: ['#9B5DE5', '#F5F3FF', '#E9D5FF', '#D8B4FE', '#C084FC'],
      fearful: ['#073B4C', '#F0F9FF', '#E0F2FE', '#BAE6FD', '#7DD3FC'],
    },
    neon: {
      happy: ['#FFFF00', '#FFFF33', '#F9FF33', '#FBFF5E', '#FCFF80'],
      sad: ['#00FFFF', '#33FFFF', '#66FFFF', '#99FFFF', '#CCFFFF'],
      angry: ['#FF0000', '#FF3333', '#FF6666', '#FF9999', '#FFCCCC'],
      neutral: ['#00FF00', '#33FF33', '#66FF66', '#99FF99', '#CCFFCC'],
      surprised: ['#FF00FF', '#FF33FF', '#FF66FF', '#FF99FF', '#FFCCFF'],
      fearful: ['#0000FF', '#3333FF', '#6666FF', '#9999FF', '#CCCCFF'],
    },
  };

  // Get colors for current emotion and theme
  const getColors = () => {
    return colorPalettes[theme][emotion] || colorPalettes[theme].neutral;
  };

  // Copy color to clipboard
  const copyToClipboard = (color) => {
    navigator.clipboard.writeText(color);
    // Could add a toast notification here
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          {theme === 'pastel' ? 'Soft & Calm' : 'Bright & Vibrant'}
        </div>
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-3 py-1 text-xs font-medium rounded-l-lg ${theme === 'pastel' ? 'bg-primary-500 text-white' : 'bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-200'}`}
            onClick={() => setTheme('pastel')}
          >
            Pastel
          </button>
          <button
            type="button"
            className={`px-3 py-1 text-xs font-medium rounded-r-lg ${theme === 'neon' ? 'bg-primary-500 text-white' : 'bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-200'}`}
            onClick={() => setTheme('neon')}
          >
            Neon
          </button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {getColors().map((color, index) => (
          <motion.div
            key={index}
            className="aspect-square rounded-lg shadow-sm cursor-pointer relative overflow-hidden"
            style={{ backgroundColor: color }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => copyToClipboard(color)}
            title={`Click to copy: ${color}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="absolute bottom-1 right-1 text-xs bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 rounded px-1 py-0.5 text-gray-700 dark:text-gray-300">
              {color}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
        Click any color to copy to clipboard
      </div>
    </div>
  );
};

export default ColorPalette;