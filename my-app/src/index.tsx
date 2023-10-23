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
import AddMenuScreen from "./pages/menu/AddMenuScreen";
import OrderScreen from "./pages/OrderScreen";
import NormalAnalysis from "./pages/sales-analysis/NormalAnalysis";
import MenuAnalysis from "./pages/sales-analysis/MenuAnalysis";
import CustomerAnalysis from "./pages/sales-analysis/CustomerAnalysis";
import MenuListScreen from "./pages/menu/MenuListScreen";

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
        <Route
          path=":restaurantId/please-wait"
          element={<PleaseWaitScreen />}
        />
        <Route
          path=":restaurantId/purchased-items"
          element={<PurchasedItemsScreen />}
        />
        <Route path=":restaurantId/menu-list" element={<MenuListScreen />} />
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
        <Route path="/:restaurantId/order" element={<OrderScreen />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
