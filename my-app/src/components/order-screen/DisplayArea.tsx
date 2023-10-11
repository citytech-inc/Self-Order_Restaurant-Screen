import React from "react";
import { OrderRectangle } from "./OrderRectangle";
import "./DisplayArea.css";

interface DisplayAreaProps {
  title: string;
  orders: Array<{
    id: string;
    order: string;
    settings: string[];
    hourTime: number;
    minuteTime: number;
  }>;
  onDelete: (id: string) => void;
}

export const DisplayArea: React.FC<DisplayAreaProps> = ({
  title,
  orders,
  onDelete,
}) => {
  return (
    <div className="displayArea">
      <div className="title">{title}</div>
      <div className="area__line"></div>
      <div className="orderContainer">
        {orders.map(({ id, order, settings, hourTime, minuteTime }) => (
          <div key={id}>
            <OrderRectangle
              id={id}
              order={order}
              settings={settings}
              hourTime={hourTime}
              minuteTime={minuteTime}
              onDelete={() => onDelete(id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
