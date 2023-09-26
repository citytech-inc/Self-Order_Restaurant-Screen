import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./SalesAnalysis.css";
import SettingBar from "../header/SettingBar";
import ArrowIcon from "../../src/components/images/arrowhead-thin-outline-to-the-left.png";
import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(...registerables);
const SalesAnalysis: React.FC = () => {
  const SalesSpanOption = ["時間帯別", "日別", "週間別", "曜日別", "商品別"];
  const SalesByMenuClass: { [key: string]: number } = {
    ドリンク: 2000,
    メイン: 14000,
    サイド: 1600,
    その他: 800,
  };
  const SalesByMenu: { [key: string]: number } = {
    "10 醤油ラーメン": 8100,
    "7 味噌ラーメン": 5600,
  };
  const SalesPerHour: { [key: number]: { [key: string]: number | string } } = {
    9: { sales: 1000, priceClass: "normal" },
    10: { sales: 2000, priceClass: "normal" },
    11: { sales: 3000, priceClass: "normal" },
    12: { sales: 12000, priceClass: "crowded" },
    13: { sales: 15000, priceClass: "crowded" },
    14: { sales: 20000, priceClass: "normal" },
    15: { sales: 2000, priceClass: "normal" },
    16: { sales: 2000, priceClass: "normal" },
    17: { sales: 2000, priceClass: "normal" },
    18: { sales: 2000, priceClass: "crowded" },
    19: { sales: 2000, priceClass: "crowded" },
    20: { sales: 2000, priceClass: "crowded" },
    21: { sales: 2000, priceClass: "normal" },
    22: { sales: 2000, priceClass: "normal" },
    23: { sales: 2000, priceClass: "normal" },
  };
  const SalesDataSet = {
    labels: Object.keys(SalesPerHour),
    datasets: [
      {
        label: "時間ごとの売上",
        data: Object.values(SalesPerHour).map((value, index) => value.sales),
        backgroundColor: Object.values(SalesPerHour).map((value, index) =>
          value.priceClass === "normal"
            ? "rgba(255, 204, 0, 1)"
            : "rgba(255, 127, 109, 1)",
        ),
      },
    ],
  };

  console.log(SalesDataSet);

  const [selectedSalesSpan, setSelectedSalesSpan] = useState("時間帯別");

  const [displayTable, setDisplayTable] = useState(false);

  const selectedSalesSpanChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedSalesSpan(event.target.value);
  };

  return (
    <div>
      <SettingBar focusButton="sales" />
      <div className="sales-analysis-container">
        <div className="sales-datas">
          <div className="sales-span">
            <select
              className="sales-span-select"
              value={selectedSalesSpan}
              onChange={selectedSalesSpanChange}
            >
              {SalesSpanOption.map((value, index) => (
                <option value={value}>{value}</option>
              ))}
            </select>
            <p className="sales-span-text">売上</p>
          </div>
          <div className="sales-total" style={{ backgroundColor: "#FFF0B4" }}>
            <p className="sales-time">12時</p>
            <p className="sales-total-price">¥ 18000</p>
            <p className="total-tax-price">(+消費税 ¥1800)</p>
          </div>
          <div className="price-class" style={{ backgroundColor: "#FFBDB4" }}>
            混雑時価格帯
          </div>
          <div className="sales-category">
            {Object.keys(SalesByMenuClass).map((key, index) => (
              <div
                className="detail-item"
                style={{
                  backgroundColor:
                    SalesByMenuClass[key] >= 10000
                      ? "#FFD731CC"
                      : SalesByMenuClass[key] >= 2000
                      ? "#FFF0B4"
                      : "#FFF9DF",
                }}
              >
                <span className="category-name">{key}</span>
                <span className="category-price">
                  ¥ {SalesByMenuClass[key]}
                </span>
              </div>
            ))}
          </div>
          <div className="sales-menu">
            {Object.keys(SalesByMenu).map((key, index) => (
              <p className="menu-text">
                <span className="menu-name">{key}</span>
                <span className="menu-price">¥ {SalesByMenu[key]}</span>
              </p>
            ))}
          </div>
        </div>
        <div className="graph-and-calendar">
          <div className="headline">
            <div className="today-date">9月4日（月）</div>
            <div className="graph-option">
              <div className="graph-option-text">グラフで表示する</div>
              <div className="graph-option-toggle">
                <input
                  id="toggle"
                  className="toggle_input"
                  type="checkbox"
                  checked={displayTable}
                  onChange={() => setDisplayTable((prevState) => !prevState)}
                />
                <label htmlFor="toggle" className="toggle_label" />
              </div>
            </div>
          </div>
          {!displayTable ? (
            <div className="sales-per-hour-graph-area">
              <Bar data={SalesDataSet} />
            </div>
          ) : (
            <div className="sales-per-hour-table-area">
              <div className="table-col">
                <div className="table-hour-col">
                  {Object.keys(SalesPerHour).map(
                    (key, index) =>
                      index < Object.keys(SalesPerHour).length / 2 && (
                        <div className="table-text">{key}</div>
                      ),
                  )}
                </div>
                <div className="table-sales-col">
                  {Object.values(SalesPerHour).map(
                    (value, index) =>
                      index < Object.keys(SalesPerHour).length / 2 && (
                        <div className="table-text">¥ {value.sales}</div>
                      ),
                  )}
                </div>
              </div>
              <div className="table-col">
                <div className="table-hour-col">
                  {Object.keys(SalesPerHour).map(
                    (key, index) =>
                      index >= Object.keys(SalesPerHour).length / 2 && (
                        <div className="table-text">{key}</div>
                      ),
                  )}
                  {Object.keys(SalesPerHour).length % 2 === 1 && (
                    <div className="table-text">　</div>
                  )}
                </div>
                <div className="table-sales-col">
                  {Object.values(SalesPerHour).map(
                    (value, index) =>
                      index >= Object.keys(SalesPerHour).length / 2 && (
                        <div className="table-text">¥ {value.sales}</div>
                      ),
                  )}
                  {Object.keys(SalesPerHour).length % 2 === 1 && (
                    <div className="table-text">　</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesAnalysis;
