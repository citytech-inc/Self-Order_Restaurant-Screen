import React, { useState, useEffect, useRef } from "react";
import "./ByNumber.css";

type ByNumberNoPriceChangeProps = {
  onUpdate: (mesureword: string, defaultQuantity: number) => void;
};

const ByNumber_NoPriceChange: React.FC<ByNumberNoPriceChangeProps> = ({
  onUpdate,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [measureword, setMeasureword] = useState("");
  //const [description, setDescription] = useState("");
  //const [price, setPrice] = useState("");

  const handleQuantityChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setQuantity(Number(event.target.value));
  };

  const onUpdateRef = useRef(onUpdate);
  onUpdateRef.current = onUpdate;

  useEffect(() => {
    if (onUpdateRef.current) {
      onUpdateRef.current(measureword, quantity);
    }
  }, [measureword, quantity]);

  /*{
  useEffect(() => {
    onUpdate(mesureword, quantity);
  }, [mesureword, quantity, onUpdate]);
}*/

  return (
    <div className="byNumber__container">
      <div className="box">
        <div className="box__text">個数上限</div>
        <select
          className="box__select"
          value={quantity}
          onChange={handleQuantityChange}
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
          value={measureword}
          onChange={(e) => setMeasureword(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ByNumber_NoPriceChange;
