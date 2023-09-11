import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./PurchasedItemsScreen.css";
import SettingBar from "../header/SettingBar";

/*{
interface Item {
  name: string;
  price: number;
}

/*{
interface Order {
  tableNumber: number;
  items: Item[];
}
}*/

interface MenuItem {
  name: string;
  price: number;
  image: string;
  settings: {
    [key: string]: {
      name: string;
      options: {
        [key: string]: [string, number];
      }[];
      default: number;
    };
  };
  itemNumber: number;
}

interface Id {
  restaurantId: number;
  tableId: number;
}

interface OrderData {
  items: MenuItem[];
  ids: Id[];
}

/*{
//テーブルごとの合計金額を計算する関数
const calculateTotalPriceForTable = (tableNumber: number, tableOrders: OrderData[]): number => {
  const order = tableOrders.find((order) => order.ids[0].tableId === tableNumber);
  if (!order) {
    return 0;
  }
  return order.items.reduce((total, item) => total + item.price, 0)
};
}*/

const PurchasedItemsScreen: React.FC = () => {
  const { restaurantId } = useParams();
  const cleanedRestaurantId = restaurantId?.replace(":", "");
  const navigate = useNavigate();
  const location = useLocation();
  const [tableNumber, setTableNumber] = useState(0);
  const [tableOrders, setTableOrders] = useState<OrderData[]>([]);
  const [focusButton, setFocusButton] = useState<string | null>(null);

  useEffect(() => {
    if (location.state && location.state.tableNumber) {
      setTableNumber(location.state.tableNumber);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchTableOrders = async () => {
      try {
        console.log("リクエストを送信しました");
        console.log("cleanedRestaurantId:", cleanedRestaurantId);
        const response = await fetch(
          `http://localhost:3003/api/orders/${cleanedRestaurantId}`,
        );
        console.log("リクエストを受信しました");
        const data = await response.json();
        console.log("受信したデータ:", data);
        setTableOrders(data);
      } catch (error: any) {
        console.log("エラー", error.message);
      }
    };
    fetchTableOrders();
  }, [restaurantId]);

  /*{
    const tableOrders = [
    {
      tableNumber: 1,
      items: [
        { name: "醤油ラーメン", price: 800 },
        { name: "唐揚げ", price: 300 },
        { name: "抹茶アイス", price: 200 },
      ],
    },
    {
      tableNumber: 2,
      items: [
        { name: "カレーライス", price: 700 },
        { name: "日本酒", price: 500 },
      ],
    },
  ];
}*/

  const handleConfirm = async () => {
    console.log("Confirm button clicked");
    try {
      await fetch(
        `http://localhost:3003/api/orders/${cleanedRestaurantId}/${tableNumber}`,
        {
          method: "DELETE",
        },
      );
      console.log(`テーブル番号${tableNumber}の注文情報を削除しました`);
      navigate(`/${cleanedRestaurantId}/table-number`);
    } catch (error) {
      console.log("エラー", error);
    }
  };

  const handleReturn = () => {
    navigate(`/${cleanedRestaurantId}/table-number`);
  };

  const currentOrders = tableOrders.filter(
    (order) => order.ids[0].tableId === tableNumber,
  );

  console.log("currentOrder:", currentOrders);
  console.log("tableOrders:", tableOrders);
  console.log("tableNumber:", tableNumber);

  let items: MenuItem[] = [];
  let totalPrice = 0;

  if (currentOrders.length > 0) {
    items = currentOrders.flatMap((order) => order.items);
    totalPrice = items.reduce((total, item) => total + item.price, 0);
  }

  return (
    <div className="purchased-items-container">
      <SettingBar focusButton="payment" />
      <button onClick={handleReturn} className="return-button">
        戻る
      </button>
      <h1 className="title">商品内容をお確かめください（税込）</h1>
      {items.map((item, index) => (
        <div key={index} className="item">
          <p className="item-name">{item.name}</p>
          <p className="item-price">{item.price}</p>
        </div>
      ))}
      <div className="payment__totalPrice">
        <span>合計金額: {totalPrice}円 <span className="payment__tax">(税込)</span></span>
      </div>
      <div>
        <button onClick={handleConfirm} className="change-button">
        変更
      </button>
      <button onClick={handleConfirm} className="confirm-button">
        次へ
      </button>
      </div>
      
      
    </div>
  );
};

export default PurchasedItemsScreen;
