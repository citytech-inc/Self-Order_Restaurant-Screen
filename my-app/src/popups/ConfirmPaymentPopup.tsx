import React from "react";
import "./ConfirmPaymentPopup.css";

function ConfirmPaymentPopup(props: { function: { closeConfirmPayment: (arg0: boolean) => void; openCompletePayment: (arg0: boolean) => void; }; }) {
  const orderFunc = () => {
    props.function.closeConfirmPayment(false);
    props.function.openCompletePayment(true);
  };

  const backFunc = () => {
    props.function.closeConfirmPayment(false);
  };

  return (
    <div className="confirm-call-popup">
      <div className="sheet-1">
        <p className="text-1">支払いを完了しますか</p>
        <div onClick={() => orderFunc()} className="button-1">
          はい
        </div>
        <div onClick={() => backFunc()} className="button-2">
          いいえ
        </div>
      </div>
    </div>
  );
}

export default ConfirmPaymentPopup;
