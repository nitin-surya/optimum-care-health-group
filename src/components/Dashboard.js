import React, { useState } from "react";
import MetricCard from "./MetricCard";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Chart } from "primereact/chart";

const Dashboard = () => {
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [showChartDialog, setShowChartDialog] = useState(false);

  const metrics = [
    {
      name: "Patient Experience",
      description: `The national average HCAHPS score across nearly 3,300 U.S. hospitals tracked in HospitalView is 3.33.
         The Oklahoma state average is 3.76`,
      nationalAvg: 3.33,
      stateAvg: 3.76,
      doctorAvg: 3.5,
      type: "bar",
      link: "https://www.definitivehc.com/resources/healthcare-insights/hcahps-scores-state#:~:text=What%20is%20the%20average%20HCAHPS,tracked%20in%20HospitalView%20is%203.33.",
      linkDesc: "HCAHPS scores",
    },
    {
      name: "Quality",
      description:
        "Overall quality rating of the healthcare services provided.",
      nationalAvg: 78,
      stateAvg: 82,
      doctorAvg: 88,
      type: "pie",
    },
    {
      name: "Return to Acute",
      description:
        "Rate at which patients return to acute care within 30 days.",
      nationalAvg: 10,
      stateAvg: 9,
      doctorAvg: 7,
      type: "doughnut",
    },
    {
      name: "Length of Stay",
      description: "Average length of stay for patients in the hospital.",
      nationalAvg: 5.5,
      stateAvg: 5.0,
      doctorAvg: 4.5,
      type: "bar",
    },
  ];

  const handleChartClick = (metric) => {
    setSelectedMetric(metric);
    setShowChartDialog(true);
  };

  const handleMoreInfoClick = (metric) => {
    setSelectedMetric(metric);
    setShowInfoDialog(true);
  };

  return (
    <div className="dashboard">
      {metrics.map((metric, index) => (
        <Card key={index} title={metric.name} className="p-mb-4 p-shadow-4">
          <MetricCard metric={metric} onChartClick={handleChartClick} />
          <Button
            label="More Info"
            icon="pi pi-info-circle"
            className="p-button-text"
            onClick={() => handleMoreInfoClick(metric)}
          />
        </Card>
      ))}

      {/* Info Dialog */}
      <Dialog
        header="Metric Information"
        visible={showInfoDialog}
        style={{ width: "50vw" }}
        onHide={() => setShowInfoDialog(false)}
      >
        {selectedMetric && (
          <div>
            <h2>{selectedMetric.name}</h2>
            <p>{selectedMetric.description}</p>
            {selectedMetric.link && (
              <a href={selectedMetric.link} target="_blank" rel="noreferrer">
                {selectedMetric.linkDesc}
              </a>
            )}
          </div>
        )}
      </Dialog>

      {/* Chart Dialog */}
      <Dialog
        header="Detailed Chart View"
        visible={showChartDialog}
        style={{ width: "80vw" }}
        onHide={() => setShowChartDialog(false)}
        maximizable
      >
        {selectedMetric && (
          <div style={{ position: "relative", height: "70vh" }}>
            <Chart
              type={selectedMetric.type}
              data={{
                labels: ["National Avg", "State Avg", "Doctor Avg"],
                datasets: [
                  {
                    label: selectedMetric.name,
                    data: [
                      selectedMetric.nationalAvg,
                      selectedMetric.stateAvg,
                      selectedMetric.doctorAvg,
                    ],
                    backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
                  },
                ],
              }}
              options={{
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
                maintainAspectRatio: false,
              }}
              height={500} // Larger height for detailed view
            />
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default Dashboard;
