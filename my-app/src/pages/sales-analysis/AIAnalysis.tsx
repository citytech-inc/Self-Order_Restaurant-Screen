import React, { useEffect, useState, FormEventHandler } from "react";
import { useNavigate, useLocation, useParams, Link } from "react-router-dom";
import "./SalesAnalysis.scss";
import DownloadIcon from "../../../src/components/images/download.png";
import SendIcon from "../../../src/components/images/send.png";
import SettingBar from "../../header/SettingBar";
import HeaderComponent from "../../components/sales-analysis/Header";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ReportExample from "../../../src/data/report_example";

const AIAnalysis: React.FC = () => {
  const { restaurantId } = useParams();
  const [messageInput, setMessageInput] = useState("");
  const [focused, setFocused] = useState("チャット");
  type messageData = {
    message: string;
    isUser: boolean;
  };
  const [chatList, setChatList] = useState<messageData[]>([]);
  const changeFocusedButton = (buttonName: string) => {
    setFocused(buttonName);
  };

  const pdfDownloadHandler = (elementId: string, fileName: string) => {
    const target = document.getElementById(elementId);
    if (target === null) return;

    html2canvas(target, { scale: 2.5 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/svg", 1.0);
      let pdf = new jsPDF("landscape", "pt", "a4");
      pdf.addImage(
        imgData,
        "SVG",
        pdf.internal.pageSize.width * 0.05,
        pdf.internal.pageSize.height * 0.05,
        pdf.internal.pageSize.width * 0.9,
        0
      );
      pdf.save(`${fileName}.pdf`);
    });
  };

  const messageInputHandleSubmit: FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault();
    setChatList([...chatList, { message: messageInput, isUser: true }]);
    setMessageInput("");
    document.getElementById("type-box__area")!.style.height = "auto";
  };

  return (
    <div>
      <div style={{ height: "100vh" }}>
        <SettingBar focusButton="sales" />
        <HeaderComponent focusButton="AI分析" />
        <div className="sales-analysis-header">
          <div
            className="sub-header-select-button select-button-left"
            onClick={() => changeFocusedButton("チャット")}
            style={{
              backgroundColor: focused === "チャット" ? "#C05454" : "#FFFFFF",
              color: focused === "チャット" ? "#FFFFFF" : "#C05454",
            }}
          >
            チャット
          </div>
          <div
            className="sub-header-select-button select-button-right"
            onClick={() => changeFocusedButton("レポート")}
            style={{
              backgroundColor: focused === "レポート" ? "#C05454" : "#FFFFFF",
              color: focused === "レポート" ? "#FFFFFF" : "#C05454",
            }}
          >
            レポート
          </div>
        </div>
        <div className="ai-analysis-wrapper">
          {focused === "チャット" && (
            <div className="ai-analysis-container ai-chat-container">
              <div className="messages-wrapper"></div>
              <div className="type-box">
                <form
                  style={{
                    position: "relative",
                    width: "100%",
                    display: "flex",
                    boxSizing: "border-box",
                  }}
                  onSubmit={messageInputHandleSubmit}
                >
                  <textarea
                    rows={1}
                    id="type-box__area"
                    className="type-box__area"
                    placeholder="質問を入力"
                    value={messageInput}
                    onChange={(e) => {
                      setMessageInput(e.target.value);
                      e.target.style.height = "auto";
                      e.target.style.height =
                        Math.min(e.target.scrollHeight, 210) + "px";
                    }}
                  />
                  <button
                    type="submit"
                    disabled={messageInput === ""}
                    className="type-box__send"
                  >
                    <span>
                      {" "}
                      <img
                        src={SendIcon}
                        alt="Send Question Icon"
                        className="type-box__send__icon"
                      />
                    </span>
                  </button>
                </form>
              </div>
            </div>
          )}
          {focused === "レポート" && (
            <div className="ai-analysis-container ai-report-container">
              <div id="download-object">
                <ReportExample />
              </div>
              <img
                src={DownloadIcon}
                alt="Download PDF Icon"
                className="download-pdf-icon"
                onClick={() => pdfDownloadHandler("download-object", "report")}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAnalysis;
