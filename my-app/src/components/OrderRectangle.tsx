import React, { useState, useEffect } from "react";
import "./OrderRectangle.css";

interface OrderProps {
  id: string;
  order: string;
  settings: string[];
  hourTime: number;
  minuteTime: number;
  onDelete: () => void;
}

export const OrderRectangle: React.FC<OrderProps> = ({
  id,
  order,
  settings,
  hourTime,
  minuteTime,
  onDelete,
}) => {
  const [deleteOrderPopup, setDeleteOrderPopup] = useState(false);

  const toggleDeleteOrderPopup = () => {
    setDeleteOrderPopup(!deleteOrderPopup);
  };

  return (
    <>
    {deleteOrderPopup && (
        <DeleteOrderPopup
          function={{
            closeConfirmOrder: setConfirmOrderPopup,
            openCompleteOrder: setCompleteOrderPopup,
            order: order,
          }}
          state={state}
          cartItems={state.cartItems}
        />
      )}
    <div className="orderRectangle">
      <div className="orderInfo">
        <div className="orderText">{order}</div>
        {settings && (
          <div className="settings">
            {settings.map((setting, index) => (
              <div key={index} className="setting">
                {setting}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <button className="deleteButton" onClick={() => {toggleDeleteOrderPopup(); onDelete();}}>
        削除
      </button>
      <div className="bottomPart">
        <div className="time">{hourTime}:{minuteTime}</div>
        <div className="tableId">{id}</div>
      </div>
      {/* Add conditional rendering for your delete confirmation popup here based on deleteOrderPopup state */}
    </div>
    </>
  );
};
