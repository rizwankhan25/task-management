'use client';

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Automatically registers Chart.js components

// Mock function to simulate fetching data
// Replace this with your actual data fetching logic
const fetchCompletionRate = async () => {
  // Example data
  return [
    { date: '2025-04-01', percentage: 20 },
    { date: '2025-04-02', percentage: 40 },
    { date: '2025-04-03', percentage: 60 },
    { date: '2025-04-04', percentage: 80 },
    { date: '2025-04-05', percentage: 100 },
  ];
};

export default function CompletionChart() {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadChart = async () => {
      try {
        const data = await fetchCompletionRate();
        console.log('Completion Data:', data);

        const labels = data.map(item => item.date);
        const percentages = data.map(item => item.percentage);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Cumulative Task Completion (%)',
              data: percentages,
              borderColor: '#36A2EB',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              tension: 0.3, // Smooth curves
              fill: true,
            },
          ],
        });
      } catch (err) {
        console.error('Error loading chart:', err);
        setError('Failed to load chart data.');
      }
    };

    loadChart();
  }, []);

  if (error) {
    return <p className="text-danger">Error: {error}</p>;
  }

  if (!chartData) {
    return <p>Loading chart...</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Task Completion Over Time</h2>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Task Completion Over Time',
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              title: {
                display: true,
                text: 'Completion Percentage (%)',
              },
            },
            x: {
              title: {
                display: true,
                text: 'Date',
              },
            },
          },
        }}
      />
    </div>
  );
}
    