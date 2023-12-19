import React, { useState } from "react";
import axios from "axios";
import AYCEAddMenu, { MenuType } from "../../components/menu/AYCEAddMenu";
import MenuCategory from "../../components/menu/MenuCategory";
import CustomizeSection from "../../components/menu/CustomizeSection";
import AYCEMenuList from "../../components/menu/AYCEMenuList";
import SettingBar from "../../header/SettingBar";
import SmartphoneIcon from "../../components/images/smartphone-call.png";
import "./MenuScreen.css";
import { useNavigate, useParams } from "react-router-dom";

const AYCEScreen: React.FC = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  const [menuCategoryList, setMenuCategoryList] = useState<string[]>([
    "食べ放題Aコース",
    "食べ放題Bコース",
    "食べ放題Cコース",
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

  return (
    <div>
      <SettingBar focusButton="menu" />
      <MenuCategory defaultType="食べ放題" />
      <div className="menu__container">
        <AYCEMenuList />
        <div className="menu__container__right">
          <AYCEAddMenu
            menuCategoryList={menuCategoryList}
            customize={customize}
            setCustomize={setCustomize}
            menu={menu}
            setMenu={setMenu}
          />
          <div className="add-menu__area">
            <button className="add-menu__button" onClick={sendToBackend}>
              編集を保存
            </button>
          </div>
        </div>
        <div className="icon__area">
            <div className="icon__circle">
                <img src={SmartphoneIcon} alt="Smartphone Icon" className="smartphone__icon" />
            </div>
          </div>
      </div>
    </div>
  );
};

export default AYCEScreen;
