import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./SettingBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCashRegister,
  faChartLine,
  faEdit,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import OrderIcon from "../../src/components/images/checklist_10320098.png";
import CasherIcon from "../../src/components/images/cashier_4901369.png";
import SalesAnalysisIcon from "../../src/components/images/bar-chart_478544.png";
import SettingsIcon from "../../src/components/images/settings.png";

type SettingBarProps = {
  focusButton: string | null;
};

function SettingBar({ focusButton }: SettingBarProps) {
  const { restaurantId } = useParams();
  //const navigate = useNavigate();

  return (
    <div className="settings-bar">
      <div></div>
      <Link
        to={`/${restaurantId}/order`}
        className={
          focusButton === "order" ? "bar__button__focus" : "bar__button"
        }
      >
        <img src={OrderIcon} alt="Order Icon" className="bar__icon" />
        <div>厨房</div>
      </Link>

      <div className="bar__line"></div>
      <Link
        to={`/${restaurantId}/table-number`}
        className={
          focusButton === "payment" ? "bar__button__focus" : "bar__button"
        }
      >
        <img src={CasherIcon} alt="Casher Icon" className="bar__icon" />
        <div>会計</div>
      </Link>
      <div className="bar__line"></div>
      <Link
        to={`/${restaurantId}/sales-analysis`}
        className={
          focusButton === "sales" ? "bar__button__focus" : "bar__button"
        }
      >
        <img
          src={SalesAnalysisIcon}
          alt="SalesAnalysis Icon"
          className="bar__icon"
        />
        <div>売上分析</div>
      </Link>
      <div className="bar__line"></div>
      <Link
        to={`/${restaurantId}/menu-list`}
        className={
          focusButton === "menu" ? "bar__button__focus" : "bar__button"
        }
      >
        <FontAwesomeIcon icon={faEdit} className="bar__icon" />
        <div>メニュー編集</div>
      </Link>
      <div className="bar__line"></div>
      <Link
        to={`/${restaurantId}/settings`}
        className={
          focusButton === "settings" ? "bar__button__focus" : "bar__button"
        }
      >
        <img src={SettingsIcon} alt="Settings Icon" className="bar__icon" />
        <div>設定</div>
      </Link>
      <div></div>
    </div>
  );
}

export default SettingBar;
