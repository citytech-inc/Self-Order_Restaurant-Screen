import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

interface SalesPerHourType {
  [key: number]: {
    sales: number;
  };
}

interface Props {
  // Define any props if needed
}

const GraphComponent: React.FC<Props> = () => {
  const [displayTable, setDisplayTable] = useState<boolean>(false);
  const [selectedHour, setSelectedHour] = useState<number>(0);

  const SalesPerHour: SalesPerHourType = {
    // Replace this with actual sales per hour data
    0: { sales: 100 },
    1: { sales: 150 },
    //... more data
  };

  const SalesDataSet = {}; // Replace this with actual dataset for the bar graph
  const options = {}; // Replace this with actual options for the bar graph

  return (
    <div className="graph-option">
      <div className="graph-option-text">グラフ表示</div>
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
                          String(100 / (Object.keys(SalesPerHour).length / 2)) +
                          "%",
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
                          String(100 / (Object.keys(SalesPerHour).length / 2)) +
                          "%",
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
                          String(100 / (Object.keys(SalesPerHour).length / 2)) +
                          "%",
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
                          String(100 / (Object.keys(SalesPerHour).length / 2)) +
                          "%",
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
  );
};

export default GraphComponent;
