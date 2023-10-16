import React, { useState } from "react";
import "./FromList.css";

const FromList_PriceChange: React.FC = () => {
  const [options, setOptions] = useState<string[]>([""]);
  const [dropdownValue, setDropdownValue] = useState<string>("");

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const updateOption = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const deleteOption = (index: number) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1); // Remove the option at the specified index
    setOptions(updatedOptions);
  };

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setDropdownValue(event.target.value);
  };

  return (
    <div className="options__container">
      <div className="titles">
        <div className="title">オプション</div>
      </div>
      {options.map((option, index) => (
        <div className="option-group" key={index}>
          <input
            className="input"
            type="text"
            placeholder={`オプション ${index + 1}`}
            value={option}
            onChange={(e) => updateOption(index, e.target.value)}
          />
          <button onClick={() => deleteOption(index)}>削除</button>
        </div>
      ))}

      <button className="add-option" onClick={addOption}>
        オプションを追加
      </button>

      <div className="dropdown-section">
        <label>デフォルト</label>
        <select value={dropdownValue} onChange={handleDropdownChange}>
          <option value="">選択してください</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FromList_PriceChange;
