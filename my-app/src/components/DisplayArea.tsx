import React from "react";
import { OrderRectangle } from "./OrderRectangle";
import "./DisplayArea.css";

interface DisplayAreaProps {
  title: string;
  orders: Array<{ id: string; order: string }>;
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
      <div className="orderContainer">
        {orders.map(({ id, order }) => (
          <OrderRectangle
            key={id}
            id={id}
            order={order}
            onDelete={() => onDelete(id)}
          />
        ))}
      </div>
    </div>
  );
};
