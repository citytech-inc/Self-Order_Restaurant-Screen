import React from "react";
import "./MainInfo.css";

type SalesByMenuData = {
  [key: string]: string | number;
};

type SalesPerHourData = {
  [key: number]: {
    [key: string]: string | number;
  };
};

type MainInfoComponentProps = {
  selectedSalesType: string;
  SalesByMenu: SalesByMenuData[];
  SalesPerHour: SalesPerHourData;
};

const MainInfoComponent: React.FC<MainInfoComponentProps> = ({
  selectedSalesType,
  SalesByMenu,
  SalesPerHour,
}) => {
  const title1 = "売上内訳";
  const title2 = "詳細情報";
  const data1 = [
    { key: "純売上", price: 19800 },
    { key: "純売上（税抜）", price: 18000 },
    { key: "消費税", price: 1800 },
    { key: "総売上", price: 18000 },
    { key: "値引き", price: 0 },
    { key: "原価", price: 4500 },
    { key: "粗利益", price: 13500 },
    { key: "販売費", price: 11500 },
    { key: "営業利益", price: 2000 },
  ];
  const data2 = [
    { key: "価格変動率", value: 97.5, measureWord: "%" },
    { key: "売上変化", value: 1313, measureWord: "円" },
    { key: "売上変化率", value: 107.1, measureWord: "%" },
    { key: "客数", value: 22, measureWord: "人" },
    { key: "客単価", value: 818.2, measureWord: "円" },
    { key: "平均滞在時間", value: 47.4, measureWord: "分" },
    { key: "平均来店人数", value: 2.3, measureWord: "人" },
  ];

  return (
    <div className="mainInfo__container">
      <div className="sales-datas">
        <div className="sales-total">
          <p className="sales-type-text">{selectedSalesType}</p>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <p className="sales-type-priceleft">
              <span className="part1">¥18,487</span>
              <span className="part2">（価格変動なし）</span>
            </p>
            <p className="sales-type-price">¥19,800</p>
          </div>
        </div>
        <div className="table-container">
          <h3>{title1}</h3>
          <table>
            <tbody>
              {data1.map((item, index) => (
                <tr key={index}>
                  <td>{item.key}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-container">
          <h3>{title2}</h3>
          <table>
            <tbody>
              {data2.map((item, index) => (
                <tr key={index}>
                  <td>{item.key}</td>
                  <td>
                    {item.value}
                    {item.measureWord}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MainInfoComponent;
