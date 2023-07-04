import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
import './PurchasedItemsScreen.css';

// Removed items prop because we're not using it
const PurchasedItemsScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [seatNumber, setSeatNumber] = useState(0);

  useEffect(() => {
    if (location.state && location.state.seatNumber) {
      setSeatNumber(location.state.seatNumber);
    }
  }, [location.state]);

  const seatOrders = [
        { seatNumber: 1, items: [{ name: '醤油ラーメン', price: 800 }, { name: '唐揚げ', price: 300 }, { name: '抹茶アイス', price: 200 }] },
        { seatNumber: 2, items: [{ name: 'カレーライス', price: 700 }, { name: '日本酒', price: 500 }] }
    ];

  const handleConfirm = () => {
    // Navigate to confirmation screen or process the purchase
    console.log("Confirm button clicked");
  };

  const handleReturn = () => {
    navigate('/table-number'); 
  };

  const currentOrder = seatOrders.find(order => order.seatNumber === seatNumber);
  const items = currentOrder ? currentOrder.items : [];

  return (
    <div className="purchased-items-container">
      <h1 className="title">Seat {seatNumber} - Your Purchased Items</h1>
            {items.map((item, index) => (
                <div key={index} className="item">
                    <p className="item-name">{item.name}</p>
                    <p className="item-price">{item.price}</p>
                </div>
            ))}
      <button onClick={handleConfirm} className="confirm-button">次へ</button>
      <button onClick={handleReturn} className="return-button">戻る</button>
    </div>
  );
}

export default PurchasedItemsScreen;
