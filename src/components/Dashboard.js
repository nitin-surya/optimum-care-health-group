import React, { useState } from "react";
import MetricCard from "./MetricCard";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Chart } from "primereact/chart";
import { DashboardData, MoreInfo } from "./DashboardData"; // Import DashboardData

const Dashboard = () => {
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [showChartDialog, setShowChartDialog] = useState(false);

  // Calculate averages from DashboardData
  const calculateMetrics = (category) => {
    const filteredData = DashboardData.filter(
      (metric) => metric.category === category
    );

    const nationalAvg =
      filteredData.reduce((sum, metric) => sum + metric.nationalAvg, 0) /
      filteredData.length;
    const stateAvg =
      filteredData.reduce((sum, metric) => sum + metric.stateAvg, 0) /
      filteredData.length;
    const q1Avg =
      filteredData.reduce((sum, metric) => sum + metric.q1Avg, 0) /
      filteredData.length;
    const q2Avg =
      filteredData.reduce((sum, metric) => sum + metric.q2Avg, 0) /
      filteredData.length;
    const q3Avg =
      filteredData.reduce((sum, metric) => sum + metric.q3Avg, 0) /
      filteredData.length;

    return { nationalAvg, stateAvg, q1Avg, q2Avg, q3Avg };
  };

  const metrics = [
    {
      name: "Patient Experience",
      description:
        "The Patient Experience metrics are calculated using national and state averages from patient surveys, along with quarterly averages that reflect patient feedback trends.",
      ...calculateMetrics("Patient Experience"),
      type: "bar",
      additionalInfo: MoreInfo.patientExperience,
    },
    {
      name: "Quality",
      description:
        "Overall quality rating of the healthcare services provided.",
      ...calculateMetrics("Quality"),
      type: "bar",
      additionalInfo: MoreInfo.quality,
    },
    {
      name: "Return to Acute",
      description:
        "Rate at which patients return to acute care within 30 days.",
      ...calculateMetrics("Return To Acute"),
      type: "bar",
      additionalInfo: MoreInfo.returnToAcute,
    },
    {
      name: "Length of Stay",
      description: "Average length of stay for patients in the hospital.",
      ...calculateMetrics("Length of Stay"),
      type: "bar",
      additionalInfo: MoreInfo.lengthOfStay,
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
            <h3>Metrics:</h3>
            <ul>
              {selectedMetric.additionalInfo &&
                selectedMetric.additionalInfo.map((info, index) => (
                  <li key={index}>{info}</li>
                ))}
            </ul>
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
                labels: ["National Avg", "State Avg", "Q1", "Q2", "Q3"],
                datasets: [
                  {
                    label: selectedMetric.name,
                    data: [
                      selectedMetric.nationalAvg,
                      selectedMetric.stateAvg,
                      selectedMetric.q1Avg,
                      selectedMetric.q2Avg,
                      selectedMetric.q3Avg,
                    ],
                    backgroundColor: [
                      "#42A5F5",
                      "#66BB6A",
                      "#FFA726",
                      "#FFCA28",
                      "#AB47BC",
                    ],
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
