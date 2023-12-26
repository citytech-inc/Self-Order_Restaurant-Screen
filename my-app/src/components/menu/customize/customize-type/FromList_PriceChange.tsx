import React, { useState, useEffect, useRef } from "react";
import "./FromList.css";

type Option = {
  optionName: string;
  price: number;
};

type FromListPriceChangeProps = {
  onUpdate: (options: Option[], defaultOption: string) => void;
};

const FromList_PriceChange: React.FC<FromListPriceChangeProps> = ({
  onUpdate,
}) => {
  const [options, setOptions] = useState<Option[]>([
    { optionName: "", price: 0 },
  ]);
  const [dropdownValue, setDropdownValue] = useState<string>("");

  const addOption = () => {
    setOptions([...options, { optionName: "", price: 0 }]);
  };

  const updateOptionName = (index: number, value: string) => {
    const updatedOptions = options.map((item, i) =>
      i === index ? { ...item, optionName: value } : item,
    );
    setOptions(updatedOptions);
  };

  const updatePrice = (index: number, value: string) => {
    const priceNumber = parseFloat(value);
    const updatedOptions = options.map((item, i) =>
      i === index
        ? { ...item, price: isNaN(priceNumber) ? 0 : priceNumber }
        : item,
    );
    setOptions(updatedOptions);
  };

  const deleteOption = (index: number) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
  };

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setDropdownValue(event.target.value);
  };

  const onUpdateRef = useRef(onUpdate);
  onUpdateRef.current = onUpdate;

  useEffect(() => {
    if (onUpdateRef.current) {
      onUpdateRef.current(options, dropdownValue);
    }
  }, [options, dropdownValue]);

  return (
    <div className="options__container">
      <div className="titles">
        <div className="title">オプション</div>
        <div className="title">値段</div>
      </div>
      {options.map((option, index) => (
        <div className="option-group" key={index}>
          <input
            className="input"
            type="text"
            placeholder={`オプション ${index + 1}`}
            value={option.optionName}
            onChange={(e) => updateOptionName(index, e.target.value)}
          />
          <input
            className="input"
            type="text"
            placeholder="¥"
            value={option.price || ""}
            onChange={(e) => updatePrice(index, e.target.value)}
          />
          <button className="delete" onClick={() => deleteOption(index)}>削除</button>
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
            <option key={index} value={option.optionName}>
              {option.optionName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FromList_PriceChange;
