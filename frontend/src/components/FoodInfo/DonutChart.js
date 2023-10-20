import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DonutChart = () => {
  const data = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false, // Hide the default legend
    },
  };

  // Custom legend labels with colors
  const legendLabels = data.labels.map((label, index) => (
    <div key={label}>
      <span
        style={{
          backgroundColor: data.datasets[0].backgroundColor[index],
          width: '10px',
          height: '10px',
          display: 'inline-block',
          marginRight: '5px',
        }}
      ></span>
      {label}
    </div>
  ));

  return (
    <div>
      <h2>Donut Chart with Colored Labels</h2>
      <div className="chart-container">
        <Doughnut data={data} options={options} />
      </div>
      <div className="legend">{legendLabels}</div>
    </div>
  );
};

export default DonutChart;
