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
    <div>
      <SettingBar focusButton="payment" />
      <div className="table-number-container">
        <h1 className="title">QRコード番号を入力してください</h1>
        <form className="table-number-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={tableNumber}
            onChange={handleTableNumberChange}
            className="table-number-form__input"
            placeholder="QR number"
          />
          <button type="submit" className="table-number-form__submit-button">
            次へ
          </button>
        </form>
      </div>
    </div>
  );
};

export default TableNumberScreen;
