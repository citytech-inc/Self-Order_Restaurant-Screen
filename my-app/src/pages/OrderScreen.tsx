import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import "./OrderScreen.css";
import { DisplayArea } from "../components/DisplayArea";
import SettingBar from "../header/SettingBar";
import IOSStyleSwitch from '../components/iOSStyleSwitch';

interface Order {
  id: string;
  order: string;
  type: string;
  settings: string[];
  hourTime: number;
  minuteTime: number;
}

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
      selected: number;
      values: {
        [key: string]: [string, number];
      };
      type: number;
    };
  };
  itemNumber: number;
}

interface Id {
  restaurantId: number;
  tableId: number;
}

interface Time {
  yearTime: number;
  monthTime: number;
  dayTime: number;
  dateTime: number;
  hourTime: number;
  minuteTime: number;
}


interface OrderData {
  items: MenuItem[][];
  ids: Id[];
  timestamp: Time[];
}

function OrderScreen() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const { restaurantId } = useParams();
  const cleanedRestaurantId = restaurantId?.replace(":", "");

  const handleDelete = (id: string) => {
    setOrders((orders) => orders.filter((order) => order.id !== id));
  };

  useEffect(() => {
    const webSocket = new WebSocket("ws://localhost:3004");

    webSocket.onmessage = (event) => {
      try {
        const orderData = JSON.parse(event.data) as OrderData;

        if (orderData.ids && orderData.ids.length > 0) {
          const tableIdNumber = orderData.ids[0].tableId;
          const tableIdString = tableIdNumber.toString();

          const currentTimeHour = orderData.timestamp[0].hourTime
          const currentTimeMinute = orderData.timestamp[0].minuteTime
          
          if (orderData.ids[0].restaurantId.toString() === cleanedRestaurantId) {
            const newOrders: Order[] = [];

            for (const item of orderData.items[0]) {
              const settings: string[] = [];

              for (const key in item.settings) {
                const options = item.settings[key].options;
                
                for (const option of options){
                  console.log("4-option.type", option.type)
                  console.log("4-option", option);

                  //typeに分けて表示方法を変更
                  if (typeof option.type === 'number' && typeof option.selected === 'number' && option.type === 1 && option.default !== option.selected) {
                    const value = option.values[option.selected];
                    console.log("5-1-value", value);
                    if (value) {
                      settings.push(`${option.name}: ${value}`);
                    }
                  } else if (typeof option.type === 'number' && typeof option.selected === 'number' && option.type === 2 && option.default !== option.selected) {
                    const value = option.values[option.selected];
                    console.log("5-2-value", value);
                    if (value && typeof value === 'string') {
                      settings.push(`${option.name}: ${value}`);
                    }
                  } else if (typeof option.type === 'number' && option.type === 3 && option.default !== option.selected) {
                    console.log("5-3");
                    settings.push(`${option.name} × ${option.selected}`);
                  }
                }
              }
              console.log("settings", settings)
              const newOrder: Order = {
                id: tableIdString,
                order: item.name,
                type: "main",
                settings: settings,
                hourTime: currentTimeHour,
                minuteTime: currentTimeMinute,
              };
              newOrders.push(newOrder);
            }

            console.log("受信した注文データ", JSON.stringify(orderData));
            console.log("作成した注文データ", newOrders);

            setOrders(prevOrders => [...prevOrders, ...newOrders]);
          }
        }
      } catch (error) {
        console.error('受信したメッセージのパースに失敗しました:', error);
      }
    };

    return () => {
      if (webSocket) {
        webSocket.close();
      }
    };
  }, []);

  return (
    <div>
      <SettingBar focusButton="order" />
    
      <div className="OrderScreen">
        <div className="order__button">
          <text className="order__buttonText">
            {isChecked ? "削除済み" : "提供待ち"}
          </text>
          <IOSStyleSwitch 
            defaultChecked={isChecked} 
            onChange={(newState: boolean) => {
              setIsChecked(newState);
            }}
          />
        </div>
      
        <div className="order__areas">
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
    </div>
  );
}

export default OrderScreen;
