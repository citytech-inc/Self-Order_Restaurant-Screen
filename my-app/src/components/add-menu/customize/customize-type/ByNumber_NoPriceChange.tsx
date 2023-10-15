import React, { useState } from "react";
import "./ByNumber.css";

const ByNumber_NoPriceChange: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  return (
    <div className="input-section">
      <label className="input-label">個数上限</label>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="3">4</option>
        <option value="3">5</option>
        <option value="3">6</option>
        <option value="3">7</option>
        <option value="3">8</option>
        <option value="3">9</option>
        <option value="3">10</option>
        {/* ... Add more options as needed */}
      </select>

      <label className="input-label">単位</label>
      <input
        type="text"
        placeholder="単位（個、枚など）を入力"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
  );
};

export default ByNumber_NoPriceChange;
