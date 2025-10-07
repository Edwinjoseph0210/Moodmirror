import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaCamera, FaKeyboard, FaPaperPlane, FaImage } from 'react-icons/fa';
import { useMood } from '../hooks/useMood';

const MoodInput = () => {
  const [inputType, setInputType] = useState('text'); // 'text' or 'image'
  const [text, setText] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  
  const { analyzeText, analyzeImage, isLoading, error } = useMood();

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      analyzeText(text);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSubmit = (e) => {
    e.preventDefault();
    if (fileInputRef.current.files[0]) {
      analyzeImage(fileInputRef.current.files[0]);
    }
  };

  const resetImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <motion.div
      className="mood-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">How are you feeling?</h2>
      
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg flex items-center ${inputType === 'text' ? 'bg-primary-500 text-white' : 'bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-200'}`}
            onClick={() => setInputType('text')}
          >
            <FaKeyboard className="mr-2" /> Text
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-lg flex items-center ${inputType === 'image' ? 'bg-primary-500 text-white' : 'bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-200'}`}
            onClick={() => setInputType('image')}
          >
            <FaCamera className="mr-2" /> Selfie
          </button>
        </div>
      </div>
      
      {inputType === 'text' ? (
        <form onSubmit={handleTextSubmit}>
          <div className="mb-4">
            <textarea
              className="input-field h-32"
              placeholder="Describe how you're feeling..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            className="btn-primary w-full flex items-center justify-center"
            disabled={isLoading || !text.trim()}
          >
            {isLoading ? 'Analyzing...' : (
              <>
                <FaPaperPlane className="mr-2" /> Analyze Mood
              </>
            )}
          </button>
        </form>
      ) : (
        <form onSubmit={handleImageSubmit}>
          <div className="mb-4">
            {imagePreview ? (
              <div className="relative">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full h-64 object-cover rounded-lg" 
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
                  onClick={resetImage}
                >
                  ×
                </button>
              </div>
            ) : (
              <div 
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-primary-500 dark:hover:border-primary-400 transition-colors duration-200"
                onClick={() => fileInputRef.current.click()}
              >
                <FaImage className="mx-auto text-4xl text-gray-400 dark:text-gray-500 mb-2" />
                <p className="text-gray-500 dark:text-gray-400">Click to upload a selfie</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">JPG, PNG or GIF</p>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            className="btn-primary w-full flex items-center justify-center"
            disabled={isLoading || !imagePreview}
          >
            {isLoading ? 'Analyzing...' : (
              <>
                <FaPaperPlane className="mr-2" /> Analyze Mood
              </>
            )}
          </button>
        </form>
      )}
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
          {error}
        </div>
      )}
    </motion.div>
  );
};

export default MoodInput;