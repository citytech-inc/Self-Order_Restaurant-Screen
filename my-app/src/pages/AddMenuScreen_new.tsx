import React, { useState } from "react";

const AddMenuScreenNew: React.FC = () => {
  type CustomizationOption1 = {
    name: string;
    options: string[];
    default: string;
  };

  type MenuSettings = {
    customizeType1?: CustomizationOption1[];
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

  const defaultSetting: MenuSettings = {};

  const defaultCustomization: CustomizationOption1 = {
    name: "",
    options: [],
    default: "",
  };

  const [menus, setMenus] = useState<MenuType[]>([]);

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
    newCustomization: CustomizationOption1,
  ) => {
    setMenu((prevMenu) => {
      const targetSetting = prevMenu.settings[settingIndex];

      if (targetSetting && !targetSetting.customizeType1) {
        targetSetting.customizeType1 = [];
      }

      return {
        ...prevMenu,
        settings: prevMenu.settings.map((setting, index) =>
          index === settingIndex
            ? {
                ...setting,
                customizeType1: [
                  ...(setting.customizeType1 || []),
                  newCustomization,
                ],
              }
            : setting,
        ),
      };
    });
  };

  return (
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
            {(setting.customizeType1 || []).map((type, typeIndex) => (
              <div key={`${settingIndex}-${typeIndex}`}>
                名前:
                <input
                  type="text"
                  placeholder="Name"
                  value={type.name}
                  onChange={(e) => {
                    const newSettings = [...menu.settings];
                    if (
                      newSettings[settingIndex] &&
                      newSettings[settingIndex].customizeType1
                    ) {
                      (
                        newSettings[settingIndex]
                          .customizeType1 as CustomizationOption1[]
                      )[typeIndex].name = e.target.value;
                    }
                    setMenu((prev) => ({ ...prev, settings: newSettings }));
                  }}
                />
                オプション:
                {type.options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <input
                      type="text"
                      placeholder={`Option ${optionIndex + 1}`}
                      value={option}
                      onChange={(e) => {
                        const newSettings = [...menu.settings];
                        if (
                          newSettings[settingIndex] &&
                          newSettings[settingIndex].customizeType1
                        ) {
                          (
                            newSettings[settingIndex]
                              .customizeType1 as CustomizationOption1[]
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
                          newSettings[settingIndex].customizeType1
                        ) {
                          (
                            newSettings[settingIndex]
                              .customizeType1 as CustomizationOption1[]
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
                      newSettings[settingIndex].customizeType1
                    ) {
                      (
                        newSettings[settingIndex]
                          .customizeType1 as CustomizationOption1[]
                      )[typeIndex].options.push("");
                      setMenu((prev) => ({ ...prev, settings: newSettings }));
                    }
                  }}
                >
                  追加
                </button>
                <div>
                  <span>デフォルト: {type.default}</span>
                  <select
                    value={type.default}
                    onChange={(e) => {
                      const newSettings = [...menu.settings];
                      if (
                        newSettings[settingIndex] &&
                        newSettings[settingIndex].customizeType1
                      ) {
                        (
                          newSettings[settingIndex]
                            .customizeType1 as CustomizationOption1[]
                        )[typeIndex].default = e.target.value;
                        setMenu((prev) => ({
                          ...prev,
                          settings: newSettings,
                        }));
                      }
                    }}
                  >
                    {type.options.map((option, optionIndex) => (
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
                      newSettings[settingIndex].customizeType1
                    ) {
                      (
                        newSettings[settingIndex]
                          .customizeType1 as CustomizationOption1[]
                      ).splice(typeIndex, 1);
                      setMenu((prev) => ({ ...prev, settings: newSettings }));
                    }
                  }}
                >
                  このカスタマイズを削除する
                </button>
              </div>
            ))}
            <button
              onClick={() =>
                addCustomizeType1(settingIndex, defaultCustomization)
              }
            >
              カスタマイズタイプ1を追加する
            </button>
          </div>
        ))}
        <button onClick={() => addSetting(defaultSetting)}>
          メニュー詳細カテゴリーを追加する
        </button>
      </div>

      {/* Display Menus Component */}
      <div>
        <h2>メニュー</h2>
        {menus.map((menuItem, index) => (
          <div key={index}>
            <h3>{menuItem.name}</h3>
            <img
              src={menuItem.picture}
              alt={menuItem.name}
              style={{ width: "200px" }}
            />
            <p>カテゴリー: {menu.category}</p>
            <p>値段: {menuItem.price}円</p>

            <button
              onClick={() => {
                // Edit menu logic
              }}
            >
              編集
            </button>
            <button
              onClick={() => {
                const updatedMenus = [...menus];
                updatedMenus.splice(index, 1);
                setMenus(updatedMenus);
              }}
            >
              削除
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddMenuScreenNew;
