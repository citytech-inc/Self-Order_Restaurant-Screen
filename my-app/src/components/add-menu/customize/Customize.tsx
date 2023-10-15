import React, { useState } from "react";
import FromList_PriceChange from "./customize-type/FromList_PriceChange";
import FromList_NoPriceChange from "./customize-type/FromList_NoPriceChange";
import ByNumber_PriceChange from "./customize-type/ByNumber_PriceChange";
import ByNumber_NoPriceChange from "./customize-type/ByNumber_NoPriceChange";

const Customize: React.FC = () => {
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [option, setOption] = useState<string>("");
  const [priceChange, setPriceChange] = useState<string>("");

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          border: "1px solid black",
          padding: "10px",
        }}
      >
        <div>カスタマイズを追加</div>
        {!isAddClicked && (
          <button onClick={() => setIsAddClicked(true)}>+</button>
        )}
      </div>

      {isAddClicked && (
        <div>
          <label>カスタマイズ名 </label>
          <input type="text" placeholder="カスタマイズ名を入力してください" />

          <div>
            <label>オプション選択方式: </label>
            <select value={option} onChange={(e) => setOption(e.target.value)}>
              <option value="">--選択してください--</option>
              <option value="fromList">候補から選択</option>
              <option value="byNumber">個数で選択</option>
            </select>
          </div>

          <div>
            <label>価格変更: </label>
            <select
              value={priceChange}
              onChange={(e) => setPriceChange(e.target.value)}
            >
              <option value="">--選択してください--</option>
              <option value="yes">あり</option>
              <option value="no">なし</option>
            </select>
          </div>

          {option === "fromList" && priceChange === "yes" && (
            <FromList_PriceChange />
          )}
          {option === "fromList" && priceChange === "no" && (
            <FromList_NoPriceChange />
          )}
          {option === "ByNumber" && priceChange === "yes" && (
            <ByNumber_PriceChange />
          )}
          {option === "ByNumber" && priceChange === "no" && (
            <ByNumber_NoPriceChange />
          )}
        </div>
      )}
    </div>
  );
};

export default Customize;
