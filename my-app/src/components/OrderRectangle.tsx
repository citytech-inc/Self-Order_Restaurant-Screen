import React from "react";
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
  return (
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
    <div className="tableId">{id}</div>
    <div className="time">{hourTime}:{minuteTime}</div>
    <button className="deleteButton" onClick={onDelete}>
      削除
    </button>
  </div>
  );
};
