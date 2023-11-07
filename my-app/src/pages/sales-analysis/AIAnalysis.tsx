import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./SalesAnalysis.css";
import SettingBar from "../../header/SettingBar";
import HeaderComponent from "../../components/sales-analysis/Header";

const AIAnalysis: React.FC = () => {
  return (
    <div>
      <div>
        <SettingBar focusButton="sales" />
        <HeaderComponent focusButton="AI分析" />
      </div>
    </div>
  );
};

export default AIAnalysis;
