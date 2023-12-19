import React, { useState } from "react";
import "./CustomizeSection.css";
import Customize from "./customize/Customize";
import { CustomizationTypes } from "./AddMenu";

type CustomizeSectionProps = {
  settings: {
    [key: string]: {
      name: string;
      customizationTypes: {
        [key: string]: [string, number];
      }[];
    };
  };
  onUpdateSettings: (updatedSettings: CustomizationTypes) => void;
};

type Type = {
  [key: string]: [string, number];
};

const SectionComponent: React.FC<{
  onDelete: () => void;
  onSectionNameUpdate: (value: string, index: number) => void;
  index: number;
}> = ({ onDelete, onSectionNameUpdate, index }) => {
  const [sectionValue, setSectionValue] = useState("");

  const handleSectionNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSectionValue(e.target.value);
    onSectionNameUpdate(e.target.value, index);
  };

  return (
    <div className="section-box">
      <div className="section-row">
        <div className="section-title">セクション名</div>
        <input
          className="input__name"
          type="text"
          placeholder="詳細情報"
          value={sectionValue}
          onChange={handleSectionNameChange}
        />
      </div>
      <button className="delete-button" onClick={onDelete}>
        セクションを削除
      </button>
    </div>
  );
};

const CustomizeSection: React.FC<CustomizeSectionProps> = ({
  settings: initialSettings,
  onUpdateSettings,
}) => {
  const [sections, setSections] = useState([{}]);
  const [settings, setLocalSettings] = useState(initialSettings);

  const handleDelete = (index: number) => {
    const newSections = [...sections];
    newSections.splice(index, 1);
    setSections(newSections);

    const newSettings = { ...settings };
    delete newSettings[index];
    setLocalSettings(newSettings);
    onUpdateSettings(newSettings);
  };

  const handleAdd = () => {
    setSections([...sections, {}]);
  };

  const handleSectionNameUpdate = (value: string, index: number) => {
    const newSettings = { ...settings };
    if (newSettings[index]) {
      newSettings[index].name = value;
    } else {
      newSettings[index] = {
        name: value,
        customizationTypes: [],
      };
    }

    setLocalSettings(newSettings);
    onUpdateSettings(newSettings);
  };

  const handleUpdateTypes = (updatedTypes: Type[], sectionIndex: number) => {
    const newSettings = { ...settings };
    if (newSettings[sectionIndex]) {
      newSettings[sectionIndex].customizationTypes = updatedTypes;
    }

    setLocalSettings(newSettings);
    onUpdateSettings(newSettings);
  };

  return (
    <div className="section-container">
      <div className="customize-title">カスタマイズ設定</div>
      {sections.map((_, index) => (
        <>
          <SectionComponent
            key={index}
            onDelete={() => handleDelete(index)}
            onSectionNameUpdate={handleSectionNameUpdate}
            index={index}
          />
          <Customize
            types={settings[index]?.customizationTypes}
            onUpdateTypes={(updatedTypes) =>
              handleUpdateTypes(updatedTypes, index)
            }
          />
        </>
      ))}
      <button className="add-button" onClick={handleAdd}>
        セクションを追加
      </button>
    </div>
  );
};

export default CustomizeSection;
