import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import "./Graph.css";

interface SalesPerHourType {
  [key: number]: {
    priceClass: string;
    sales: number;
  };
}

interface Props {
  displayTable: boolean;
  setDisplayTable: React.Dispatch<React.SetStateAction<boolean>>;
  SalesPerHour: { [key: number]: { [key: string]: number | string } }
}

const GraphComponent: React.FC<Props> = ({ displayTable, setDisplayTable, SalesPerHour }) => {
  const [selectedHour, setSelectedHour] = useState(14);

  const SalesDataSet = {
    labels: Object.keys(SalesPerHour),
    datasets: [
      {
        data: Object.values(SalesPerHour).map((value, index) => value.sales),
        backgroundColor: Object.keys(SalesPerHour).map((key, index) =>
          Number(key) === selectedHour
            ? "rgba(255, 240, 180, 1)"
            : SalesPerHour[Number(key)].priceClass === 1
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

  return (
    <div className="graph-option">
      <div className="top">
        <div className="graph-option-text">グラフ表示</div>
        <div className="graph-option-toggle">
          <input
            id="toggle"
            className="toggle_input"
            type="checkbox"
            checked={displayTable}
            onChange={() => setDisplayTable((prevState: any) => !prevState)}
          />
          <label htmlFor="toggle" className="toggle_label" />
        </div>
      </div>
      <div>
        {!displayTable ? (
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
