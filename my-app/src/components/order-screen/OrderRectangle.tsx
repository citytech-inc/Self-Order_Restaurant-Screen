import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./OrderRectangle.css";
import ConfirmDeleteOrderPopup from "../../popups/ConfirmDeleteOrderPopup";
import CompleteDeleteOrderPopup from "../../popups/CompleteDeleteOrderPopup";

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
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const [confirmDeleteOrderPopup, setConfirmDeleteOrderPopup] = useState(false);
  const [completeDeleteOrderPopup, setCompleteDeleteOrderPopup] =
    useState(false);

  const toggleDeleteOrderPopup = () => {
    setConfirmDeleteOrderPopup(true);
  };

  const completeDeleteOrder = () => {
    setCompleteDeleteOrderPopup(false);
    onDelete();
  };

  return (
    <>
      {confirmDeleteOrderPopup && (
        <ConfirmDeleteOrderPopup
          function={{
            closeConfirmDeleteOrder: setConfirmDeleteOrderPopup,
            openCompleteDeleteOrder: setCompleteDeleteOrderPopup,
          }}
        />
      )}
      {completeDeleteOrderPopup && (
        <CompleteDeleteOrderPopup
          function={{
            closeCompleteDeleteOrder: completeDeleteOrder,
          }}
        />
      )}
      <div
        className="orderRectangle"
        onClick={() => {
          toggleDeleteOrderPopup();
        }}
      >
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

        <div className="bottomPart">
          <div className="time">
            {hourTime}:{minuteTime}
          </div>
          <div className="tableId">{id}</div>
        </div>
      </div>
    </>
  );
};
