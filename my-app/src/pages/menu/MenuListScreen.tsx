import React, { useState } from "react";
import SettingBar from "../../header/SettingBar";
import "./MenuListScreen.css";

const MenuListScreen: React.FC = () => {

  const menuData = [
    { menuName: '通常ランダ', category: 'メイン', price: '¥800', code: '¥198', groups: 'Aコース' },
    { menuName: '特ランダ', category: 'メイン', price: '¥120', code: '¥32', groups: 'なし' },
    // ... add other menu items here
  ];

  return (
    <div>
      <SettingBar focusButton="menu" />
      <div className="menu__container">
        <table>
          <thead>
            <tr>
              <th>商品名</th>
              <th>カテゴリー</th>
              <th>単価</th>
              <th>原価</th>
              <th>食べ放題区分</th>
              <th>? ? ?</th>
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
