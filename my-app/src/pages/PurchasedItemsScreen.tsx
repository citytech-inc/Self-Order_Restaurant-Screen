import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PurchasedItemsScreen.css';

// Removed items prop because we're not using it
const PurchasedItemsScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    // Navigate to confirmation screen or process the purchase
    console.log("Confirm button clicked");
  };

  const handleReturn = () => {
    navigate('/table-number'); 
  };

  const items = [
    { name: '醤油ラーメン', price: 800 },
    { name: '唐揚げ', price: 300 },
    { name: '抹茶アイス', price: 200 }
  ];

  return (
    <div className="purchased-items-container">
      <h1 className="title">商品内容をお確かめください</h1>
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
