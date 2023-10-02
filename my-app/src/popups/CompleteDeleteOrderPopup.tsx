import React from "react";
import "./CompleteDeleteOrderPopup";

function CompleteDeleteOrderPopup(props: {
  function: { closeCompleteDeleteOrder: (arg0: boolean) => void };
}) {
  const orderFunc = () => {
    props.function.closeCompleteDeleteOrder(false);
  };

  return (
    <div className="confirm-call-popup">
      <div className="sheet-1">
        <p className="text-1">商品を削除しました</p>
        <div onClick={() => orderFunc()} className="button-1">
          OK
        </div>
      </div>
    </div>
  );
}

export default CompleteDeleteOrderPopup;
