import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./SalesAnalysis.css";
import SettingBar from "../../header/SettingBar";
import ArrowIcon from "../../src/components/images/arrowhead-thin-outline-to-the-left.png";

import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

Chart.register(...registerables);
const SalesAnalysis: React.FC = () => {
  const SalesSpanOption = ["時間帯別", "日別", "月別", "曜日別"];
  const SalesTypeOption = ["総売上", "純売上", "粗利益", "営業利益"];
  const SalesByMenu: { [key: string]: string | number }[] = [
    { name: "醤油ラーメン", count: 9, price: 8100 },
    { name: "醤油ラーメン", count: 9, price: 8100 },
    { name: "醤油ラーメン", count: 9, price: 8100 },
  ];
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
  const SelectedHourOption = [
    8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
  ];
  const salesDetailData = {
    純売上: 19800,
    "純売上(税別)": 18000,
    消費税: 1800,
    総売上: 18000,
    値引き: 0,
    原価: 4500,
    粗利益: 13500,
    販売費: 11500,
    営業利益: 2000,
    客数: 22,
    価格変動: 2.5,
  };
  const startDate = [2021, 10, 1];
  const Today = new Date();
  const DayName = ["日", "月", "火", "水", "木", "金", "土"];
  const YearMonthList: { [key: string]: number[] } = Object();
  for (
    let i = startDate;
    i[0] < Number(format(Today, "yyyy")) ||
    (i[0] === Number(format(Today, "yyyy")) &&
      i[1] <= Number(format(Today, "MM")));
  ) {
    if (Object.keys(YearMonthList).includes(String(i[0]))) {
      YearMonthList[String(i[0])].push(i[1]);
    } else {
      YearMonthList[String(i[0])] = [i[1]];
    }
    if (i[1] !== 12) {
      i[1]++;
    } else {
      i[0]++;
      i[1] = 1;
    }
  }
  const [selectedSalesSpan, setSelectedSalesSpan] = useState("時間帯別");
  const [selectedSalesType, setSelectedSalesType] = useState("総売上");
  const [selectedAnalysisType, setSelectedAnalysisType] = useState("通常売上");
  const [selectedHour, setSelectedHour] = useState(14);
  const [selectedDate, setSelectedDate] = useState<Date>(Today);
  const [selectedYear, setSelectedYear] = useState<Number>(
    Number(format(Today, "yyyy")),
  );
  const [selectedMonth, setSelectedMonth] = useState<Number>(
    Number(format(Today, "MM")),
  );
  const [selectedDay, setSelectedDay] = useState<String>(
    DayName[Number(format(Today, "e"))],
  );
  const dateList: Date[] = [];
  for (let i = 1; i < 8; i++) {
    const settingDate: Date = new Date(Today);
    settingDate.setDate(Today.getDate() - Number(format(Today, "e")) + i);
    dateList.push(settingDate);
  }
  const [selectedWeek, setSelectedWeek] = useState<Date[]>(dateList);

  const [displayTable, setDisplayTable] = useState(false);

  const SalesDataSet = {
    labels: Object.keys(SalesPerHour),
    datasets: [
      {
        data: Object.values(SalesPerHour).map((value, index) => value.sales),
        backgroundColor: Object.keys(SalesPerHour).map((key, index) =>
          Number(key) === selectedHour
            ? "rgba(255, 240, 180, 1)"
            : SalesPerHour[Number(key)].priceClass === "normal"
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

  console.log(YearMonthList);

  const selectedSalesSpanChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedSalesSpan(event.target.value);
  };
  const selectedSalesTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedSalesType(event.target.value);
  };
  const selectedHourChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedHour(Number(event.target.value));
  };
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    if (date) {
      const dateList: Date[] = [];
      for (let i = 1; i < 8; i++) {
        const settingDate: Date = new Date(date);
        settingDate.setDate(date.getDate() - Number(format(date, "e")) + i);
        dateList.push(settingDate);
      }
      setSelectedWeek(dateList);
    }
  };
  const highlightCustomDates = (date: Date | null) => {
    if (date) {
      if (selectedWeek.includes(date)) {
        return "custom-highlight"; // カスタムスタイルを適用するクラス名を返す
      }
    }
    return null;
  };
  const customDateFormat = (date: Date | null) => {
    if (date) {
      return `${format(date, "M月dd日")} (${
        DayName[Number(format(date, "e"))]
      })`;
    }
    return "";
  };
  return (
    <div>
      <div>
        <SettingBar focusButton="sales" />
        <div className="sales-analysis-header">
          <div
            className="header-select-button-1"
            onClick={() => setSelectedAnalysisType("通常売上")}
            style={{
              backgroundColor:
                selectedAnalysisType === "通常売上" ? "#C05454" : "#FFFFFF",
              color:
                selectedAnalysisType === "通常売上" ? "#FFFFFF" : "#C05454",
            }}
          >
            通常分析
          </div>
          <div
            className="header-select-button-2"
            onClick={() => setSelectedAnalysisType("商品別売上")}
            style={{
              backgroundColor:
                selectedAnalysisType === "商品別売上" ? "#C05454" : "#FFFFFF",
              color:
                selectedAnalysisType === "商品別売上" ? "#FFFFFF" : "#C05454",
            }}
          >
            商品別分析
          </div>
          <div
            className="header-select-button-3"
            onClick={() => setSelectedAnalysisType("客数分析")}
            style={{
              backgroundColor:
                selectedAnalysisType === "客数分析" ? "#C05454" : "#FFFFFF",
              color:
                selectedAnalysisType === "客数分析" ? "#FFFFFF" : "#C05454",
            }}
          >
            客数分析
          </div>
        </div>
        <div
          className="header-select-button-2"
          onClick={() => setSelectedAnalysisType("商品別売上")}
          style={{
            backgroundColor:
              selectedAnalysisType === "商品別売上" ? "#C05454" : "#FFFFFF",
            color:
              selectedAnalysisType === "商品別売上" ? "#FFFFFF" : "#C05454",
          }}
        >
          商品別分析
        </div>
        <div className="display-option">
          <div className="display-span-option">
            {selectedSalesSpan === "時間帯別" ? (
              <>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat={customDateFormat(selectedDate)} // 日付の表示形式を指定
                  placeholderText="日付を選択" // プレースホルダーテキスト
                  className="display-date"
                />
                <select
                  className="display-hour-select"
                  value={selectedHour}
                  onChange={selectedHourChange}
                >
                  {SelectedHourOption.map((value, index) => (
                    <option value={value}>
                      {value}時〜{value + 1}時
                    </option>
                  ))}
                </select>
              </>
            ) : selectedSalesSpan === "日別" ? (
              <>
                <div className="display-week-select">
                  {format(selectedDate, "M月")}第
                  {Math.floor(
                    (selectedDate.getDate() -
                      Number(format(selectedDate, "e")) +
                      5) /
                      7,
                  ) + 1}
                  週
                </div>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat={customDateFormat(selectedDate)} // 日付の表示形式を指定
                  placeholderText="日付を選択" // プレースホルダーテキスト
                  className="display-date"
                  highlightDates={selectedWeek}
                  dayClassName={highlightCustomDates}
                />
              </>
            ) : selectedSalesSpan === "月別" ? (
              <>
                <select
                  className="display-year-select"
                  value={String(selectedYear)}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                >
                  {Object.keys(YearMonthList).map((key, index) => (
                    <option value={key}>{key}年</option>
                  ))}
                </select>
                <select
                  className="display-month-select"
                  value={String(selectedMonth)}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                >
                  {YearMonthList[String(selectedYear)].map((value, index) => (
                    <option value={value}>{value}月</option>
                  ))}
                </select>
              </>
            ) : (
              <>
                <select
                  className="display-day-select"
                  value={String(selectedDay)}
                  onChange={(e) => setSelectedDay(e.target.value)}
                >
                  {DayName.map((value, index) => (
                    <option value={value}>{value}曜日</option>
                  ))}
                </select>
              </>
            )}
            <div
              style={{ fontSize: "16px", width: "30px", textAlign: "center" }}
            >
              の
            </div>
            <select
              className="sales-type-select"
              value={selectedSalesType}
              onChange={selectedSalesTypeChange}
            >
              {SalesTypeOption.map((value, index) => (
                <option value={value}>{value}</option>
              ))}
            </select>
          </div>
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
          </div>
          {SalesByMenu.map((data, index) => (
            <div className="menu-text">
              <div className="menu-name">{data.name}</div>
              <div className="menu-count">{data.count}</div>
              <div className="menu-price">{data.price}円</div>
            </div>
          ))}
        </div>
      </div>
      <div className="sales-analysis-container">
        <div className="sales-datas">
          <div className="sales-total">
            <p className="sales-type-text">{selectedSalesType}</p>
            <p className="sales-type-price">¥ 18,000</p>
          </div>
          <div className="sales-menu">
            <div className="sales-menu-headline">
              <div className="sales-menu-headline-text-1">商品名</div>
              <div className="sales-menu-headline-text-2">個数</div>
              <div className="sales-menu-headline-text-3">金額</div>
            </div>
            {SalesByMenu.map((data, index) => (
              <div className="menu-text">
                <div className="menu-name">{data.name}</div>
                <div className="menu-count">{data.count.toLocaleString()}</div>
                <div className="menu-price">
                  {data.price.toLocaleString()}円
                </div>
              </div>
            ))}
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
      <div className="graph-and-calendar">
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
        <div className="sales-detail-data">
          <div className="sales-detail-col">
            <div className="row-1">
              <div className="row-name">純売上</div>
              <div className="row-item">
                {salesDetailData["純売上"].toLocaleString()}円
              </div>
            </div>
            <div className="row-2">
              <div className="row-name">純売上(税別)</div>
              <div className="row-item">
                {salesDetailData["純売上(税別)"].toLocaleString()}円
              </div>
            </div>
            <div className="row-1">
              <div className="row-name">消費税</div>
              <div className="row-item">
                {salesDetailData["消費税"].toLocaleString()}円
              </div>
            </div>
            <div className="row-2">
              <div className="row-name">総売上</div>
              <div className="row-item">
                {salesDetailData["総売上"].toLocaleString()}円
              </div>
            </div>
            <div className="row-1">
              <div className="row-name">値引き</div>
              <div className="row-item">
                {salesDetailData["値引き"].toLocaleString()}円
              </div>
            </div>
            <div className="row-2">
              <div className="row-name">原価</div>
              <div className="row-item">
                {salesDetailData["原価"].toLocaleString()}円
              </div>
            </div>
            <div className="row-1">
              <div className="row-name">粗利益</div>
              <div className="row-item">
                {salesDetailData["粗利益"].toLocaleString()}円
              </div>
            </div>
            <div className="row-2">
              <div className="row-name">販売費</div>
              <div className="row-item">
                {salesDetailData["販売費"].toLocaleString()}円
              </div>
            </div>
            <div className="row-1">
              <div className="row-name">営業利益</div>
              <div className="row-item">
                {salesDetailData["営業利益"].toLocaleString()}円
              </div>
            </div>
          </div>
          <div className="sales-detail-col">
            <div className="row-3">
              <div className="row-name">客数</div>
              <div className="row-item">
                {salesDetailData["客数"].toLocaleString()}人
              </div>
            </div>
            <div className="row-3">
              <div className="row-name">価格変動</div>
              <div className="row-item">
                {salesDetailData["価格変動"].toLocaleString()}％
              </div>
            </div>
            <div className="row-3">
              <div className="row-name"></div>
              <div className="row-item"></div>
            </div>
            <div className="row-3">
              <div className="row-name"></div>
              <div className="row-item"></div>
            </div>
            <div className="row-3">
              <div className="row-name"></div>
              <div className="row-item"></div>
            </div>
            <div className="row-3">
              <div className="row-name"></div>
              <div className="row-item"></div>
            </div>
            <div className="row-3">
              <div className="row-name"></div>
              <div className="row-item"></div>
            </div>
            <div className="row-3">
              <div className="row-name"></div>
              <div className="row-item"></div>
            </div>
            <div className="row-3">
              <div className="row-name"></div>
              <div className="row-item"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesAnalysis;
