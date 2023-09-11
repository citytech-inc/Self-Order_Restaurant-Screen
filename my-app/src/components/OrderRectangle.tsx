import React from "react";
import "./OrderRectangle.css";

interface OrderProps {
  id: string;
  order: string;
  onDelete: () => void;
}

export const OrderRectangle: React.FC<OrderProps> = ({
  id,
  order,
  onDelete,
}) => {
  return (
    <div className="order">
      <div>{id}</div>
      <div>{order}</div>
      <button onClick={onDelete}>削除</button>
    </div>
  );
};
