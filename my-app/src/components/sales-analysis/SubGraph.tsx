import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import "./Graph.css";

// 分析用の関数のimport (最終的には移動させる)
import sendPostRequest from "../../functions/analysisFunction";

interface SalesPerHourType {
  [key: number]: {
    priceClass: string;
    sales: number;
  };
}

interface Props {
  displayTable: boolean;
  setDisplayTable: React.Dispatch<React.SetStateAction<boolean>>;
  // ... other props if needed
}

const GraphComponent: React.FC<Props> = () => {
  const { restaurantId } = useParams();
  const [subDisplayTable, setSubDisplayTable] = useState<boolean>(false);
  const [selectedHour, setSelectedHour] = useState(14);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [SalesPerHour, setSalesPerHour] = useState<{ [key: number]: { sales: number, priceClass: number } }>({
    9: { sales: 1000, priceClass: 1 },
    10: { sales: 2000, priceClass: 1 },
    11: { sales: 3000, priceClass: 3 },
    12: { sales: 12000, priceClass: 1 },
    13: { sales: 15000, priceClass: 3 },
    14: { sales: 20000, priceClass: 3 },
    15: { sales: 2000, priceClass: 1 },
    16: { sales: 2000, priceClass: 3 },
    17: { sales: 2000, priceClass: 1},
    18: { sales: 2000, priceClass: 3 },
    19: { sales: 2000, priceClass: 3 },
    20: { sales: 2000, priceClass: 3 },
    21: { sales: 2000, priceClass: 1 },
    22: { sales: 2000, priceClass: 1 },
    23: { sales: 2000, priceClass: 1 },
  });

  console.log(Object.values(SalesPerHour))
  const SalesDataSet = {
    labels: Object.keys(SalesPerHour),
    datasets: [
      {
        data: Object.keys(SalesPerHour).map((key) => SalesPerHour[Number(key)].sales),
        backgroundColor: Object.keys(SalesPerHour).map((key, index) =>
          Number(key) === selectedHour
            ? "rgba(255, 240, 180, 1)"
            : SalesPerHour[Number(key)].priceClass > 2
            ? "rgba(217, 217, 217, 1)"
            : "rgba(153, 153, 153, 1)",
        ),
        borderRadius: 5,
      },
    ],
  };

  const options: {} = {
    plugins: {
      legend: {
        display: false, // データセットのラベルを非表示にする
      },
    },
    scales: {
      x: {
        position: "bottom",
        grid: {
          display: false, // X軸のグリッドラインを非表示にする
        },
      },
      y: {
        position: "right",
        ticks: {
          stepSize: 10000, // メモリの間隔を指定します
        },
      },
    },
    responsive: true,
  };

  // 分析用の関数の使用
  useEffect(() => {
    const timestampList:number[] = []
    for(let hour = 9; hour <= 24; hour ++) {
      let newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), hour, 0);
      timestampList.push(newDate.getTime());
    }
    console.log(timestampList)
    sendPostRequest(
      timestampList,
      restaurantId,
    ) // 第一引数はtimestampの配列
      .then((result:{[key: string]: number|number[]}) => {
        const salesPerHours: {[key:number]:{ sales: number, priceClass: number }} = {}
        if (Array.isArray(result.eachSellingPrice) && Array.isArray(result.eachDiscountNumMean)) {
          for(let i = 0; i < result.eachSellingPrice.length; i++){
            salesPerHours[i+9] = { sales: result.eachSellingPrice[i], priceClass: result.eachDiscountNumMean[i]}
          }
        }
        if(setSalesPerHour) {
          setSalesPerHour(salesPerHours)
        }
      });
  },[selectedDate, restaurantId]);

  return (
    <div className="graph-option">
      <div className="top">
        <div className="graph-option-text">グラフ表示</div>
        <div className="graph-option-toggle">
          <input
            id="toggle__sub"
            className="toggle_input"
            type="checkbox"
            checked={subDisplayTable}
            onChange={() => setSubDisplayTable((prevState) => !prevState)}
          />
          <label htmlFor="toggle__sub" className="toggle_label" />
        </div>
      </div>
      <div>
        {!subDisplayTable ? (
          <div className="sales-per-hour-graph-area">
            <Bar data={SalesDataSet} options={options} className="bar-graph" />
          </div>
        ) : (
          <div className="sales-per-hour-table-area">
            <div className="table-col">
              <div className="table-hour-col">
                {Object.keys(SalesPerHour).map(
                  (key, index) =>
                    index < Object.keys(SalesPerHour).length / 2 && (
                      <div
                        className="table-text"
                        style={{
                          height:
                            String(
                              100 / (Object.keys(SalesPerHour).length / 2),
                            ) + "%",
                          backgroundColor:
                            Number(key) === selectedHour
                              ? "#FFF0B4"
                              : "rgba(0,0,0,0)",
                        }}
                      >
                        {key}時
                      </div>
                    ),
                )}
              </div>
              <div className="table-sales-col">
                {Object.keys(SalesPerHour).map(
                  (key, index) =>
                    index < Object.keys(SalesPerHour).length / 2 && (
                      <div
                        className="table-text"
                        style={{
                          height:
                            String(
                              100 / (Object.keys(SalesPerHour).length / 2),
                            ) + "%",
                          backgroundColor:
                            Number(key) === selectedHour
                              ? "#FFF0B4"
                              : "rgba(0,0,0,0)",
                        }}
                      >
                        {SalesPerHour[Number(key)].sales.toLocaleString()}円
                      </div>
                    ),
                )}
              </div>
            </div>
            <div className="table-col">
              <div className="table-hour-col">
                {Object.keys(SalesPerHour).map(
                  (key, index) =>
                    index >= Object.keys(SalesPerHour).length / 2 && (
                      <div
                        className="table-text"
                        style={{
                          height:
                            String(
                              100 / (Object.keys(SalesPerHour).length / 2),
                            ) + "%",
                          backgroundColor:
                            Number(key) === selectedHour
                              ? "#FFF0B4"
                              : "rgba(0,0,0,0)",
                        }}
                      >
                        {key}時
                      </div>
                    ),
                )}
                {Object.keys(SalesPerHour).length % 2 === 1 && (
                  <div
                    className="table-text"
                    style={{
                      height:
                        String(100 / (Object.keys(SalesPerHour).length / 2)) +
                        "%",
                    }}
                  >
                    　
                  </div>
                )}
              </div>
              <div className="table-sales-col">
                {Object.keys(SalesPerHour).map(
                  (key, index) =>
                    index >= Object.keys(SalesPerHour).length / 2 && (
                      <div
                        className="table-text"
                        style={{
                          height:
                            String(
                              100 / (Object.keys(SalesPerHour).length / 2),
                            ) + "%",
                          backgroundColor:
                            Number(key) === selectedHour
                              ? "#FFF0B4"
                              : "rgba(0,0,0,0)",
                        }}
                      >
                        {SalesPerHour[Number(key)].sales.toLocaleString()}円
                      </div>
                    ),
                )}
                {Object.keys(SalesPerHour).length % 2 === 1 && (
                  <div
                    className="table-text"
                    style={{
                      height:
                        String(100 / (Object.keys(SalesPerHour).length / 2)) +
                        "%",
                    }}
                  >
                    　
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GraphComponent;
