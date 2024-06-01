import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement);
function DataChart({ datacharts }) {
  const lenders = Object.keys(datacharts.lenders);
  const totalSentData = lenders.map(lender => datacharts.lenders[lender].total_sent);
  const approvedData = lenders.map(lender => datacharts.lenders[lender].approved);
  const disbursedData = lenders.map(lender => datacharts.lenders[lender].disbursed);
  const rejectedData = lenders.map(lender => datacharts.lenders[lender].rejected);

  const chartData = {
    labels: lenders,
    datasets: [
      {
        label: 'Total',
        backgroundColor: 'rgba(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192)',
        borderWidth: 1,
        data: totalSentData
      },
      {
        label: 'Approved',
        backgroundColor: 'blue',
        borderColor: 'blue',
        borderWidth: 1,
        data: approvedData
      },
      {
        label: 'Disbursed',
        backgroundColor: 'green',
        borderColor: 'green',
        borderWidth: 1,
        data: disbursedData
      },
      {
        label: 'Rejected',
        backgroundColor: 'red',
        borderColor: 'red',
        borderWidth: 1,
        data: rejectedData
      }
    ]
  };

  const options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };


  return (
    <div>
      {/* <h2>Data Chart</h2> */}
      <Bar
        data={chartData}
        options={{
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 50 // Set the interval to 50
              }
            }
          }
        }}
      />
    </div>
  );
};

export default DataChart;
