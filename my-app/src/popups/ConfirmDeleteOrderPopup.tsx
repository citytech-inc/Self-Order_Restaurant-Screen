import React from "react";
import "./ConfirmDeleteOrderPopup.css";

function ConfirmDeleteOrderPopup(props: {
  function: {
    closeConfirmDeleteOrder: (arg0: boolean) => void;
    openCompleteDeleteOrder: (arg0: boolean) => void;
  };
}) {
  const deleteFunc = () => {
    props.function.closeConfirmDeleteOrder(false);
    props.function.openCompleteDeleteOrder(true);
  };

  const backFunc = () => {
    props.function.closeConfirmDeleteOrder(false);
  };

  return (
    <div className="confirm-call-popup">
      <div className="sheet-1">
        <p className="text-1">注文を削除しますか</p>
        <div onClick={() => deleteFunc()} className="button-1">
          はい
        </div>
        <div onClick={() => backFunc()} className="button-2">
          いいえ
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteOrderPopup;
