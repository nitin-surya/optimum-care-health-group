import React from "react";
import { PanelMenu } from "primereact/panelmenu";

const Sidebar = () => {
  const items = [
    {
      label: "Overview",
      icon: "pi pi-fw pi-th-large",
      items: [
        { label: "Patient Experience", icon: "pi pi-fw pi-user" },
        { label: "Quality", icon: "pi pi-fw pi-star" },
      ],
    },
    {
      label: "Metrics",
      icon: "pi pi-fw pi-chart-bar",
      items: [
        { label: "Return to Acute", icon: "pi pi-fw pi-replay" },
        { label: "Length of Stay", icon: "pi pi-fw pi-clock" },
      ],
    },
  ];

  return (
    <div className="sidebar">
      <PanelMenu model={items} />
    </div>
  );
};

export default Sidebar;
