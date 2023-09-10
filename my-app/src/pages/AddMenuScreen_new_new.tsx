import React, { useState } from "react";
import SettingBar from "../header/SettingBar";

const AddMenuScreenNewNew: React.FC = () => {
  type CustomizeType1 = {
    type: 'Type1';
    name: string;
    options: string[];
    default: string;
  };

  type CustomizeType2 = {
    type: 'Type2';
    name: string;
    options: Array<{ optionName: string; price: number }>;
    default: string;
  };

  type CustomizeType3 = {
    type: 'Type3';
    name: string;
    price: number;
    measureWord: string;
    default: string;
  };

  type MenuSettings = {
    customizations?: (CustomizeType1 | CustomizeType2 | CustomizeType3)[];
  };

  type MenuType = {
    category: string;
    name: string;
    picture: string;
    price: number;
    settings: MenuSettings[];
  };

  const [menuCategoryList, setMenuCategoryList] = useState<string[]>([]);
  const [menu, setMenu] = useState<MenuType>({
    category: "",
    name: "",
    picture: "",
    price: 0,
    settings: [],
  });

  const [focusButton, setFocusButton] = useState<string | null>(null);

  const defaultSetting: MenuSettings = {};

  const defaultCustomizeType1: CustomizeType1 = {
    type: 'Type1',
    name: "",
    options: [""],
    default: "",
  };

  const defaultCustomizeType2: CustomizeType2 = {
    type: 'Type2',
    name: "",
    options: [ { optionName: "", price: 0 } ],
    default: "",
  };

  const defaultCustomizeType3: CustomizeType3 = {
    type: 'Type3',
    name: "",
    price: 0,
    measureWord: "",
    default: "",
  };

  const [inputValue, setInputValue] = useState("");

  const handleAddCategory = () => {
    if (inputValue && !menuCategoryList.includes(inputValue)) {
      setMenuCategoryList((prev) => [...prev, inputValue]);
      setInputValue(""); // Clear the input field after adding
    }
  };

  const addSetting = (newSetting: MenuSettings) => {
    setMenu((prevMenu) => ({
      ...prevMenu,
      settings: [...prevMenu.settings, newSetting],
    }));
  };

  const addCustomizeType1 = (
    settingIndex: number,
    newCustomization: CustomizeType1,
  ) => {
    setMenu((prevMenu) => {
      const updatedSettings = prevMenu.settings.map((setting, index) => {
        if (index !== settingIndex) return setting;

        return {
          ...setting,
          customizations: [...(setting.customizations || []), newCustomization],
        };
      });

      return { ...prevMenu, settings: updatedSettings };
    });
  };

  const addCustomizeType2 = (
    settingIndex: number,
    newCustomization: CustomizeType2,
  ) => {
    setMenu((prevMenu) => {
      const updatedSettings = prevMenu.settings.map((setting, index) => {
        if (index !== settingIndex) return setting;

        return {
          ...setting,
          customizations: [...(setting.customizations || []), newCustomization],
        };
      });

      return { ...prevMenu, settings: updatedSettings };
    });
  };

  const addCustomizeType3 = (
    settingIndex: number,
    newCustomization: CustomizeType3,
  ) => {
    setMenu((prevMenu) => {
      const updatedSettings = prevMenu.settings.map((setting, index) => {
        if (index !== settingIndex) return setting;

        return {
          ...setting,
          customizations: [...(setting.customizations || []), newCustomization],
        };
      });

      return { ...prevMenu, settings: updatedSettings };
    });
  };

  function isCustomizeType1(object: any): object is CustomizeType1 {
    return (
      object &&
      object.type === "Type1"
    );
  }

  function isCustomizeType2(object: any): object is CustomizeType2 {
    return (
      object &&
      object.type === "Type2"
    );
  }

  function isCustomizeType3(object: any): object is CustomizeType3 {
    return (
      object &&
      object.type === "Type3"
    );
  }

  return (
    <div>
      <SettingBar focusButton={focusButton} setFocusButton={setFocusButton} />
      <div>
      <h1>メニュー設定ページ</h1>

      {/* MenuCategoryList Component */}
      <div>
        <h2>メニューカテゴリー</h2>
        {menuCategoryList.map((category, index) => (
          <div key={index}>
            {category}
            <button
              onClick={() => {
                const updatedCategories = [...menuCategoryList];
                updatedCategories.splice(index, 1);
                setMenuCategoryList(updatedCategories);
              }}
            >
              削除
            </button>
          </div>
        ))}
        <input
          type="text"
          placeholder="Add new category"
          value={inputValue} // Control the input with state
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleAddCategory}>追加</button>{" "}
        {/* New button to add category */}
      </div>

      {/* Menu Form Component */}
      <div>
        <h2>メニューを追加</h2>
        カテゴリー:
        <select
          value={menu.category}
          onChange={(e) =>
            setMenu((prev) => ({ ...prev, category: e.target.value }))
          }
        >
          {menuCategoryList.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        名前:
        <input
          type="text"
          placeholder="Menu Name"
          onChange={(e) =>
            setMenu((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        写真:
        <input
          type="text"
          placeholder="Picture Link"
          onChange={(e) =>
            setMenu((prev) => ({ ...prev, picture: e.target.value }))
          }
        />
        値段:
        <input
          type="number"
          placeholder="Price"
          onChange={(e) => {
            const newPrice = parseFloat(e.target.value);
            setMenu((prev) => ({ ...prev, price: newPrice }));
          }}
        />
        {/* Settings */}
        {menu.settings.map((setting, settingIndex) => (
          <div key={settingIndex}>
            詳細設定カテゴリー名:
            <input type="text" placeholder="Name" />
            {/* Customization Type 1 */}
            {(setting.customizations || []).map((type1, typeIndex) => {
              if (!isCustomizeType1(type1)) {
                return null; 
              }
            
              return (
                <div key={`${settingIndex}-${typeIndex}`}>
                  名前:
                  <input
                    type="text"
                    placeholder="Name"
                    value={type1.name}
                    onChange={(e) => {
                      const newSettings = [...menu.settings];
                      if (
                        newSettings[settingIndex] &&
                        newSettings[settingIndex].customizations
                      ) {
                        (
                          newSettings[settingIndex]
                            .customizations as CustomizeType1[]
                        )[typeIndex].name = e.target.value;
                      }
                      setMenu((prev) => ({ ...prev, settings: newSettings }));
                    }}
                  />
                  オプション:
                  {type1.options.map((option, optionIndex) => (
                    <div key={optionIndex}>
                      <input
                        type="text"
                        placeholder={`Option ${optionIndex + 1}`}
                        value={option}
                        onChange={(e) => {
                          const newSettings = [...menu.settings];
                          if (
                            newSettings[settingIndex] &&
                            newSettings[settingIndex].customizations
                          ) {
                            (
                              newSettings[settingIndex]
                                .customizations as CustomizeType1[]
                            )[typeIndex].options[optionIndex] = e.target.value;
                          }
                          setMenu((prev) => ({
                            ...prev,
                            settings: newSettings,
                          }));
                        }}
                      />

                      <button
                        onClick={() => {
                          const newSettings = [...menu.settings];
                          if (
                            newSettings[settingIndex] &&
                            newSettings[settingIndex].customizations
                          ) {
                            (
                              newSettings[settingIndex]
                                .customizations as CustomizeType1[]
                            )[typeIndex].options.splice(optionIndex, 1);
                          }

                          setMenu((prev) => ({
                            ...prev,
                            settings: newSettings,
                          }));
                        }}
                      >
                        削除
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newSettings = [...menu.settings];
                      if (
                        newSettings[settingIndex] &&
                        newSettings[settingIndex].customizations
                      ) {
                        (
                          newSettings[settingIndex]
                            .customizations as CustomizeType1[]
                        )[typeIndex].options.push("");
                        setMenu((prev) => ({ ...prev, settings: newSettings }));
                      }
                    }}
                  >
                    追加
                  </button>
                  <div>
                    <span>デフォルト: {type1.default}</span>
                    <select
                      value={type1.default}
                      onChange={(e) => {
                        const newSettings = [...menu.settings];
                        if (
                          newSettings[settingIndex] &&
                          newSettings[settingIndex].customizations
                        ) {
                          (
                            newSettings[settingIndex]
                              .customizations as CustomizeType1[]
                          )[typeIndex].default = e.target.value;
                          setMenu((prev) => ({
                            ...prev,
                            settings: newSettings,
                          }));
                        }
                      }}
                    >
                      {type1.options.map((option, optionIndex) => (
                        <option key={optionIndex} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => {
                      const newSettings = [...menu.settings];
                      if (
                        newSettings[settingIndex] &&
                        newSettings[settingIndex].customizations
                      ) {
                        (
                          newSettings[settingIndex]
                            .customizations as CustomizeType1[]
                        ).splice(typeIndex, 1);
                        setMenu((prev) => ({ ...prev, settings: newSettings }));
                      }
                    }}
                  >
                    このカスタマイズを削除する
                  </button>
                </div>
              );
            })}
            <button
              onClick={() =>
                addCustomizeType1(settingIndex, defaultCustomizeType1)
              }
            >
              カスタマイズタイプ1を追加する
            </button>
            {/* Customization Type 2 */}
            {(setting.customizations || []).map((type2, typeIndex) => {
              if (!isCustomizeType2(type2)) {
                return null; // or return <></> for an empty fragment if you're using React 16+
              }
              // The 'else' branch has the JSX related to CustomizeType1
              return (
                <div key={`${settingIndex}-${typeIndex}`}>
                  名前:
                  <input
                    type="text"
                    placeholder="Name"
                    value={type2.name}
                    onChange={(e) => {
                      const newSettings = [...menu.settings];
                      if (
                        newSettings[settingIndex] &&
                        newSettings[settingIndex].customizations
                      ) {
                        (
                          newSettings[settingIndex]
                            .customizations as unknown as CustomizeType2[]
                        )[typeIndex].name = e.target.value;
                      }
                      setMenu((prev) => ({ ...prev, settings: newSettings }));
                    }}
                  />
                  オプション:
                  {type2.options.map((option, optionIndex) => (
                    <div key={optionIndex}>
                      <input
                        type="text"
                        placeholder={`Option ${optionIndex + 1}`}
                        value={option.optionName}
                        onChange={(e) => {
                          const newSettings = [...menu.settings];
                          if (
                            newSettings[settingIndex] &&
                            newSettings[settingIndex].customizations
                          ) {
                            (
                              newSettings[settingIndex]
                                .customizations as CustomizeType2[]
                            )[typeIndex].options[optionIndex].optionName =
                              e.target.value;
                          }
                          setMenu((prev) => ({
                            ...prev,
                            settings: newSettings,
                          }));
                        }}
                      />
                      <input
                        type="number"
                        placeholder="Price"
                        value={option.price}
                        onChange={(e) => {
                          const newSettings = [...menu.settings];
                          if (
                            newSettings[settingIndex] &&
                            newSettings[settingIndex].customizations
                          ) {
                            (
                              newSettings[settingIndex]
                                .customizations as CustomizeType2[]
                            )[typeIndex].options[optionIndex].price =
                              parseFloat(e.target.value);
                          }
                          setMenu((prev) => ({
                            ...prev,
                            settings: newSettings,
                          }));
                        }}
                      />
                      <button
                        onClick={() => {
                          const newSettings = [...menu.settings];
                          if (
                            newSettings[settingIndex] &&
                            newSettings[settingIndex].customizations
                          ) {
                            (
                              newSettings[settingIndex]
                                .customizations as CustomizeType1[]
                            )[typeIndex].options.splice(optionIndex, 1);
                          }

                          setMenu((prev) => ({
                            ...prev,
                            settings: newSettings,
                          }));
                        }}
                      >
                        削除
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newSettings = [...menu.settings];
                      if (
                        newSettings[settingIndex] &&
                        newSettings[settingIndex].customizations
                      ) {
                        (
                          newSettings[settingIndex]
                            .customizations as CustomizeType2[]
                        )[typeIndex].options.push({
                          optionName: "", // or some default value
                          price: 0,
                        });
                        setMenu((prev) => ({ ...prev, settings: newSettings }));
                      }
                    }}
                  >
                    追加
                  </button>
                  <div>
                    <span>デフォルト: {type2.default}</span>
                    <select
                      value={type2.default}
                      onChange={(e) => {
                        const newSettings = [...menu.settings];
                        if (
                          newSettings[settingIndex] &&
                          newSettings[settingIndex].customizations
                        ) {
                          (
                            newSettings[settingIndex]
                              .customizations as CustomizeType2[]
                          )[typeIndex].default = e.target.value;
                          setMenu((prev) => ({
                            ...prev,
                            settings: newSettings,
                          }));
                        }
                      }}
                    >
                      {type2.options.map((option, optionIndex) => (
                        <option key={optionIndex} value={option.optionName}>
                          {option.optionName} ({option.price}円)
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => {
                      const newSettings = [...menu.settings];
                      if (
                        newSettings[settingIndex] &&
                        newSettings[settingIndex].customizations
                      ) {
                        (
                          newSettings[settingIndex]
                            .customizations as CustomizeType2[]
                        ).splice(typeIndex, 1);
                        setMenu((prev) => ({ ...prev, settings: newSettings }));
                      }
                    }}
                  >
                    このカスタマイズを削除する
                  </button>
                </div>
              );
            })}
            <button
              onClick={() =>
                addCustomizeType2(settingIndex, defaultCustomizeType2)
              }
            >
              カスタマイズタイプ2を追加する
            </button>
            {/* Customization Type 3 */}
            {(setting.customizations || []).map((type3, typeIndex) => {
              if (!isCustomizeType3(type3)) {
                return null; // or return <></> for an empty fragment if you're using React 16+
              }
              // The 'else' branch has the JSX related to CustomizeType1
              return (
                <div key={`${settingIndex}-${typeIndex}`}>
                  名前:
                  <input
                    type="text"
                    placeholder="Name"
                    value={type3.name}
                    onChange={(e) => {
                      const newSettings = [...menu.settings];
                      if (
                        newSettings[settingIndex] &&
                        newSettings[settingIndex].customizations
                      ) {
                        (
                          newSettings[settingIndex]
                            .customizations as CustomizeType3[]
                        )[typeIndex].name = e.target.value;
                      }
                      setMenu((prev) => ({ ...prev, settings: newSettings }));
                    }}
                  />
                  {/* Price */}
                  値段:
                  <input
                    type="number"
                    placeholder="Price"
                    value={type3.price}
                    onChange={(e) => {
                      const newSettings = [...menu.settings];
                      if (
                        newSettings[settingIndex] &&
                        newSettings[settingIndex].customizations
                      ) {
                        (
                          newSettings[settingIndex]
                            .customizations as CustomizeType3[]
                        )[typeIndex].price = parseFloat(e.target.value);
                      }
                      setMenu((prev) => ({ ...prev, settings: newSettings }));
                    }}
                  />
                  {/* Measure Word */}
                  単位:
                  <input
                    type="text"
                    placeholder="Measure Word"
                    value={type3.measureWord}
                    onChange={(e) => {
                      const newSettings = [...menu.settings];
                      if (
                        newSettings[settingIndex] &&
                        newSettings[settingIndex].customizations
                      ) {
                        (
                          newSettings[settingIndex]
                            .customizations as CustomizeType3[]
                        )[typeIndex].measureWord = e.target.value;
                      }
                      setMenu((prev) => ({ ...prev, settings: newSettings }));
                    }}
                  />
                  <button
                    onClick={() => {
                      const newSettings = [...menu.settings];
                      if (
                        newSettings[settingIndex] &&
                        newSettings[settingIndex].customizations
                      ) {
                        (
                          newSettings[settingIndex]
                            .customizations as CustomizeType3[]
                        ).splice(typeIndex, 1);
                        setMenu((prev) => ({ ...prev, settings: newSettings }));
                      }
                    }}
                  >
                    このカスタマイズを削除する
                  </button>
                </div>
              );
            })}
            <button
              onClick={() =>
                addCustomizeType3(settingIndex, defaultCustomizeType3)
              }
            >
              カスタマイズタイプ3を追加する
            </button>
            <button
                    onClick={() => {
                      const newTypes = [...menu.settings];
                newTypes.splice(settingIndex, 1);
                setMenu((prev) => ({ ...prev, settings: newTypes }));
                    }}
                  >
                    このメニュー詳細カテゴリーを削除する
                  </button>
          </div>
          
        ))}
        <button onClick={() => addSetting(defaultSetting)}>
          メニュー詳細カテゴリーを追加する
        </button>
      </div>
      </div>
    </div>
  );
};

export default AddMenuScreenNewNew;
