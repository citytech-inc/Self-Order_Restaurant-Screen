import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./SalesAnalysis.css";
import SettingBar from "../header/SettingBar";
import ArrowIcon from "../../src/components/images/arrowhead-thin-outline-to-the-left.png";
import { Chart, registerables } from "chart.js"
import { Bar } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

Chart.register(...registerables)
const SalesAnalysis : React.FC = () => {
    const SalesSpanOption = ["時間帯別", "日別", "週間別", "曜日別", "商品別"]
    const SalesTypeOption = ["総売上", "純売上", "粗利益", "営業利益"]
    const SalesByMenu : {[key: string]: string|number;}[] = [{name:"醤油ラーメン", count:9, price:8100},{name:"醤油ラーメン", count:9, price:8100},{name:"醤油ラーメン", count:9, price:8100}]
    const SalesPerHour : {[key: number]: {[key: string]: number|string};} = {
        9:{sales: 1000, priceClass: "normal"}, 
        10:{sales: 2000, priceClass: "normal"},
        11:{sales: 3000, priceClass: "normal"},
        12:{sales: 12000, priceClass: "crowded"},
        13:{sales: 15000, priceClass: "crowded"},
        14:{sales: 20000, priceClass: "normal"},
        15:{sales: 2000, priceClass: "normal"},
        16:{sales: 2000, priceClass: "normal"},
        17:{sales: 2000, priceClass: "normal"},
        18:{sales: 2000, priceClass: "crowded"},
        19:{sales: 2000, priceClass: "crowded"},
        20:{sales: 2000, priceClass: "crowded"},
        21:{sales: 2000, priceClass: "normal"},
        22:{sales: 2000, priceClass: "normal"},
        23:{sales: 2000, priceClass: "normal"},
    }
    const SelectedHourOption = [8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
    const SalesDataSet = {
        labels : Object.keys(SalesPerHour),
        datasets: [{
            label: '時間ごとの売上',
            data : Object.values(SalesPerHour).map((value, index) => (value.sales)),
            backgroundColor : Object.values(SalesPerHour).map((value, index) => (value.priceClass==="normal" ? "rgba(255, 204, 0, 1)" : "rgba(255, 127, 109, 1)"))
        }]
    }

    console.log(SalesDataSet)

    const Today = new Date();
    const DayName = ["日","月","火","水","木","金","土"]
    const [selectedSalesSpan, setSelectedSalesSpan] = useState("時間帯別")
    const [selectedSalesType, setSelectedSalesType] = useState("総売上")
    const [selectedAnalysisType, setSelectedAnalysisType] = useState("通常売上")
    const [selectedHour, setSelectedHour] = useState(14)
    const [selectedDate, setSelectedDate] = useState<Date | null>(Today);

    const [displayTable, setDisplayTable] = useState(false);

    const selectedSalesSpanChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSalesSpan(event.target.value);
    };
    const selectedSalesTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSalesType(event.target.value);
    };
    const selectedHourChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedHour(Number(event.target.value));
    };
    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };
    const customDateFormat = (date: Date | null) => {
        if (date) {
            return `${format(date, 'M月dd日')} (${DayName[Number(format(date, 'e'))]})`;
        }
        return '';
    };
    return (
        <div>
        <SettingBar focusButton="sales" />
        <div className="sales-analysis-header">
            <div className="header-select-button-1" onClick={() => setSelectedAnalysisType("通常売上")} style={{
                backgroundColor: selectedAnalysisType==="通常売上" ? "#C05454" : "#FFFFFF", 
                color:selectedAnalysisType==="通常売上" ? "#FFFFFF" : "#C05454"
            }}>通常分析</div>
            <div className="header-select-button-2" onClick={() => setSelectedAnalysisType("商品別売上")} style={{
                backgroundColor: selectedAnalysisType==="商品別売上" ? "#C05454" : "#FFFFFF", 
                color:selectedAnalysisType==="商品別売上" ? "#FFFFFF" : "#C05454"
            }}>商品別分析</div>
            <div className="header-select-button-3" onClick={() => setSelectedAnalysisType("客数分析")} style={{
                backgroundColor: selectedAnalysisType==="客数分析" ? "#C05454" : "#FFFFFF", 
                color:selectedAnalysisType==="客数分析" ? "#FFFFFF" : "#C05454"
            }}>客数分析</div>
        </div>
        <div className="sales-span">
            <select className="sales-span-select" value={selectedSalesSpan} onChange={selectedSalesSpanChange}>
                {SalesSpanOption.map((value, index) => (
                    <option value={value}>{value}</option>
                ))}
            </select>
        </div>
        <div className="display-option">
            <div className="display-span-option">
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat={customDateFormat(selectedDate)} // 日付の表示形式を指定
                    placeholderText="日付を選択" // プレースホルダーテキスト
                    className="display-date"
                />
                <select className="display-hour-select" value={selectedHour} onChange={selectedHourChange}>
                    {SelectedHourOption.map((value, index) => (
                        <option value={value}>{value}時〜{value+1}時</option>
                    ))}
                </select>
                <div style={{fontSize: "16px", width: "30px", textAlign: "center"}}>の</div>
                <select className="sales-type-select" value={selectedSalesType} onChange={selectedSalesTypeChange}>
                    {SalesTypeOption.map((value, index) => (
                        <option value={value}>{value}</option>
                    ))}
                </select>
            </div>
            <div className="graph-option">
                <div className="graph-option-text">グラフ表示</div>
                <div className="graph-option-toggle">
                    <input id="toggle" className="toggle_input" type='checkbox' 
                    checked={displayTable}
                    onChange={() => setDisplayTable(prevState => !prevState)}
                    />
                    <label htmlFor="toggle" className="toggle_label"/>
                </div>
            </div>
        </div>
        <div className="sales-analysis-container">
            <div className="sales-datas">
                <div className="sales-total">
                    <p className="sales-type-text">{selectedSalesType}</p>
                    <p className="sales-type-price">¥ 18000</p>
                </div>
                <div className="sales-menu">
                    <div className="sales-menu-headline">
                        <div className="sales-menu-headline-text-1">商品名</div>
                        <div className="sales-menu-headline-text-2">個数</div>
                        <div className="sales-menu-headline-text-3">金額</div>
                    </div>
                    {SalesByMenu.map((data,index) => (
                        <div className="menu-text">
                            <div className="menu-name">{data.name}</div>
                            <div className="menu-count">{data.count}</div>
                            <div className="menu-price">{data.price}円</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="graph-and-calendar">
                {!displayTable ? <div className="sales-per-hour-graph-area">
                    <Bar data={SalesDataSet}/>
                </div> :
                <div className="sales-per-hour-table-area">
                    <div className="table-col">
                        <div className="table-hour-col">
                            {Object.keys(SalesPerHour).map((key, index) => (
                                index < Object.keys(SalesPerHour).length/2 && <div className="table-text">{key}</div>
                            ))}
                        </div>
                        <div className="table-sales-col">
                            {Object.values(SalesPerHour).map((value, index) => (
                                index < Object.keys(SalesPerHour).length/2 && <div className="table-text">¥ {value.sales}</div>
                            ))}
                        </div>
                    </div>
                    <div className="table-col">
                        <div className="table-hour-col">
                            {Object.keys(SalesPerHour).map((key, index) => (
                                index >= Object.keys(SalesPerHour).length/2 && <div className="table-text">{key}</div>
                            ))}
                            {Object.keys(SalesPerHour).length%2 === 1 && <div className="table-text">　</div>}
                        </div>
                        <div className="table-sales-col">
                            {Object.values(SalesPerHour).map((value, index) => (
                                index >= Object.keys(SalesPerHour).length/2 && <div className="table-text">¥ {value.sales}</div>
                            ))}
                            {Object.keys(SalesPerHour).length%2 === 1 && <div className="table-text">　</div>}
                        </div>
                    </div>
                </div>}
            </div>
        </div>
        </div>
    )
};

export default SalesAnalysis;