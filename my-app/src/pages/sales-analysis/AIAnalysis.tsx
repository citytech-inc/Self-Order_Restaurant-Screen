import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams, Link } from "react-router-dom";
import "./SalesAnalysis.scss";
import SettingBar from "../../header/SettingBar";
import HeaderComponent from "../../components/sales-analysis/Header";

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const AIAnalysis: React.FC = () => {
  const { restaurantId } = useParams();
  const [focused, setFocused] = useState("チャット");
  const changeFocusedButton = (buttonName: string) => {
    setFocused(buttonName);
  }

  const pdfDownloadHandler = (elementId: string, fileName: string) => {
    const target = document.getElementById(elementId);
    if (target === null) return;

    html2canvas(target, { scale: 2.5 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/svg', 1.0);
      let pdf = new jsPDF();
      pdf.addImage(imgData, 'SVG', 5, 10, canvas.width / 18, canvas.height / 18);
      pdf.save(`${fileName}.pdf`);
    });
  };

  return (
    <div>
      <div>
        <SettingBar focusButton="sales" />
        <HeaderComponent focusButton="AI分析" />
        <div className="sales-analysis-header">
          <div
            className="sub-header-select-button select-button-left"
            onClick={() => changeFocusedButton("チャット")}
            style={{
              backgroundColor: focused === "チャット" ? "#C05454" : "#FFFFFF",
              color: focused === "チャット" ? "#FFFFFF" : "#C05454",
            }}
          >
            チャット
          </div>
          <div
            className="sub-header-select-button select-button-right"
            onClick={() => changeFocusedButton("レポート")}
            style={{
              backgroundColor: focused === "レポート" ? "#C05454" : "#FFFFFF",
              color: focused === "レポート" ? "#FFFFFF" : "#C05454",
            }}
          >
            レポート
          </div>
        </div>
        <div>{  }</div>
      </div>
    </div>
  );
};

export default AIAnalysis;
