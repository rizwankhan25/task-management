'use client';

import { useEffect, useState } from "react";
import { Chart } from 'chart.js/auto';
import { fetchPriorityDistribution } from "@/service/dashboardservice";

const PriorityChart = () => {
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPriorityDistribution();
      console.log('Data: ', data);

      const labels = data.map((item) => item.priority);
      const counts = data.map((item) => item.count);

      const ctx = document.getElementById("priorityChart").getContext("2d");

      if (chartInstance) {
        chartInstance.destroy();
      }

      const newChart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Task Priority Distribution",
              data: counts,
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // important to allow custom height/width
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Task Priority Distribution",
            },
          },
        },
      });

      setChartInstance(newChart);
    };

    fetchData();

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []); // run once on mount

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ width: '600px', height: '600px', margin: '0 auto' }}>
      <canvas id="priorityChart" style={{ width: '100%', height: '100%' }}></canvas>
    </div>
  );
};

export default PriorityChart;
