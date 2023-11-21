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
        <p className="sales-type-price-customer">2886人<span className="additional-textred">(109.3%)</span></p>
      </div>
      <div className="sales-total-flex">
        <div className="sales-total-half">
          <p className="sales-type-text-gray">新規</p>
          <p className="sales-type-price-customermiddle">2054人</p>
          <p className="sales-type-price-customermiddlered">(113.5%)</p>
          <p className="sales-type-price-customersubtitle">構成比</p>
          <p className="sales-type-price-customer">71.2%<span className="additional-textred">(104.4%)</span></p>
        </div>
        <div className="sales-total-half">
          <p className="sales-type-text-gray">リピーター</p>
          <p className="sales-type-price-customermiddle">832人</p>
          <p className="sales-type-price-customermiddleblack">(98.3%)</p>
          <p className="sales-type-price-customersubtitle">構成比</p>
          <p className="sales-type-price-customer">28.8%<span className="additional-textblack">(97.2%)</span></p>
        </div>
      </div>
      <div className="sales-total">
        <p className="sales-type-text-gray">客単価</p>
        <p className="sales-type-price-customer">¥ 814.3<span className="additional-textblack">(98.1%)</span></p>
      </div>
      <div className="sales-total">
        <p className="sales-type-text-gray">平均滞在時間</p>
        <p className="sales-type-price-customer">48.2分<span className="additional-textblack">(97.9%)</span></p>
      </div>
      <div className="sales-total-flex2">
        <div className="sales-total-half">
          <p className="sales-type-text-gray">平均来店人数</p>
          <p className="sales-type-price-customermiddle">2.2人</p>
          <p className="sales-type-price-customerendblack">(96.6%)</p>
        </div>
        <div className="sales-total-half">
          <p className="sales-type-text-gray">1人あたり購買点数</p>
          <p className="sales-type-price-customermiddle">2.1</p>
          <p className="sales-type-price-customerendred">(102.3%)</p>
        </div>
      </div>
      <div className="sales-total">
        <p className="sales-type-text-gray">総売上</p>
        <p className="sales-type-price-customer">¥ 2,350,000<span className="additional-textred">(104.2%)</span></p>
      </div>
    </div>
  </div>
);

export default MainInfoCustomerComponent;
