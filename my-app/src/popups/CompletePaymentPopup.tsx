import React from "react";
import "./CompletePaymentPopup";

function CompletePaymentPopup(props: { function: { closeCompletePayment: (arg0: boolean) => void; }; }) {
  const orderFunc = () => {
    props.function.closeCompletePayment(false);
  };

  return (
    <div className="confirm-call-popup">
      <div className="sheet-1">
        <p className="text-1">支払いを完了しました</p>
        <div onClick={() => orderFunc()} className="button-1">
          OK
        </div>
      </div>
    </div>
  );
}

export default CompletePaymentPopup;
