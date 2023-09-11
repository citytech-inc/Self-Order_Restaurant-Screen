// App.tsx
import React from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import PaymentStartScreen from "./pages/PaymentStartScreen";
import TableNumberScreen from "./pages/TableNumberScreen";
import PleaseWaitScreen from "./pages/PleaseWaitScreen";
import PurchasedItemsScreen from "./pages/PurchasedItemsScreen";
import AddMenuScreenNewNew from "./pages/AddMenuScreen";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path=":restaurantId"
          element={<PaymentStartScreen />} // restaurantId のデフォルト値を指定
        />
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
        <Route
          path=":restaurantId/add-menu"
          element={<AddMenuScreenNewNew />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
