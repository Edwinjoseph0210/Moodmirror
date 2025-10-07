import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import MoodInput from './components/MoodInput';
import MoodResult from './components/MoodResult';
import MoodHistory from './components/MoodHistory';
import { useMood } from './hooks/useMood';

function App() {
  const [activeTab, setActiveTab] = useState('input');
  const { currentMood } = useMood();
  
  // Dynamic background based on mood
  const getBgGradient = () => {
    if (!currentMood) return 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900';
    
    const moodColors = {
      happy: 'from-yellow-100 to-orange-200 dark:from-yellow-900 dark:to-orange-800',
      sad: 'from-blue-100 to-indigo-200 dark:from-blue-900 dark:to-indigo-800',
      angry: 'from-red-100 to-pink-200 dark:from-red-900 dark:to-pink-800',
      neutral: 'from-green-100 to-teal-200 dark:from-green-900 dark:to-teal-800',
      surprised: 'from-purple-100 to-violet-200 dark:from-purple-900 dark:to-violet-800',
      fearful: 'from-gray-100 to-blue-200 dark:from-gray-900 dark:to-blue-800'
    };
    
    return `bg-gradient-to-br ${moodColors[currentMood.emotion] || moodColors.neutral} animate-gradient-xy`;
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 ease-in-out ${getBgGradient()}`}>
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <main className="mt-8">
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${activeTab === 'input' ? 'bg-primary-500 text-white' : 'bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-200'}`}
                onClick={() => setActiveTab('input')}
              >
                New Mood
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${activeTab === 'history' ? 'bg-primary-500 text-white' : 'bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-200'}`}
                onClick={() => setActiveTab('history')}
              >
                Mood History
              </button>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === 'input' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MoodInput />
                <MoodResult />
              </div>
            ) : (
              <MoodHistory />
            )}
          </motion.div>
        </main>
        
        <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>MoodMirror © {new Date().getFullYear()} - Reflect your emotions</p>
        </footer>
      </div>
    </div>
  );
}

export default App;