import React from "react";
import { Chart } from "primereact/chart";

const MetricCard = ({ metric, onChartClick }) => {
  const data = {
    labels: ["National Avg", "State Avg", "Doctor Avg"],
    datasets: [
      {
        label: metric.name,
        data: [metric.nationalAvg, metric.stateAvg, metric.doctorAvg],
        backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
      },
    ],
  };

  const options = {
    animation: {
      duration: 1500,
      easing: "easeOutBounce",
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false, // Ensures the chart respects its container dimensions
  };

  return (
    <div className="metric-card">
      {/* <p>{metric.description}</p> */}
      <div className="chart-container" onClick={() => onChartClick(metric)}>
        <Chart
          type={metric.type}
          data={data}
          options={options}
          height={250} // Set the height of the chart
        />
      </div>
    </div>
  );
};

export default MetricCard;
