import React from "react";
import "./MainInfo.css";

type SalesByMenuData = {
  name: string;
  count: number;
  price: number;
};

type SalesPerHourData = {
  [key: string]: { sales: number };
};

type MainInfoCustomerComponentProps = {
  selectedSalesType: string;
};

const MainInfoCustomerComponent: React.FC<MainInfoCustomerComponentProps> = ({
  selectedSalesType,
}) => (
  <div className="mainInfo__container">
    <div className="sales-datas">
      <div className="sales-total">
        <p className="sales-type-text">客数</p>
        <p className="sales-type-price-customer">2886人</p>
      </div>
      <div className="sales-total-flex">
        <div className="sales-total-half">
          <p className="sales-type-text-gray">新規</p>
          <p className="sales-type-price-customer">
            <div>2054人</div>
          </p>
        </div>
        <div className="sales-total-half">
          <p className="sales-type-text-gray">リピーター</p>
          <p className="sales-type-price-customer">832人</p>
        </div>
      </div>
      <div className="sales-total">
        <p className="sales-type-text-gray">客単価</p>
        <p className="sales-type-price-customer">¥ 814.3</p>
      </div>
      <div className="sales-total">
        <p className="sales-type-text-gray">平均滞在時間</p>
        <p className="sales-type-price-customer">48.2分</p>
      </div>
      <div className="sales-total-flex">
        <div className="sales-total-half">
          <p className="sales-type-text-gray">平均来店人数</p>
          <p className="sales-type-price-customer">2.2人</p>
        </div>
        <div className="sales-total-half">
          <p className="sales-type-text-gray">1人あたり購買点数</p>
          <p className="sales-type-price-customer">2.1</p>
        </div>
      </div>
      <div className="sales-total">
        <p className="sales-type-text-gray">総売上</p>
        <p className="sales-type-price-customer">¥ 2,350,000</p>
      </div>
    </div>
  </div>
);

export default MainInfoCustomerComponent;
