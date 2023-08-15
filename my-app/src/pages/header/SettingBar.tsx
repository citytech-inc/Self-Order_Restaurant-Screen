import React from "react";
import { Link } from "react-router-dom";
import "./SettingBar.css";

function SettingBar() {
  return (
    <div className="settings-bar">
      <Link to="/:restaurantId/add-menu">Settings</Link>
    </div>
  );
}

export default SettingBar;
