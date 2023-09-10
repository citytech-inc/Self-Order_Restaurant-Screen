import React, {useState} from "react";
import "./PleaseWaitScreen.css";
import SettingBar from "../header/SettingBar";

interface PleaseWaitScreenProps {}

const PleaseWaitScreen: React.FC<PleaseWaitScreenProps> = () => {
  const BowingImage =
    "https://i.pinimg.com/474x/19/51/1a/19511aa50124a5159b52bf6630d4d927.jpg";
  
  const [focusButton, setFocusButton] = useState<string | null>(null);

  return (
    <div className="please-wait-container">
      <SettingBar focusButton="payment" />
      <div className="titles-container">
        <h1 className="title">しばらくお待ちください</h1>
        <h1 className="title">Please wait for a while</h1>
        <h1 className="title">请稍等一下</h1>
        <h1 className="title">조금 기다려주세요</h1>
      </div>
      <img
        src={BowingImage}
        alt="Bowing Illustration"
        className="bowing-illustration"
      />
    </div>
  );
};

export default PleaseWaitScreen;
