import React, { useState, ChangeEvent } from "react";
import DatePicker from "react-datepicker";
import "./DateTimeBar.css";
import "react-datepicker/dist/react-datepicker.css";
import sortedIcon from '../images/filter_3839020.png';

interface Props {
  onSalesTypeChange?: (selectedSalesType: string) => void;
}

const DateTimeComponent: React.FC<Props> = ({ onSalesTypeChange }) => {
  const SalesSpanOption = ["時間帯別", "日別", "月別", "曜日別"];
  const SalesTypeOption = ["総売上", "純売上", "粗利益", "営業利益"];
  const MenuCategoryOption = [
    "すべて",
    "ラーメン",
    "セットメニュー",
    "ドリンク",
  ];
  const MenuOption = ["すべて", "醤油ラーメン", "塩ラーメン", "味噌ラーメン"];

  const SelectedHourOption = [
    8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
  ];

  const startDate = [2021, 10, 1];
  const Today = new Date();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDate();
  const DayName = ["日", "月", "火", "水", "木", "金", "土"];
  const YearMonthList: { [key: string]: number[] } = Object();

  const [dayStartDate, setDayStartDate] = useState<Date | null>(new Date());
  const [dayEndDate, setDayEndDate] = useState<Date | null>(new Date());

  const i = [...startDate];

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
  const [selectedCategoryType, setSelectedCategoryType] = useState("すべて");
  const [selectedMenuType, setSelectedMenuType] = useState("すべて");
  const [selectedHour, setSelectedHour] = useState("14");
  const [selectedDate, setSelectedDate] = useState<Date>(Today);
  const today = new Date();

  const [selectedYear, setSelectedYear] = useState<Number>(currentYear);
  const [selectedMonth, setSelectedMonth] = useState<Number>(currentMonth); // JavaScript months are 0-indexed
  const [selectedDay, setSelectedDay] = useState<String>(
    DayName[today.getDay() === 0 ? 6 : today.getDay() - 1],
  ); // getDay() returns 0 for Sunday and 6 for Saturday

  const dateList: Date[] = [];

  for (let i = 1; i < 8; i++) {
    const settingDate: Date = new Date(Today);
    const dayOfWeek = Today.getDay(); // 0 for Sunday, 6 for Saturday

    // Adjust for Monday start (Make Monday as 1 and Sunday as 7)
    const adjustedDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;

    settingDate.setDate(Today.getDate() - adjustedDayOfWeek + i);
    dateList.push(settingDate);
  }

  const [selectedWeek, setSelectedWeek] = useState<Date[]>(dateList);

  const selectedSalesTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSalesType(e.target.value);
    if (onSalesTypeChange) {
      onSalesTypeChange(e.target.value);
    }
  };

  const selectedCategoryTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategoryType(e.target.value);
  };

  const selectedMenuTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMenuType(e.target.value);
  };

  const selectedSalesSpanChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedSalesSpan(event.target.value);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const selectedHourChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedHour(e.target.value);
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
      const dayOfWeek = date.getDay(); // 0 for Sunday, 6 for Saturday

      // Adjust for Monday start (Make Monday as 1 and Sunday as 7)
      const adjustedDayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

      return `${month}月${day}日 (${DayName[adjustedDayOfWeek]})`;
    }
    return "";
  };

  return (
    <div className="display-option">
      <div>
        <select
          className="sales-type-select"
          value={selectedSalesSpan}
          onChange={selectedSalesSpanChange}
        >
          {SalesSpanOption.map((value, index) => (
            <option value={value}>{value}</option>
          ))}
        </select>
      </div>
      <div className="display-span-option">
        {selectedSalesSpan === "時間帯別" ? (
          <div>
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
          </div>
        ) : selectedSalesSpan === "日別" ? (
          <div>
            <div className="display-week-select">
              {`${selectedDate.getMonth() + 1}月第${
                Math.floor(
                  (selectedDate.getDate() -
                    (selectedDate.getDay() === 0 ? 7 : selectedDate.getDay()) +
                    5) /
                    7,
                ) + 1
              }週`}
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
          </div>
        ) : selectedSalesSpan === "月別" ? (
          <div>
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
          </div>
        ) : (
          <div>
            <div className="date-picker-container">
              <DatePicker
                selected={dayStartDate}
                onChange={(date) => setDayStartDate(date)}
                dateFormat="yyyy年MM月"
                showMonthYearPicker
                className="display-date"
              />
              <div>〜</div>
              <DatePicker
                selected={dayEndDate}
                onChange={(date) => setDayEndDate(date)}
                dateFormat="yyyy年MM月"
                showMonthYearPicker
                className="display-date"
              />
            </div>

            {/* Existing <select> for day selection */}
            <select
              className="display-day-select"
              value={String(selectedDay)}
              onChange={(e) => setSelectedDay(e.target.value)}
            >
              {DayName.map((value, index) => (
                <option value={value}>{value}曜日</option>
              ))}
            </select>
          </div>
        )}
        <div className="sorted-icon-area">
          <img className="sorted-icon" src={sortedIcon} alt="並び替えアイコン" />
          <p>並び替え</p>
        </div>
      </div>
    </div>
  );
};

export default DateTimeComponent;
