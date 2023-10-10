import React from "react";

type SubInfoComponentData = {
  純売上: number;
  "純売上(税別)": number;
  消費税: number;
  総売上: number;
  値引き: number;
  原価: number;
  粗利益: number;
  販売費: number;
  営業利益: number;
  客数: number;
  価格変動: number;
};

type SubInfoComponentProps = {
  SubInfoComponentData: SubInfoComponentData;
};

const SubInfoComponent: React.FC<SubInfoComponentProps> = ({ SubInfoComponentData }) => (
  <div className="sales-detail-data">
    <div className="sales-detail-col">
      <div className="row-1">
        <div className="row-name">純売上</div>
        <div className="row-item">
          {SubInfoComponentData["純売上"].toLocaleString()}円
        </div>
      </div>
      <div className="row-2">
        <div className="row-name">純売上(税別)</div>
        <div className="row-item">
          {SubInfoComponentData["純売上(税別)"].toLocaleString()}円
        </div>
      </div>
      <div className="row-1">
        <div className="row-name">消費税</div>
        <div className="row-item">
          {SubInfoComponentData["消費税"].toLocaleString()}円
        </div>
      </div>
      <div className="row-2">
        <div className="row-name">総売上</div>
        <div className="row-item">
          {SubInfoComponentData["総売上"].toLocaleString()}円
        </div>
      </div>
      <div className="row-1">
        <div className="row-name">値引き</div>
        <div className="row-item">
          {SubInfoComponentData["値引き"].toLocaleString()}円
        </div>
      </div>
      <div className="row-2">
        <div className="row-name">原価</div>
        <div className="row-item">
          {SubInfoComponentData["原価"].toLocaleString()}円
        </div>
      </div>
      <div className="row-1">
        <div className="row-name">粗利益</div>
        <div className="row-item">
          {SubInfoComponentData["粗利益"].toLocaleString()}円
        </div>
      </div>
      <div className="row-2">
        <div className="row-name">販売費</div>
        <div className="row-item">
          {SubInfoComponentData["販売費"].toLocaleString()}円
        </div>
      </div>
      <div className="row-1">
        <div className="row-name">営業利益</div>
        <div className="row-item">
          {SubInfoComponentData["営業利益"].toLocaleString()}円
        </div>
      </div>
    </div>
    <div className="sales-detail-col">
      <div className="row-3">
        <div className="row-name">客数</div>
        <div className="row-item">
          {SubInfoComponentData["客数"].toLocaleString()}人
        </div>
      </div>
      <div className="row-3">
        <div className="row-name">価格変動</div>
        <div className="row-item">
          {SubInfoComponentData["価格変動"].toLocaleString()}％
        </div>
      </div>
      <div className="row-3">
        <div className="row-name"></div>
        <div className="row-item"></div>
      </div>
      <div className="row-3">
        <div className="row-name"></div>
        <div className="row-item"></div>
      </div>
      <div className="row-3">
        <div className="row-name"></div>
        <div className="row-item"></div>
      </div>
      <div className="row-3">
        <div className="row-name"></div>
        <div className="row-item"></div>
      </div>
      <div className="row-3">
        <div className="row-name"></div>
        <div className="row-item"></div>
      </div>
      <div className="row-3">
        <div className="row-name"></div>
        <div className="row-item"></div>
      </div>
      <div className="row-3">
        <div className="row-name"></div>
        <div className="row-item"></div>
      </div>
    </div>
  </div>
);

export default SubInfoComponent;
