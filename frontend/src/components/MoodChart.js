import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const MoodChart = ({ score, emotion }) => {
  // Get color based on emotion
  const getColor = (emotion, opacity = 1) => {
    const colorMap = {
      happy: `rgba(255, 209, 102, ${opacity})`, // Yellow
      sad: `rgba(17, 138, 178, ${opacity})`, // Blue
      angry: `rgba(239, 71, 111, ${opacity})`, // Red
      neutral: `rgba(6, 214, 160, ${opacity})`, // Green
      surprised: `rgba(155, 93, 229, ${opacity})`, // Purple
      fearful: `rgba(7, 59, 76, ${opacity})`, // Dark Blue
    };
    return colorMap[emotion] || colorMap.neutral;
  };

  // Create a smooth curve with multiple points
  const generateSmoothData = (finalScore) => {
    // Normalize score to 0-100 range if needed
    const normalizedScore = Math.min(Math.max(finalScore, 0), 100);
    
    // Create a curve that rises to the final score
    return [0, normalizedScore * 0.2, normalizedScore * 0.5, normalizedScore * 0.8, normalizedScore];
  };

  const data = {
    labels: ['', '', '', '', ''],
    datasets: [
      {
        label: 'Mood Intensity',
        data: generateSmoothData(score),
        fill: true,
        backgroundColor: getColor(emotion, 0.2),
        borderColor: getColor(emotion, 1),
        tension: 0.4,
        pointRadius: [0, 0, 0, 0, 4],
        pointBackgroundColor: getColor(emotion, 1),
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function(context) {
            return `Intensity: ${context.parsed.y}%`;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        },
        grid: {
          display: true,
          color: 'rgba(200, 200, 200, 0.2)',
        },
      },
      x: {
        display: false,
      },
    },
    animation: {
      duration: 2000,
      easing: 'easeOutQuart',
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-inner">
      <div className="h-48">
        <Line data={data} options={options} />
      </div>
      <div className="mt-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
        Intensity: {score}%
      </div>
    </div>
  );
};

export default MoodChart;