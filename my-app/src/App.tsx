import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PaymentStart from "./pages/PaymentStartScreen";
import PleaseWaitScreen from "./pages/PleaseWaitScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaymentStart />} />
        <Route path="/please-wait" element={<PleaseWaitScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
