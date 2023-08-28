import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./PurchasedItemsScreen.css";
import SettingBar from "./header/SettingBar";

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
  state: string;
  price: number;
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
  const navigate = useNavigate();
  const location = useLocation();
  const [tableNumber, setTableNumber] = useState(0);
  const [tableOrders, setTableOrders] = useState<OrderData[]>([]);

  useEffect(() => {
    if (location.state && location.state.tableNumber) {
      setTableNumber(location.state.tableNumber);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchTableOrders = async () => {
      try {
        console.log("リクエストを送信しました")
        const response = await fetch("http://localhost:3003/api/orders");
        console.log("リクエストを受信しました")
        const data = await response.json();
        console.log("受信したデータ:", data)
        setTableOrders(data);
      } catch(error: any) {
        console.log("エラー", error.message);
      }
    };
    fetchTableOrders(); 
  }, []);

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

  const handleConfirm = async() => {
    console.log("Confirm button clicked");
    try {
      await fetch(`http://localhost:3003/api/orders/restaurantId/${tableNumber}`, {
        method: 'DELETE',
      });
      console.log(`テーブル番号${tableNumber}の注文情報を削除しました`);
      navigate("/:restaurantId/table-number");
    } catch(error) {
      console.log("エラー", error);
    }
  };

  const handleReturn = () => {
    navigate("/:restaurantId/table-number");
  };

  const currentOrders = tableOrders.filter(
    (order) => order.ids[0].tableId === tableNumber,
  );

  console.log("currentOrder:", currentOrders);
  console.log("tableOeders:", tableOrders);
  console.log("tableNumber:", tableNumber);

  let items: MenuItem[] = [];
  let totalPrice = 0;

  if (currentOrders.length > 0) {
    items = currentOrders.flatMap((order) => order.items);
    totalPrice = items.reduce((total, item) => total + item.price, 0);
  }

  return (
    <div className="purchased-items-container">
      <SettingBar />
      <h1 className="title">商品内容をお確かめください</h1>
      {items.map((item, index) => (
        <div key={index} className="item">
          <p className="item-name">{item.name}</p>
          <p className="item-price">{item.price}</p>
        </div>
      ))}
      <div className="total-price">
        <h2>合計: ¥{totalPrice}</h2>
      </div>
      <button onClick={handleConfirm} className="confirm-button">
        次へ
      </button>
      <button onClick={handleReturn} className="return-button">
        戻る
      </button>
    </div>
  );
};

export default PurchasedItemsScreen;
