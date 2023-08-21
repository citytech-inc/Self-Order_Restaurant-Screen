import React, { useState } from "react";

const AddMenuScreen: React.FC = () => {
  type MenuType = {
    category: string;
    name: string;
    picture: string;
    price: number;
    customizeType1: Array<{ name: string; options: string[]; default: string }>;
    customizeType2: Array<{
      name: string;
      options: Array<{ optionName: string; price: number }>;
      default: string;
    }>;
    customizeType3: Array<{
      name: string;
      price: number;
      measureWord: string;
      default: string;
    }>;
  };

  const [menuCategoryList, setMenuCategoryList] = useState<string[]>([]);
  const [menu, setMenu] = useState<MenuType>({
    category: "",
    name: "",
    picture: "",
    price: 0,
    customizeType1: [],
    customizeType2: [],
    customizeType3: [],
  });
  const [menus, setMenus] = useState<MenuType[]>([]);

  const addCustomizeType1 = () => {
    const customization = {
      name: "",
      options: [],
      default: "",
    };
    setMenu((prev) => ({
      ...prev,
      customizeType1: [...prev.customizeType1, customization],
    }));
  };

  const addCustomizeType2 = () => {
    const customization = {
      name: "",
      options: [],
      default: "",
    };
    setMenu((prev) => ({
      ...prev,
      customizeType2: [...prev.customizeType2, customization],
    }));
  };

  const addCustomizeType3 = () => {
    const customization = {
      name: "",
      price: 0,
      measureWord: "",
      default: "",
    };
    setMenu((prev) => ({
      ...prev,
      customizeType3: [...prev.customizeType3, customization],
    }));
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
          onChange={(e) => {
            const value = e.target.value;
            if (!menuCategoryList.includes(value)) {
              setMenuCategoryList((prev) => [...prev, value]);
            }
          }}
        />
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
        {/* Customization Type 1 */}
        {menu.customizeType1.map((type, index) => (
          <div key={index}>
            名前:
            <input
              type="text"
              placeholder="Name"
              value={type.name}
              onChange={(e) => {
                const newTypes = [...menu.customizeType1];
                newTypes[index].name = e.target.value;
                setMenu((prev) => ({ ...prev, customizeType1: newTypes }));
              }}
            />
            {/* Options */}
            オプション:
            {type.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <input
                  type="text"
                  placeholder={`Option ${optionIndex + 1}`}
                  value={option}
                  onChange={(e) => {
                    const newTypes = [...menu.customizeType1];
                    newTypes[index].options[optionIndex] = e.target.value;
                    setMenu((prev) => ({ ...prev, customizeType1: newTypes }));
                  }}
                />
                <button
                  onClick={() => {
                    const newTypes = [...menu.customizeType1];
                    newTypes[index].options.splice(optionIndex, 1);
                    setMenu((prev) => ({ ...prev, customizeType1: newTypes }));
                  }}
                >
                  削除
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                const newTypes = [...menu.customizeType1];
                newTypes[index].options.push("");
                setMenu((prev) => ({ ...prev, customizeType1: newTypes }));
              }}
            >
              追加
            </button>
            {/* Default */}
            <div>
              <span>デフォルト: {type.default}</span>
              <select
                value={type.default}
                onChange={(e) => {
                  const newTypes = [...menu.customizeType1];
                  newTypes[index].default = e.target.value;
                  setMenu((prev) => ({ ...prev, customizeType1: newTypes }));
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
                const newTypes = [...menu.customizeType1];
                newTypes.splice(index, 1);
                setMenu((prev) => ({ ...prev, customizeType1: newTypes }));
              }}
            >
              このカスタマイズを削除する
            </button>
          </div>
        ))}
        <button onClick={addCustomizeType1}>
          カスタマイズタイプ1を追加する
        </button>
        {/* Customization Type 2 */}
        {menu.customizeType2.map((type, index) => (
          <div key={index}>
            {/* Name */}
            名前:
            <input
              type="text"
              placeholder="Name"
              value={type.name}
              onChange={(e) => {
                const newTypes = [...menu.customizeType2];
                newTypes[index].name = e.target.value;
                setMenu((prev) => ({ ...prev, customizeType2: newTypes }));
              }}
            />
            {/* Options */}
            <div>
              オプション:
              {type.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <input
                    type="text"
                    placeholder="Option Name"
                    value={option.optionName}
                    onChange={(e) => {
                      const updatedOptions = [...type.options];
                      updatedOptions[optionIndex].optionName = e.target.value;
                      const newTypes = [...menu.customizeType2];
                      newTypes[index].options = updatedOptions;
                      setMenu((prev) => ({
                        ...prev,
                        customizeType2: newTypes,
                      }));
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={option.price}
                    onChange={(e) => {
                      const updatedOptions = [...type.options];
                      updatedOptions[optionIndex].price = parseFloat(
                        e.target.value,
                      );
                      const newTypes = [...menu.customizeType2];
                      newTypes[index].options = updatedOptions;
                      setMenu((prev) => ({
                        ...prev,
                        customizeType2: newTypes,
                      }));
                    }}
                  />
                  <button
                    onClick={() => {
                      const updatedOptions = [...type.options];
                      updatedOptions.splice(optionIndex, 1);
                      const newTypes = [...menu.customizeType2];
                      newTypes[index].options = updatedOptions;
                      setMenu((prev) => ({
                        ...prev,
                        customizeType2: newTypes,
                      }));
                    }}
                  >
                    削除
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const updatedOptions = [
                    ...type.options,
                    { optionName: "", price: 0 },
                  ];
                  const newTypes = [...menu.customizeType2];
                  newTypes[index].options = updatedOptions;
                  setMenu((prev) => ({ ...prev, customizeType2: newTypes }));
                }}
              >
                追加
              </button>
            </div>
            {/* Default */}
            <div>
              <span>デフォルト:</span>
              <select
                value={type.default}
                onChange={(e) => {
                  const newTypes = [...menu.customizeType2];
                  newTypes[index].default = e.target.value;
                  setMenu((prev) => ({ ...prev, customizeType2: newTypes }));
                }}
              >
                {type.options.map((option, optionIndex) => (
                  <option key={optionIndex} value={option.optionName}>
                    {option.optionName} ({option.price}円)
                  </option>
                ))}
              </select>
            </div>
            {/* Button to delete this customization type */}
            <button
              onClick={() => {
                const newTypes = [...menu.customizeType2];
                newTypes.splice(index, 1);
                setMenu((prev) => ({ ...prev, customizeType2: newTypes }));
              }}
            >
              このカスタマイズを削除する
            </button>
          </div>
        ))}
        <button onClick={addCustomizeType2}>
          カスタマイズタイプ2を追加する
        </button>
        {/* Customization Type 3 */}
        {menu.customizeType3.map((type, index) => (
          <div key={index}>
            {/* Name */}
            名前:
            <input
              type="text"
              placeholder="Name"
              value={type.name}
              onChange={(e) => {
                const newTypes = [...menu.customizeType3];
                newTypes[index].name = e.target.value;
                setMenu((prev) => ({ ...prev, customizeType3: newTypes }));
              }}
            />
            {/* Price */}
            値段:
            <input
              type="number"
              placeholder="Price"
              value={type.price}
              onChange={(e) => {
                const newTypes = [...menu.customizeType3];
                newTypes[index].price = parseFloat(e.target.value);
                setMenu((prev) => ({ ...prev, customizeType3: newTypes }));
              }}
            />
            {/* Measure Word */}
            単位:
            <input
              type="text"
              placeholder="Measure Word"
              value={type.measureWord}
              onChange={(e) => {
                const newTypes = [...menu.customizeType3];
                newTypes[index].measureWord = e.target.value;
                setMenu((prev) => ({ ...prev, customizeType3: newTypes }));
              }}
            />
            <button
              onClick={() => {
                const newTypes = [...menu.customizeType3];
                newTypes.splice(index, 1);
                setMenu((prev) => ({ ...prev, customizeType3: newTypes }));
              }}
            >
              このカスタマイズタイプ3を削除する
            </button>
          </div>
        ))}
        <button onClick={addCustomizeType3}>
          カスタマイズタイプ3を追加する
        </button>
        <button
          onClick={() => {
            setMenus((prev) => [...prev, menu]);
            setMenu({
              category: "",
              name: "",
              picture: "",
              price: 0,
              customizeType1: [],
              customizeType2: [],
              customizeType3: [],
            });
          }}
        >
          メニューを追加
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

            <div>
              <h4>カスタマイズタイプ1</h4>
              {menuItem.customizeType1.map((type, typeIndex) => (
                <div key={typeIndex}>
                  <strong>{type.name}</strong>
                  <p>オプション: {type.options.join(", ")}</p>
                  <p>デフォルト: {type.default}</p>
                </div>
              ))}
            </div>

            <div>
              <h4>カスタマイズタイプ2</h4>
              {menuItem.customizeType2.map((type, typeIndex) => (
                <div key={typeIndex}>
                  <strong>{type.name}</strong>
                  <ul>
                    {type.options.map((option, optionIndex) => (
                      <li key={optionIndex}>
                        {option.optionName}: {option.price}円
                      </li>
                    ))}
                  </ul>
                  <p>デフォルト: {type.default}</p>
                </div>
              ))}
            </div>

            <div>
              <h4>カスタマイズタイプ3</h4>
              {menuItem.customizeType3.map((type, typeIndex) => (
                <div key={typeIndex}>
                  <strong>{type.name}</strong>
                  <p>
                    値段: {type.price}円/{type.measureWord}
                  </p>
                </div>
              ))}
            </div>

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

export default AddMenuScreen;
