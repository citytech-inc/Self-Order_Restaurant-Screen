import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
import './PurchasedItemsScreen.css';

const PurchasedItemsScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tableNumber, setTableNumber] = useState(0);

  useEffect(() => {
    if (location.state && location.state.tableNumber) {
      setTableNumber(location.state.tableNumber);
    }
  }, [location.state]);

  const tableOrders = [
        { tableNumber: 1, items: [{ name: '醤油ラーメン', price: 800 }, { name: '唐揚げ', price: 300 }, { name: '抹茶アイス', price: 200 }] },
        { tableNumber: 2, items: [{ name: 'カレーライス', price: 700 }, { name: '日本酒', price: 500 }] }
    ];

  const handleConfirm = () => {
    console.log("Confirm button clicked");
  };

  const handleReturn = () => {
    navigate('/:restaurantId/table-number'); 
  };

  const currentOrder = tableOrders.find(order => order.tableNumber === tableNumber);
  const items = currentOrder ? currentOrder.items : [];

  const totalPrice = items.reduce((total, item) => total + item.price, 0);

  return (
    <div className="purchased-items-container">
      <h1 className="title">商品内容をお確かめください</h1>
      {items.map((item, index) => (
        <div key={index} className="item">
          <p className="item-name">{item.name}</p>
          <p className="item-price">{item.price}</p>
        </div>
      ))}
      <div className="total-price">
        <h2>合計: ¥{totalPrice}</h2>
      </div>
      <button onClick={handleConfirm} className="confirm-button">次へ</button>
      <button onClick={handleReturn} className="return-button">戻る</button>
    </div>
  );
}

export default PurchasedItemsScreen;
