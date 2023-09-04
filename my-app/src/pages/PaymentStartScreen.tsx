import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./PaymentStartScreen.css";
import SettingBar from "./header/SettingBar";

interface PaymentStartProps {
}

const PaymentStartScreen: React.FC<PaymentStartProps> = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  const handleSelfRegister = () => {
    navigate(`/${restaurantId}/table-number`);
  };

  const handleInPerson = () => {
    if (restaurantId) {
      navigate(`/${restaurantId}/please-wait`);
    }
  };

  return (
    <div className="payment-start-container">
      <SettingBar />
      <h1 className="title">お会計</h1>
      <div className="buttons-container">
        <button className="payment-button" onClick={handleSelfRegister}>
          セルフ会計 (現金不可)
        </button>
        <button className="payment-button" onClick={handleInPerson}>
          店員呼び出し (現金可)
        </button>
      </div>
    </div>
  );
};

export default PaymentStartScreen;
