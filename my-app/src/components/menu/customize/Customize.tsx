import React, { useState, useEffect } from "react";
import FromList_PriceChange from "./customize-type/FromList_PriceChange";
import FromList_NoPriceChange from "./customize-type/FromList_NoPriceChange";
import ByNumber_PriceChange from "./customize-type/ByNumber_PriceChange";
import ByNumber_NoPriceChange from "./customize-type/ByNumber_NoPriceChange";
import "./Customize.css";
import { CustomizationTypes } from "../AddMenu";

type CustomizeProps = {
  types: CustomizationTypes[];
  onUpdateTypes: (
    updatedTypes: MappedCustomizeType<CustomizationOption>[],
  ) => void;
};

type CustomizationOption = {
  option: "fromList" | "byNumber";
  priceChange: "yes" | "no";
};

type CustomizeType1 = {
  type: "Type1";
  name: string;
  options: string[];
  default: string;
};

type CustomizeType2 = {
  type: "Type2";
  name: string;
  options: Array<{ optionName: string; price: number }>;
  default: string;
};

type CustomizeType3 = {
  type: "Type3";
  name: string;
  price: number;
  measureWord: string;
  default: string;
};

type MappedCustomizeType<T extends CustomizationOption> = T extends {
  option: "fromList";
  priceChange: "no";
}
  ? CustomizeType1
  : T extends { option: "fromList"; priceChange: "yes" }
  ? CustomizeType2
  : T extends { option: "byNumber"; priceChange: "no" }
  ? CustomizeType3
  : any;

const Customize: React.FC<CustomizeProps> = ({ types, onUpdateTypes }) => {
  const determineCustomizeType = (
    option: string,
    priceChange: string,
    currentName: string,
  ): MappedCustomizeType<CustomizationOption> => {
    if (option === "fromList" && priceChange === "no") {
      return { type: "Type1", name: currentName, options: [], default: "" };
    } else if (option === "fromList" && priceChange === "yes") {
      return { type: "Type2", name: currentName, options: [], default: "" };
    } else if (option === "byNumber" && priceChange === "no") {
      return {
        type: "Type3",
        name: currentName,
        price: 0,
        measureWord: "",
        default: "",
      };
    } else {
      return {} as any;
    }
  };

  const [customizationTypes, setCustomizationTypes] = useState<
    MappedCustomizeType<CustomizationOption>[]
  >(types ? (types as MappedCustomizeType<CustomizationOption>[]) : []);

  const [customizations, setCustomizations] = useState<
    { option: string; priceChange: string }[]
  >([]);

  const updateCustomizations = (
    index: number,
    field: keyof CustomizationOption,
    value: string,
  ) => {
    const newCustomizations = [...customizations];
    newCustomizations[index][field] = value;
    setCustomizations(newCustomizations);

    const currentName = customizationTypes[index]
      ? customizationTypes[index].name
      : "";
    const newCustomizationTypes = [...customizationTypes];
    newCustomizationTypes[index] = determineCustomizeType(
      newCustomizations[index].option,
      newCustomizations[index].priceChange,
      currentName,
    );
    setCustomizationTypes(newCustomizationTypes);
  };

  const updateCustomizationName = (index: number, name: string) => {
    const newCustomizationTypes = [...customizationTypes];
    if (newCustomizationTypes[index]) {
      newCustomizationTypes[index].name = name;
      setCustomizationTypes(newCustomizationTypes);
    }
  };

  const addCustomization = () => {
    setCustomizations([...customizations, { option: "", priceChange: "" }]);
    setCustomizationTypes([
      ...customizationTypes,
      {} as MappedCustomizeType<CustomizationOption>,
    ]);
  };

  const deleteCustomization = (index: number) => {
    const newCustomizations = [...customizations];
    newCustomizations.splice(index, 1);
    setCustomizations(newCustomizations);

    const newCustomizationTypes = [...customizationTypes];
    newCustomizationTypes.splice(index, 1);
    setCustomizationTypes(newCustomizationTypes);
  };

  useEffect(() => {
    onUpdateTypes(customizationTypes);
  }, [customizationTypes, onUpdateTypes]);

  return (
    <div className="customize__container">
      {customizations.map((customization, index) => (
        <div key={index}>
          <div className="box">
            <div className="box__text">カスタマイズ名 </div>
            <input
              type="text"
              placeholder="カスタマイズ名を入力してください"
              onChange={(e) => updateCustomizationName(index, e.target.value)}
            />
          </div>

          <div className="box">
            <div className="box__text">オプション選択方式</div>
            <select
              value={customization.option}
              onChange={(e) =>
                updateCustomizations(index, "option", e.target.value)
              }
            >
              <option value="">--選択してください--</option>
              <option value="fromList">候補から選択</option>
              <option value="byNumber">個数で選択</option>
            </select>
          </div>

          <div className="box">
            <div className="box__text">価格変更</div>
            <select
              value={customization.priceChange}
              onChange={(e) =>
                updateCustomizations(index, "priceChange", e.target.value)
              }
            >
              <option value="">--選択してください--</option>
              <option value="yes">あり</option>
              <option value="no">なし</option>
            </select>
          </div>

          {customization.option === "fromList" &&
            customization.priceChange === "yes" && <FromList_PriceChange />}
          {customization.option === "fromList" &&
            customization.priceChange === "no" && <FromList_NoPriceChange />}
          {customization.option === "byNumber" &&
            customization.priceChange === "yes" && <ByNumber_PriceChange />}
          {customization.option === "byNumber" &&
            customization.priceChange === "no" && <ByNumber_NoPriceChange />}

          <div className="delete-area">
            <button
              className="delete-button"
              onClick={() => deleteCustomization(index)}
            >
              カスタマイズを削除
            </button>
          </div>
        </div>
      ))}

      <div className="add-customization">
        <div className="text">カスタマイズを追加</div>
        <button className="button" onClick={addCustomization}>
          +
        </button>
      </div>
    </div>
  );
};

export default Customize;
