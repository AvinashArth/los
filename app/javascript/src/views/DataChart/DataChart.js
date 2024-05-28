import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement);
function DataChart({ datacharts }) {
  // console.log("data", datacharts)
  // Flatten the nested data structure
  const flattenedData = Object.entries(datacharts).map(([key, value]) => ({
    category: key,
    total: value.total,
    lenders: Object.entries(value.lenders).map(([lender, lenderData]) => ({
      lender,
      total_sent: lenderData.total_sent,
      approved: lenderData.approved,
      disbursed: lenderData.disbursed,
      rejected: lenderData.rejected
    }))
  }));

  // Transform data into Chartjs-compatible format
  const chartData = {
    labels: flattenedData.map(entry => entry.category),
    datasets: [
      {
        label: 'Total',
        data: flattenedData.map(entry => entry.total),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      },
      {
        label: 'Approved',
        data: flattenedData.map(entry => entry.lenders.reduce((sum, lender) => sum + lender.approved, 0)),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      },
      {
        label: 'Disbursed',
        data: flattenedData.map(entry => entry.lenders.reduce((sum, lender) => sum + lender.disbursed, 0)),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      },
      {
        label: 'Rejected',
        data: flattenedData.map(entry => entry.lenders.reduce((sum, lender) => sum + lender.rejected, 0)),
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div>
      {/* <h2>Data Chart</h2> */}
      <Bar
        data={chartData}
        options={{
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }}
      />
    </div>
  );
};

export default DataChart;
