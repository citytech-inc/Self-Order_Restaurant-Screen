import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./TableNumberScreen.css";
import SettingBar from "../header/SettingBar";

interface TableNumberScreenProps {}

const TableNumberScreen: React.FC<TableNumberScreenProps> = () => {
  const { restaurantId } = useParams();
  const [tableNumber, setTableNumber] = useState<string>("");
  const navigate = useNavigate();
  const [focusButton, setFocusButton] = useState<string | null>(null);

  const handleTableNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTableNumber(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(`/${restaurantId}/purchased-items`, {
      state: { tableNumber: parseInt(tableNumber) },
    });
  };

  return (
    <div className="table-number-container">
      <SettingBar focusButton="payment" />
      <h1 className="title">座席番号を入力してください</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={tableNumber}
          onChange={handleTableNumberChange}
          className="table-number-input"
          placeholder="Table number"
        />
        <button type="submit" className="submit-button">
          次へ
        </button>
      </form>
    </div>
  );
};

export default TableNumberScreen;
