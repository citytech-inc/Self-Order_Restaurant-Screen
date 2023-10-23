import React, { useState } from "react";
import "./ByNumber.css";

const ByNumber_PriceChange: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  return (
    <div className="byNumber__container">
      <div className="box">
        <div className="box__text">個数上限</div>
        <select
          className="box__select"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          {/* ... Add more options as needed */}
        </select>
      </div>
      <div className="box">
        <div className="box__text">単位</div>
        <input
          className="box__input"
          type="text"
          placeholder="単位（枚など）を入力"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ByNumber_PriceChange;
