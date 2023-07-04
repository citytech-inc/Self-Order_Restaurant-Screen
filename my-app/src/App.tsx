import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PaymentStart from "./pages/PaymentStartScreen";
import PleaseWaitScreen from "./pages/PleaseWaitScreen";
import TableNumberScreen from "./pages/TableNumberScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaymentStart />} />
        <Route path="/table-number" element={<TableNumberScreen />} />
        <Route path="/please-wait" element={<PleaseWaitScreen />} />
      </Routes>
    </Router>
  );
}

export default App;

