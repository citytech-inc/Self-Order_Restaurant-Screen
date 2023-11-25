import React, { useState } from "react";
import axios from "axios";
import AddMenu, { MenuType } from "../../components/menu/AddMenu";
import MenuCategory from "../../components/menu/MenuCategory";
import CustomizeSection from "../../components/menu/CustomizeSection";
import MenuList from "../../components/menu/MenuList";
import SettingBar from "../../header/SettingBar";
import SmartphoneIcon from "../../components/images/smartphone-call.png";
import "./MenuScreen.css";
import { useNavigate, useParams } from "react-router-dom";

const AddMenuScreen: React.FC = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  const [menuCategoryList, setMenuCategoryList] = useState<string[]>([
    "ラーメン",
    "セットメニュー",
    "飲み物",
    "デザート",
  ]);

  const [menu, setMenu] = useState<MenuType>({
    category: menuCategoryList[0],
    name: "",
    image: "",
    price: 0,
    description: "",
    settings: {},
  });

  const sendToBackend = async () => {
    console.log("sendToBackend");
    //フロントだけで動作を確認したいときは商品を登録のところのonClickをsendToBackendからresetScreenに変更
    try {
      const response = await axios.post("http://localhost:3003/api/menu", {
        menuCategories: menuCategoryList,
        menus: menu,
        restaurantId: Number(restaurantId),
      });
      if (response.status === 200) {
        console.log(
          "Menu data sent successfully!",
          JSON.stringify({
            menuCategories: menuCategoryList,
            menus: menu,
            restaurantId: Number(restaurantId),
          }),
        );
        //resetScreen();
      }
    } catch (error) {
      console.error("Failed to send menu data:", error);
    }
  };

  const [customize, setCustomize] = useState<string>("なし");

  const resetScreen = () => {
    // Resetting the state to initial values
    console.log(JSON.stringify(menu));
    setMenuCategoryList(["ラーメン", "セットメニュー", "飲み物", "デザート"]);
    setCustomize("なし");
    navigate(`/${restaurantId}/menu-list`);
  };

  return (
    <div>
      <SettingBar focusButton="menu" />
      <MenuCategory />
      <div className="menu__container">
        <MenuList />
        <div className="menu__container__right">
          <AddMenu
            menuCategoryList={menuCategoryList}
            customize={customize}
            setCustomize={setCustomize}
            menu={menu}
            setMenu={setMenu}
          />
          <div className="add-menu__area">
            <button className="add-menu__button" onClick={sendToBackend}>
              商品を編集
            </button>
          </div>
        </div>
        <div>
            <img src={SmartphoneIcon} alt="Smartphone Icon" className="smartphone__icon" />
          </div>
      </div>
    </div>
  );
};

export default AddMenuScreen;
