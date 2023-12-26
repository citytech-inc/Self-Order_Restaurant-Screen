import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./PurchasedItemsScreen.css";
import SettingBar from "../header/SettingBar";
import ArrowIcon from "../../src/components/images/arrowhead-thin-outline-to-the-left.png";
import ConfirmPaymentPopup from "./../popups/ConfirmPaymentPopup";
import CompletePaymentPopup from "./../popups/CompletePaymentPopup";

// 分析用の関数のimport (最終的には移動させる)
import sendPostRequest from "../functions/analysisFunction";

interface Id {
  restaurantId: number;
  tableId: number;
}

interface OrderData {
  items: MenuItem[];
  ids: Id[];
}

interface MenuItem {
  name: string;
  price: number;
  sellingPrice: number;
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
  items: MenuItem[];
  ids: Id[];
  timestamp: Time[];
}

const PurchasedItemsScreen: React.FC = () => {
  const { restaurantId } = useParams();
  const cleanedRestaurantId = restaurantId?.replace(":", "");
  const navigate = useNavigate();
  const location = useLocation();
  const [tableNumber, setTableNumber] = useState(0);
  const [tableOrders, setTableOrders] = useState<OrderData[]>([]);
  const [focusButton, setFocusButton] = useState<string | null>(null);
  const [confirmPaymentPopup, setConfirmPaymentPopup] = useState(false);
  const [completePaymentPopup, setCompletePaymentPopup] = useState(false);

  const completePayment = () => {
    setCompletePaymentPopup(false);
    navigate(`/${restaurantId}/table-number`);
  };

  // 分析用の関数の仕様 (最終的には移動させる)
  useEffect(() => {
    sendPostRequest(
      [0, 1694821920000, 1695196740000, 2694835660000],
      restaurantId,
    ) // 第一引数はtimestampの配列
      .then((result) => {
        console.log(result);
      });
  });

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
        console.log("受信したデータ:", JSON.stringify(data));
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

    setConfirmPaymentPopup(true);
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
  //let totalPrice = 0;

  // 注文データを処理してトッピング情報を取得する関数
  function extractToppingsFromOrder(orderData: OrderData): string {
    let toppingsInfo = "";

    //console.log("func-orderData.items", JSON.stringify(orderData.items));

    for (const order of orderData.items) {
      //console.log("func-order", JSON.stringify(order));
      for (const settingsKey in order.settings) {
        const settings = order.settings[settingsKey];
        if (settings && settings.options) {
          for (const option of settings.options) {
            if (
              option &&
              typeof option.selected === "number" &&
              typeof option.type === "number" &&
              option.selected !== option.default
            ) {
              if (option.type === 1) {
                const value = option.values[option.selected];
                toppingsInfo += `${value}, 0 \n`;
              } else if (option.type === 2) {
                const value = option.values[option.selected];
                toppingsInfo += `${value} \n`;
              } else if (
                option.type === 3 &&
                typeof option.price === "number"
              ) {
                const name = option.name;
                const selected = option.selected;
                const measureWord = option.measureWord || "";
                const price = option.price * selected;
                toppingsInfo += `${name} × ${selected} ${measureWord} (${price})\n`;
              }
            }
          }
        }
      }
      toppingsInfo += "\n";
    }

    return toppingsInfo;
  }

  // 注文データを処理してトッピングの合計金額を計算する関数
  function calculateToppingsPrice(orderData: OrderData): number {
    console.log("func");
    let toppingsPrice = 0;
    for (const order of orderData.items) {
      for (const settingsKey in order.settings) {
        const settings = order.settings[settingsKey];
        if (settings && settings.options) {
          for (const option of settings.options) {
            if (
              option &&
              typeof option.selected === "number" &&
              typeof option.type === "number" &&
              option.selected !== option.default
            ) {
              if (option.type === 2) {
                const selectedOption = option.values[option.selected];
                if (
                  Array.isArray(selectedOption) &&
                  typeof selectedOption[1] === "number"
                ) {
                  toppingsPrice += selectedOption[1];
                }
              } else if (
                option.type === 3 &&
                typeof option.price === "number"
              ) {
                // オプションの価格をトッピング合計に加算
                toppingsPrice += option.price * option.selected;
              }
            }
          }
        }
      }
    }
    return toppingsPrice;
  }

  items = currentOrders.flatMap((order) => order.items).flat();
  const totalPriceMainMenu = items.reduce(
    (total, item) => total + item.sellingPrice,
    0,
  );
  let totalPriceSettings = 0;
  for (const currentOrder of currentOrders) {
    totalPriceSettings += calculateToppingsPrice(currentOrder);
  }
  const totalPrice = Math.round(totalPriceMainMenu + totalPriceSettings);

  console.log("items", items);

  return (
    <div>
      {confirmPaymentPopup && (
        <ConfirmPaymentPopup
          function={{
            closeConfirmPayment: setConfirmPaymentPopup,
            openCompletePayment: setCompletePaymentPopup,
          }}
        />
      )}
      {completePaymentPopup && (
        <CompletePaymentPopup
          function={{
            closeCompletePayment: completePayment,
          }}
        />
      )}
      <SettingBar focusButton="payment" />
      <div className="purchased-items-container">
        <button onClick={handleReturn} className="return-button">
          <img src={ArrowIcon} alt="Arrow Icon" className="return-button__icon" />
          QRコード番号: {tableNumber}
        </button>
        <h1 className="title">商品内容をお確かめください（税込）</h1>
        <div className="payment__item-box">
          <div style={{ height: "15px" }} />
          {currentOrders.map((item, index) => (
            <div className="item-box">
              <div
                key={index}
                className="item-title"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "stretch",
                    }}
                  ></div>
                  <div className="item-title__name">{item.items[0].name}</div>
                </div>
                <div style={{ width: "15vw" }}>
                  <span className="item-title__price">
                    {item.items[0].sellingPrice}円
                    <span className="item-title__tax">(税込)</span>
                    <span className="item-title__number">
                      ×&ensp;{item.items.length}
                    </span>
                  </span>
                </div>
              </div>
              <div className="option-box">
                {item.items.map((element: any, i: number) => (
                  <div key={i} className="option-box__one-item">
                    <div className="divider-wrapper">
                      <div
                        className="divider"
                        style={i === 0 ? { width: "97%" } : {}}
                      />
                    </div>

                    {(() => {
                      const options = Object.keys(element.settings).map((idx) =>
                        (element.settings[idx]?.options || []).map(
                          (value: any, index: number) => {
                            if (value.selected === value.default) {
                              return null;
                            }
                            if (value.type === 1) {
                              return (
                                <div
                                  key={index}
                                  className="option-box__one-option"
                                >
                                  <p className="option-box__name">
                                    {value.name}：{value.values[value.selected]}
                                  </p>
                                  <div className="option-box__details">
                                    <span className="option-box__price">
                                      0円
                                      <span className="option-box__tax">
                                        (税込)
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              );
                            } else if (value.type === 2) {
                              return (
                                <div
                                  key={index}
                                  className="option-box__one-option"
                                >
                                  <p className="option-box__name">
                                    {value.name}：
                                    {value.values[value.selected][0]}
                                  </p>
                                  <div className="option-box__details">
                                    <span className="option-box__price">
                                      {value.values[value.selected][1]}円
                                      <span className="option-box__tax">
                                        (税込)
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              );
                            } else if (value.type === 3) {
                              return (
                                <div
                                  key={index}
                                  className="option-box__one-option"
                                >
                                  <p className="option-box__name">
                                    {value.name}
                                  </p>
                                  <div className="option-box__details">
                                    <span className="option-box__price">
                                      {value.price}円
                                      <span className="option-box__tax">
                                        (税込)
                                      </span>
                                    </span>
                                    <span className="option-box__number">
                                      ×&ensp;{value.selected}
                                    </span>
                                  </div>
                                </div>
                              );
                            } else {
                              return null;
                            }
                          },
                        ),
                      );
                      if (
                        [...options].every((option) => {
                          return option.every((value: any) => value === null);
                        })
                      ) {
                        return (
                          <div className="option-box__one-option">
                            <p className="option-box__name">カスタマイズなし</p>
                          </div>
                        );
                      } else {
                        return options;
                      }
                    })()}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        paddingBottom: "5px",
                        paddingTop: "0",
                        paddingLeft: "20px",
                      }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="payment">
        <div className="payment__price-area">
          <span>
            <span className="payment__text">合計金額</span>
            <span className="payment__total-price">{totalPrice}円</span>
            <span className="payment__text">(税込)</span>
          </span>
        </div>
        <div className="payment__buttons">
          <button onClick={handleConfirm} className="change-button">
            変更
          </button>
          <button onClick={handleConfirm} className="confirm-button">
            次へ
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasedItemsScreen;
