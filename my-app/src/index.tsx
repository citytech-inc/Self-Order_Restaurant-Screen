import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import PaymentStartScreen from "./pages/PaymentStartScreen";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import PleaseWaitScreen from "./pages/PleaseWaitScreen";
import PurchasedItemsScreen from "./pages/PurchasedItemsScreen";
import TableNumberScreen from "./pages/TableNumberScreen";
import Settings from "./pages/Settings";
import AddMenuScreen from "./pages/menu/AddMenuScreen";
import OrderScreen from "./pages/OrderScreen";
import NormalAnalysis from "./pages/sales-analysis/NormalAnalysis";
import MenuAnalysis from "./pages/sales-analysis/MenuAnalysis";
import CustomerAnalysis from "./pages/sales-analysis/CustomerAnalysis";
import AIAnalysis from "./pages/sales-analysis/AIAnalysis";
import MenuScreen from "./pages/menu/MenuScreen";
import SetMenuScreen from "./pages/menu/SetMenuScreen";
import AYCEScreen from "./pages/menu/AYCEScreen";
import CustomizeScreen from "./pages/menu/CustomizeScreen";
//import { initializeApp } from "firebase/app";

/*{}
// Firebaseの設定
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASW_MEASUREMENT_ID,
};

// Firebaseを初期化
initializeApp(firebaseConfig);
}*/

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path=":restaurantId" element={<TableNumberScreen />} />
        <Route
          path=":restaurantId/table-number"
          element={<TableNumberScreen />}
        />
        <Route path=":restaurantId/settings" element={<Settings />} />
        <Route
          path=":restaurantId/please-wait"
          element={<PleaseWaitScreen />}
        />
        <Route
          path=":restaurantId/purchased-items"
          element={<PurchasedItemsScreen />}
        />
        <Route path=":restaurantId/menu-list" element={<MenuScreen />} />
        <Route
          path=":restaurantId/menu-list/set-menu"
          element={<SetMenuScreen />}
        />
        <Route path=":restaurantId/menu-list/AYCE" element={<AYCEScreen />} />
        <Route
          path=":restaurantId/menu-list/customize"
          element={<CustomizeScreen />}
        />
        <Route
          path=":restaurantId/sales-analysis"
          element={<NormalAnalysis />}
        />
        <Route
          path=":restaurantId/sales-analysis/menu"
          element={<MenuAnalysis />}
        />
        <Route
          path=":restaurantId/sales-analysis/customer"
          element={<CustomerAnalysis />}
        />
        <Route
          path=":restaurantId/sales-analysis/ai"
          element={<AIAnalysis />}
        />
        <Route path="/:restaurantId/order" element={<OrderScreen />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
