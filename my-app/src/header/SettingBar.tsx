import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./SettingBar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faCashRegister, faChartLine, faEdit, faCog } from '@fortawesome/free-solid-svg-icons';

type SettingBarProps = {
  focusButton: string | null;
  setFocusButton: React.Dispatch<React.SetStateAction<string | null>>;
};

function SettingBar({ focusButton, setFocusButton }: SettingBarProps) {

  return (
    <div className="settings-bar">
      <div></div>
      <Link to="/:restaurantId/order" className={`bar__button ${focusButton === 'order' ? 'focus' : ''}`}>
        <FontAwesomeIcon icon={faUtensils} className="bar__icon"/>
        <div>厨房</div>
      </Link>
      <div className="bar__line"></div>
      <Link to="/:restaurantId" className="bar__button">
        <FontAwesomeIcon icon={faCashRegister} className="bar__icon"/>
        <div>会計</div>
      </Link>
      <div className="bar__line"></div>
      <Link to="/:restaurantId/sales-analysis" className="bar__button">
        <FontAwesomeIcon icon={faChartLine} className="bar__icon"/>
        <div>売上分析</div>
      </Link>
      <div className="bar__line"></div>
      <Link to="/:restaurantId/add-menu" className="bar__button">
        <FontAwesomeIcon icon={faEdit} className="bar__icon"/>
        <div>メニュー編集</div>
      </Link>
      <div className="bar__line"></div>
      <Link to="/:restaurantId/settings" className="bar__button">
        <FontAwesomeIcon icon={faCog} className="bar__icon"/>
        <div>設定</div>
      </Link>
      <div></div>
    </div>
  );
}

export default SettingBar;
