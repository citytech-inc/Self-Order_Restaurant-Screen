import React, { useState } from "react";
import "./iOSStyleSwitch.css";

interface Props {
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

const IOSStyleSwitch: React.FC<Props> = ({
  defaultChecked = false,
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
    if (onChange) onChange(!isChecked);
  };

  return (
    <div
      className={`switch ${isChecked ? "on" : "off"}`}
      onClick={toggleSwitch}
    >
      <div className="thumb" />
    </div>
  );
};

export default IOSStyleSwitch;
