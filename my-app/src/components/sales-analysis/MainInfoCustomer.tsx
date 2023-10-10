import React from 'react';

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
  SalesByMenu: SalesByMenuData[];
  SalesPerHour: SalesPerHourData;
};

const MainInfoCustomerComponent: React.FC<MainInfoCustomerComponentProps> = ({ selectedSalesType, SalesByMenu, SalesPerHour }) => (
  <div className="sales-analysis-container">
    <div className="sales-datas">
      <div className="sales-total">
        <p className="sales-type-text">{selectedSalesType}</p>
        <p className="sales-type-price">¥ 18,000</p>
      </div>
      <div className="sales-menu">
        <div className="sales-menu-headline">
          <div className="sales-menu-headline-text-1">商品名</div>
          <div className="sales-menu-headline-text-2">個数</div>
          <div className="sales-menu-headline-text-3">金額</div>
        </div>
        {SalesByMenu.map((data, index) => (
          <div key={index} className="menu-text">
            <div className="menu-name">{data.name}</div>
            <div className="menu-count">{data.count.toLocaleString()}</div>
            <div className="menu-price">
              {data.price.toLocaleString()}円
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="table-col">
          <div className="table-hour-col">
            {Object.keys(SalesPerHour).map(
              (key, index) =>
                index >= Object.keys(SalesPerHour).length / 2 && (
                  <div className="table-text">{key}</div>
                ),
            )}
            {Object.keys(SalesPerHour).length % 2 === 1 && (
              <div className="table-text">　</div>
            )}
          </div>
          <div className="table-sales-col">
            {Object.values(SalesPerHour).map(
              (value, index) =>
                index >= Object.keys(SalesPerHour).length / 2 && (
                  <div className="table-text">¥ {value.sales}</div>
                ),
            )}
            {Object.keys(SalesPerHour).length % 2 === 1 && (
              <div className="table-text">　</div>
            )}
          </div>
        </div>
  </div>
);

export default MainInfoCustomerComponent;