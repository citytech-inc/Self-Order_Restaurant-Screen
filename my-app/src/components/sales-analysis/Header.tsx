import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

type HeaderComponentProps = {
  focusButton: string | null;
};

function HeaderComponent({ focusButton }: HeaderComponentProps) {
  const { restaurantId } = useParams();

  return (
    <div className="sales-analysis-header">
      <Link
        className="header-select-button-left"
        to={`/${restaurantId}/sales-analysis`}
        style={{
          backgroundColor: focusButton === "通常分析" ? "#C05454" : "#FFFFFF",
          color: focusButton === "通常分析" ? "#FFFFFF" : "#C05454",
        }}
      >
        通常分析
      </Link>
      <Link
        className="header-select-button-middle"
        to={`/${restaurantId}/sales-analysis/menu`}
        style={{
          backgroundColor: focusButton === "商品別分析" ? "#C05454" : "#FFFFFF",
          color: focusButton === "商品別分析" ? "#FFFFFF" : "#C05454",
        }}
      >
        商品別分析
      </Link>
      <Link
        className="header-select-button-middle"
        to={`/${restaurantId}/sales-analysis/customer`}
        style={{
          backgroundColor: focusButton === "客数分析" ? "#C05454" : "#FFFFFF",
          color: focusButton === "客数分析" ? "#FFFFFF" : "#C05454",
        }}
      >
        客数分析
      </Link>
      <Link
        className="header-select-button-right"
        to={`/${restaurantId}/sales-analysis/ai`}
        style={{
          backgroundColor: focusButton === "AI分析" ? "#C05454" : "#FFFFFF",
          color: focusButton === "AI分析" ? "#FFFFFF" : "#C05454",
        }}
      >
        AI分析
      </Link>
    </div>
  );
}

export default HeaderComponent;
