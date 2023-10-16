import React, { useState } from "react";
import FromList_PriceChange from "./customize-type/FromList_PriceChange";
import FromList_NoPriceChange from "./customize-type/FromList_NoPriceChange";
import ByNumber_PriceChange from "./customize-type/ByNumber_PriceChange";
import ByNumber_NoPriceChange from "./customize-type/ByNumber_NoPriceChange";
import "./Customize.css";

const Customize: React.FC = () => {
  const [customizations, setCustomizations] = useState<
    { option: string; priceChange: string }[]
  >([]);

  const addCustomization = () => {
    setCustomizations([...customizations, { option: "", priceChange: "" }]);
  };

  const deleteCustomization = (index: number) => {
    const newCustomizations = [...customizations];
    newCustomizations.splice(index, 1);
    setCustomizations(newCustomizations);
  };

  return (
    <div className="customize__container">
      {customizations.map((customization, index) => (
        <div key={index}>
          <div className="box">
            <div className="box__text">カスタマイズ名 </div>
            <input type="text" placeholder="カスタマイズ名を入力してください" />
          </div>

          <div className="box">
            <div className="box__text">オプション選択方式</div>
            <select
              value={customization.option}
              onChange={(e) => {
                const newCustomizations = [...customizations];
                newCustomizations[index].option = e.target.value;
                setCustomizations(newCustomizations);
              }}
            >
              <option value="">--選択してください--</option>
              <option value="fromList">候補から選択</option>
              <option value="byNumber">個数で選択</option>
            </select>
          </div>

          <div className="box">
            <div className="box__text">価格変更</div>
            <select
              value={customization.priceChange}
              onChange={(e) => {
                const newCustomizations = [...customizations];
                newCustomizations[index].priceChange = e.target.value;
                setCustomizations(newCustomizations);
              }}
            >
              <option value="">--選択してください--</option>
              <option value="yes">あり</option>
              <option value="no">なし</option>
            </select>
          </div>

          {customization.option === "fromList" &&
            customization.priceChange === "yes" && <FromList_PriceChange />}
          {customization.option === "fromList" &&
            customization.priceChange === "no" && <FromList_NoPriceChange />}
          {customization.option === "byNumber" &&
            customization.priceChange === "yes" && <ByNumber_PriceChange />}
          {customization.option === "byNumber" &&
            customization.priceChange === "no" && <ByNumber_NoPriceChange />}

            <div className="delete-area">
                <button className="delete-button" onClick={() => deleteCustomization(index)}>カスタマイズを削除</button>
            </div>
        
        </div>
      ))}

      <div className="add-customization">
        <div className="text">カスタマイズを追加</div>
        <button className="button" onClick={addCustomization}>
          +
        </button>
      </div>
    </div>
  );
};

export default Customize;
