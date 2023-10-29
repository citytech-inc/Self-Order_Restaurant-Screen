import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./SalesAnalysis.css";
import SettingBar from "../../header/SettingBar";
import ArrowIcon from "../../src/components/images/arrowhead-thin-outline-to-the-left.png";

import DateTimeComponent from "../../components/sales-analysis/DateTimeBarNormal";
import GraphComponent from "../../components/sales-analysis/Graph";
import SubGraphComponent from "../../components/sales-analysis/SubGraph";
import HeaderComponent from "../../components/sales-analysis/Header";
import MainInfoComponent from "../../components/sales-analysis/MainInfo";

import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

Chart.register(...registerables);

const NormalAnalysis: React.FC = () => {
  const SalesSpanOption = ["時間帯別", "日別", "月別", "曜日別"];
  const SalesTypeOption = ["総売上", "純売上", "粗利益", "営業利益"];
  const SalesByMenu: { [key: string]: string | number }[] = [
    { name: "醤油ラーメン", count: 9, price: 8100 },
    { name: "醤油ラーメン", count: 9, price: 8100 },
    { name: "醤油ラーメン", count: 9, price: 8100 },
  ];
  // priceClassはダイナミックプライシングを行っていた割合を表す
  const [SalesPerHour, setSalesPerHour] = useState<{ [key: number]: { [key: string]: number | string } }>({
    9: { sales: 1000, priceClass: 0.8 },
    10: { sales: 2000, priceClass: 0.8 },
    11: { sales: 3000, priceClass: 0.8 },
    12: { sales: 12000, priceClass: 0.8 },
    13: { sales: 15000, priceClass: 0.5 },
    14: { sales: 20000, priceClass: 0.5 },
    15: { sales: 2000, priceClass: 0.5 },
    16: { sales: 2000, priceClass: 0 },
    17: { sales: 2000, priceClass: 0.9 },
    18: { sales: 2000, priceClass: 1 },
    19: { sales: 2000, priceClass: 1 },
    20: { sales: 2000, priceClass: 0 },
    21: { sales: 2000, priceClass: 1 },
    22: { sales: 2000, priceClass: 0.2 },
    23: { sales: 2000, priceClass: 0 },
  });
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
  const [displayTable, setDisplayTable] = useState<boolean>(false);
  const [displaySubTable, setDisplaySubTable] = useState<boolean>(false);

  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth() + 1; // Remember, JavaScript months are 0-indexed

  let i = [...startDate];

  while (i[0] < currentYear || (i[0] === currentYear && i[1] <= currentMonth)) {
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
  const today = new Date();

  const [selectedYear, setSelectedYear] = useState<Number>(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<Number>(
    today.getMonth() + 1,
  ); // JavaScript months are 0-indexed
  const [selectedDay, setSelectedDay] = useState<String>(
    DayName[today.getDay() === 0 ? 6 : today.getDay() - 1],
  ); // getDay() returns 0 for Sunday and 6 for Saturday, assuming DayName starts from Monday

  const dateList: Date[] = [];
  for (let i = 1; i < 8; i++) {
    const settingDate: Date = new Date(Today);

    // Adjust for Monday start (Make Monday as 1 and Sunday as 7)
    const dayOfWeek = Today.getDay();
    const adjustedDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;

    settingDate.setDate(Today.getDate() - adjustedDayOfWeek + i);
    dateList.push(settingDate);
  }

  const [selectedWeek, setSelectedWeek] = useState<Date[]>(dateList);

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

  const handleSalesTypeChange = (selectedSalesType: string) => {
    setSelectedSalesType(selectedSalesType);
  };

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
        const settingDate: Date = new Date(Today);

        // Adjust for Monday start (Make Monday as 1 and Sunday as 7)
        const dayOfWeek = Today.getDay();
        const adjustedDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;

        settingDate.setDate(Today.getDate() - adjustedDayOfWeek + i);
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
      const month = date.getMonth() + 1; // JavaScript months are 0-indexed
      const day = date.getDate();

      // Adjust for Monday start (Make Monday as 1 and Sunday as 7)
      const dayOfWeek = date.getDay();
      const adjustedDayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

      return `${month}月${day}日 (${DayName[adjustedDayOfWeek]})`;
    }
    return "";
  };

  return (
    <div>
      <div>
        <SettingBar focusButton="sales" />
        <HeaderComponent focusButton="通常分析" />
        <DateTimeComponent 
          onSalesTypeChange={handleSalesTypeChange}
          setSalesPerHour={setSalesPerHour}
        />
        <div className="analysis-area">
          <div className="analysis-area__left">
            <MainInfoComponent
              selectedSalesType={selectedSalesType}
              SalesByMenu={SalesByMenu}
              SalesPerHour={SalesPerHour}
            />
          </div>
          <div className="analysis-area__right">
            <GraphComponent
              displayTable={displayTable}
              setDisplayTable={setDisplayTable}
              SalesPerHour={SalesPerHour}
            />
            <SubGraphComponent
              displayTable={displaySubTable}
              setDisplayTable={setDisplaySubTable}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NormalAnalysis;
