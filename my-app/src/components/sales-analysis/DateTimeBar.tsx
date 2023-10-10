import React, { useState, ChangeEvent } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns'; // Ensure you have date-fns installed for date formatting

interface Props {
  // Define the props if any are required, otherwise remove this interface
}

const DateComponent: React.FC<Props> = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedHour, setSelectedHour] = useState<string>('0');
  const [selectedYear, setSelectedYear] = useState<number>(2023);
  const [selectedMonth, setSelectedMonth] = useState<number>(1);
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [selectedSalesType, setSelectedSalesType] = useState<string>('Type1');
  const [selectedSalesSpan, setSelectedSalesSpan] = useState<string>('時間帯別');

  const SelectedHourOption = Array.from({ length: 24 }, (_, i) => i); // Example data
  const YearMonthList = { 2023: Array.from({ length: 12 }, (_, i) => i + 1) }; // Example data
  const DayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; // Example data
  const SalesTypeOption = ['Type1', 'Type2', 'Type3']; // Example data

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const selectedHourChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedHour(e.target.value);
  };

  const selectedSalesTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSalesType(e.target.value);
  };

  const customDateFormat = (date: Date) => {
    // Implement your custom date format function here
    return format(date, 'yyyy-MM-dd');
  };

  const highlightCustomDates = (date: Date) => {
    // Implement your custom date highlight function here
    return '';
  };

  const selectedWeek = [new Date()]; // Example data, replace with your actual data

  return (
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
  );
};

export default DateComponent;
