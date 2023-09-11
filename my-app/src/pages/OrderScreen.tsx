import React, { useState, useEffect } from "react";
import "./OrderScreen.css";
import { DisplayArea } from "../components/DisplayArea";
import SettingBar from "../header/SettingBar";

interface Order {
  id: string;
  order: string;
  type: string;
}

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

function OrderScreen() {
  //const [orders, setOrders] = useState(initialOrders);
  const [orders, setOrders] = useState<Order[]>([]);

  const handleDelete = (id: string) => {
    setOrders((orders) => orders.filter((order) => order.id !== id));
  };

  useEffect(() => {
    // WebSocketクライアントの設定
    const webSocket = new WebSocket("ws://localhost:3004"); // WebSocketサーバーのURLを指定

    // メッセージの受信処理
    webSocket.onmessage = (event) => {
      try {
        const orderData = JSON.parse(event.data) as OrderData;

        if (orderData.ids && orderData.ids.length > 0) {
          const tableIdNumber = orderData.ids[0]["tableId"];
          const tableIdString = tableIdNumber.toString();
          const newOrder: Order = {
            id: tableIdString,
            order: orderData.items
              .map((item: MenuItem) => item.name)
              .join(", "),
            type: "main", // 注文タイプを適切に設定する必要があります
          };

          console.log("受信した注文情報:", orderData);
          console.log("新しい注文情報:", newOrder);

          setOrders((prevOrders) => [...prevOrders, newOrder]);
        }
      } catch (error) {
        console.error("受信したメッセージのパースに失敗しました:", error);
      }
    };

    // クリーンアップ
    return () => {
      if (webSocket) {
        webSocket.close();
      }
    };
  }, []);

  return (
    <div>
    <SettingBar focusButton="order" />
    <div className="OrderScreen__button"></div>
    <div className="OrderScreen">
      
      <DisplayArea
        title="メインメニュー"
        orders={orders.filter((o) => o.type === "main")}
        onDelete={handleDelete}
      />
      <DisplayArea
        title="サイドメニュー"
        orders={orders.filter((o) => o.type === "side")}
        onDelete={handleDelete}
      />
      <DisplayArea
        title="ドリンク"
        orders={orders.filter((o) => o.type === "drink")}
        onDelete={handleDelete}
      />
      <DisplayArea
        title="食後提供"
        orders={orders.filter((o) => o.type === "afterMeal")}
        onDelete={handleDelete}
      />
    </div>
    </div>
  );
}

export default OrderScreen;
