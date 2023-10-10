import React, { useState } from 'react';

const SalesAnalysisHeader: React.FC = () => {
  // Declare a piece of state to hold the selected analysis type
  const [selectedAnalysisType, setSelectedAnalysisType] = useState<string>('');

  return (
    <div className="sales-analysis-header">
      <div
        className="header-select-button-1"
        onClick={() => setSelectedAnalysisType("通常売上")}
        style={{
          backgroundColor: selectedAnalysisType === "通常売上" ? "#C05454" : "#FFFFFF",
          color: selectedAnalysisType === "通常売上" ? "#FFFFFF" : "#C05454",
        }}
      >
        通常分析
      </div>
      <div
        className="header-select-button-2"
        onClick={() => setSelectedAnalysisType("商品別売上")}
        style={{
          backgroundColor: selectedAnalysisType === "商品別売上" ? "#C05454" : "#FFFFFF",
          color: selectedAnalysisType === "商品別売上" ? "#FFFFFF" : "#C05454",
        }}
      >
        商品別分析
      </div>
      <div
        className="header-select-button-3"
        onClick={() => setSelectedAnalysisType("客数分析")}
        style={{
          backgroundColor: selectedAnalysisType === "客数分析" ? "#C05454" : "#FFFFFF",
          color: selectedAnalysisType === "客数分析" ? "#FFFFFF" : "#C05454",
        }}
      >
        客数分析
      </div>
    </div>
  );
};

export default SalesAnalysisHeader;
