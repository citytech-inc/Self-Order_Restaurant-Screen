import React, { useState } from "react";

const FromList_NoPriceChange: React.FC = () => {
  const [options, setOptions] = useState<string[]>([]);
  const [dropdownValue, setDropdownValue] = useState<string>("");

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const updateOption = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setDropdownValue(event.target.value);
  };

  return (
    <div className="options-section">
      {options.map((option, index) => (
        <div className="option-group" key={index}>
          <input
            type="text"
            placeholder={`オプション ${index + 1}`}
            value={option}
            onChange={(e) => updateOption(index, e.target.value)}
          />
          <button>削除</button>
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

export default FromList_NoPriceChange;
