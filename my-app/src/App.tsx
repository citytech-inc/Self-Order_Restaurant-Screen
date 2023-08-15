import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PaymentStart from "./pages/PaymentStartScreen";
import PleaseWaitScreen from "./pages/PleaseWaitScreen";
import PurchasedItemsScreen from "./pages/PurchasedItemsScreen";
import TableNumberScreen from "./pages/TableNumberScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaymentStart />} />
        <Route path="/table-number" element={<TableNumberScreen />} />
        <Route path="/please-wait" element={<PleaseWaitScreen />} />
        <Route path="/purchased-items" element={<PurchasedItemsScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
