import React from "react";
import logo from "./logo.png";

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="Optimum Care Partners" className="logo" />
      <h1>Optimum Care Partners</h1>
    </header>
  );
};

export default Header;
