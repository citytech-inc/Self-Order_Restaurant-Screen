import React, { useState } from "react";
import SettingBar from "../../header/SettingBar";
import "./MenuListScreen.css";
import { useNavigate, useParams } from "react-router-dom";

const MenuListScreen: React.FC = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  const menuData = [
    {
      menuName:  "醤油ラーメン",
      category: "ラーメン",
      price: "¥800",
      code: "¥198",
      groups: "Aコース",
    },
    {
      menuName: "塩ラーメン",
      category: "ラーメン",
      price: "¥120",
      code: "¥32",
      groups: "なし",
    },
    
    {
      menuName: "味噌ラーメン",
    category: "メイン",
    price: "¥800",
    code: "¥195",
    groups: "Aコース",
  },
  {
    menuName: "半ライス",
  category: "サイド",
  price: "¥120",
  code: "¥32",
  groups: "なし",
},
{
  menuName: "烏龍茶",
    category: "ドリンク",
    price: "¥100",
    code: "¥24",
    groups: "Aコース、Bコース",
  },
    // ... add other menu items here
  ];

  const navigateToAddMenu = () => {
    navigate(`/${restaurantId}/add-menu`);
  };

  return (
    <div>
      <SettingBar focusButton="menu" />
      <div className="menuList__container">
        <div className="menuList__header">
          <h2>商品一覧</h2>
          <button className="add-menu__button" onClick={navigateToAddMenu}>
            商品を追加
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>商品名</th>
              <th>カテゴリー</th>
              <th>単価</th>
              <th>原価</th>
              <th>食べ放題</th>
              <th>?        ?        ?</th>
            </tr>   
          </thead>
          <tbody>
            {menuData.map((item, index) => (
              <tr key={index}>
                <td>{item.menuName}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>{item.code}</td>
                <td>{item.groups}</td>
                <td></td> {/* for the last column */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MenuListScreen;
