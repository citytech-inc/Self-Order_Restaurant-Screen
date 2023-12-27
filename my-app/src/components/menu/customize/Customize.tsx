import React, { useState, useEffect, useRef } from "react";
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
  name: string;
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
  measureWord: string;
  default: string;
};

type CustomizeType4 = {
  type: "Type4";
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
      : T extends { option: "byNumber"; priceChange: "yes" }
        ? CustomizeType4
        : any;

const Customize: React.FC<CustomizeProps> = ({ types, onUpdateTypes }) => {
  const prevTypesRef = useRef(types);

  // 各カスタマイズ項目の開閉状態を追跡する状態変数
  const [openStates, setOpenStates] = useState<boolean[]>(new Array(types.length).fill(false));

  // カスタマイズ項目の開閉状態を切り替える関数
  const toggleOpenState = (index: number) => {
    setOpenStates(prev => prev.map((state, idx) => idx === index ? !state : state));
  };

  const determineCustomizeType = (
    option: string,
    priceChange: string,
    currentName: string,
  ): MappedCustomizeType<CustomizationOption> => {
    //ここのoptions, default, measureWord, priceの値をcustomize-typeのフォルダ内のファイルから受け取って、updateCustomizationsらへんをうまくいじって同期させればいい
    if (option === "fromList" && priceChange === "no") {
      return { type: "Type1", name: currentName, options: [], default: "" };
    } else if (option === "fromList" && priceChange === "yes") {
      return { type: "Type2", name: currentName, options: [], default: "" };
    } else if (option === "byNumber" && priceChange === "no") {
      return {
        type: "Type3",
        name: currentName,
        measureWord: "",
        default: "",
      };
    } else if (option === "byNumber" && priceChange === "yes") {
      return {
        type: "Type4",
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
    { option: string; priceChange: string; name: string }[]
  >([]);

  const updateCustomizations = (
    index: number,
    field: keyof CustomizationOption,
    value: string,
  ) => {
    // Update the customizations array
    const newCustomizations = [...customizations];
    newCustomizations[index][field] = value;
    setCustomizations(newCustomizations);

    // Update the customization types array based on the new customizations and the current name
    const newCustomizationTypes = [...customizationTypes];
    newCustomizationTypes[index] = determineCustomizeType(
      newCustomizations[index].option,
      newCustomizations[index].priceChange,
      newCustomizations[index].name,
    );
    setCustomizationTypes(newCustomizationTypes);
  };

  const addCustomization = () => {
    setCustomizations([
      ...customizations,
      { option: "", priceChange: "", name: "" },
    ]);
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

  const handleUpdateFromListNoPriceChange = (
    index: number,
    updateOptions: string[],
    newDefaultOption: string,
  ) => {
    // `Type1`オブジェクトの更新
    const newCustomizationTypes = [...customizationTypes];
    if (newCustomizationTypes[index].type === "Type1") {
      newCustomizationTypes[index] = {
        ...newCustomizationTypes[index],
        options: updateOptions,
        default: newDefaultOption,
      };
      setCustomizationTypes(newCustomizationTypes);
    }
  };

  const handleUpdateFromListPriceChange = (
    index: number,
    updatedOptions: Array<{ optionName: string; price: number }>,
    newDefaultOption: string,
  ) => {
    // `Type2` オブジェクトを更新します
    const newCustomizationTypes = [...customizationTypes];
    if (newCustomizationTypes[index].type === "Type2") {
      newCustomizationTypes[index] = {
        ...newCustomizationTypes[index],
        options: updatedOptions, // オプションと価格のペアの配列を直接使用します
        default: newDefaultOption,
      };
      setCustomizationTypes(newCustomizationTypes);
    }
  };

  const handleUpdateByNumberNoPriceChange = (
    index: number,
    updatedMeasureWord: string,
    newDefaultOption: number,
  ) => {
    //Type3
    const newCustomizationTypes = [...customizationTypes];
    if (newCustomizationTypes[index].type === "Type3") {
      newCustomizationTypes[index] = {
        ...newCustomizationTypes[index],
        measureWord: updatedMeasureWord,
        default: newDefaultOption,
      };
      setCustomizationTypes(newCustomizationTypes);
    }
  };

  const handleUpdateByNumberPriceChange = (
    index: number,
    updatedMeasureWord: string,
    updatedPrice: number,
    newDefaultOption: number,
  ) => {
    // Type4
    const newCustomizationTypes = [...customizationTypes];
    if (newCustomizationTypes[index].type === "Type4") {
      newCustomizationTypes[index] = {
        ...newCustomizationTypes[index],
        measureWord: updatedMeasureWord,
        price: updatedPrice,
        default: newDefaultOption,
      };
      setCustomizationTypes(newCustomizationTypes);
    }
  };
  


  useEffect(() => {
    // 前回のpropsと異なる場合のみonUpdateTypesを実行
    if (
      JSON.stringify(customizationTypes) !==
      JSON.stringify(prevTypesRef.current)
    ) {
      onUpdateTypes(customizationTypes);
      prevTypesRef.current = customizationTypes; // 更新後の値を記録
    }
  }, [customizationTypes, onUpdateTypes]);

  return (
    <div className="customize__container">
      {customizations.map((customization, index) => (
        <div className="one-customize" key={index}>
          <div className="box-name"  onClick={() => toggleOpenState(index)}>
            <div className="box__text-name">カスタマイズ名 </div>
            <input
              type="text-name"
              placeholder="カスタマイズ名を入力してください"
              onChange={(e) =>
                updateCustomizations(index, "name", e.target.value)
              }
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
            customization.priceChange === "yes" && (
              <FromList_PriceChange
                onUpdate={(updatedOptions, newDefaultOption) =>
                  handleUpdateFromListPriceChange(
                    index,
                    updatedOptions,
                    newDefaultOption,
                  )
                }
              />
            )}
          {customization.option === "fromList" &&
            customization.priceChange === "no" && (
              <FromList_NoPriceChange
                onUpdate={(updatedOptions, newDefaultOption) =>
                  handleUpdateFromListNoPriceChange(
                    index,
                    updatedOptions,
                    newDefaultOption,
                  )
                }
              />
            )}
          {customization.option === "byNumber" &&
            customization.priceChange === "yes" && (
              <ByNumber_PriceChange
                onUpdate={(
                  updatedMeasureWord,
                  updatedPrice,
                  newDefaultOption,
                ) =>
                  handleUpdateByNumberPriceChange(
                    index,
                    updatedMeasureWord,
                    updatedPrice,
                    newDefaultOption,
                  )
                }
              />
            )}
          {customization.option === "byNumber" &&
            customization.priceChange === "no" && (
              <ByNumber_NoPriceChange
                onUpdate={(updatedMeasureWord, newDefaultOption) =>
                  handleUpdateByNumberNoPriceChange(
                    index,
                    updatedMeasureWord,
                    newDefaultOption,
                  )
                }
              />
            )}

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
