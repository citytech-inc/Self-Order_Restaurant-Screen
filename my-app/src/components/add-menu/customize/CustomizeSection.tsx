import React, { useState } from "react";
import "./CustomizeSection.css";
import Customize from "./Customize";

const SectionComponent: React.FC<{ onDelete: () => void }> = ({ onDelete }) => {
  const [sectionValue, setSectionValue] = useState("");

  return (
    <div className="section-box">
      <div className="section-title">セクション名</div>
      <input
        type="text"
        placeholder="詳細情報"
        value={sectionValue}
        onChange={(e) => setSectionValue(e.target.value)}
      />
      <button className="delete-button" onClick={onDelete}>
        セクションを削除
      </button>
    </div>
  );
};

const CustomizeSection: React.FC = () => {
  const [sections, setSections] = useState([{}]);

  const handleDelete = (index: number) => {
    const newSections = [...sections];
    newSections.splice(index, 1);
    setSections(newSections);
  };

  const handleAdd = () => {
    setSections([...sections, {}]);
  };

  return (
    <div className="section-container">
      <div>カスタマイズ設定</div>
      {sections.map((_, index) => (
        <SectionComponent key={index} onDelete={() => handleDelete(index)} />
      ))}
      <Customize />
      <button onClick={handleAdd}>セクションを追加</button>
    </div>
  );
};

export default CustomizeSection;
