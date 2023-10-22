import React from "react";
import "./MenuTable.css";

type Product = {
  name: string;
  category: string;
  price: number;
  percentage: number;
  numSales: number;
  numReturned: number;
  netSales: number;
  totalSales: number;
  costPrice: number;
  grossProfit: number;
  ABC: string;
};

const products: Product[] = [
  {
    name: "醤油ラーメン",
    category: "ラーメン",
    price: 800,
    percentage: 34.85,
    numSales: 2053,
    numReturned: 4,
    netSales: 1642400,
    totalSales: 1494584,
    costPrice: 373646,
    grossProfit: 1120938,
    ABC: "A",
  },
  {
    name: "塩ラーメン",
    category: "ラーメン",
    price: 800,
    percentage: 29.44,
    numSales: 1734,
    numReturned: 0,
    netSales: 1387200,
    totalSales: 1262352,
    costPrice: 315588,
    grossProfit: 946764,
    ABC: "A",
  },
  // ... add other rows here
];

const MenuTable: React.FC = () => {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>商品名</th>
          <th>カテゴリー</th>
          <th>単価</th>
          <th>構成比</th>
          <th>販売数</th>
          <th>返品数</th>
          <th>純売上</th>
          <th>総売上</th>
          <th>原価</th>
          <th>粗利益</th>
          <th>ABC</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={index}>
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>{product.price}円</td>
            <td>{product.percentage}%</td>
            <td>{product.numSales}</td>
            <td>{product.numReturned}</td>
            <td>{product.netSales}円</td>
            <td>{product.totalSales}円</td>
            <td>{product.costPrice}円</td>
            <td>{product.grossProfit}円</td>
            <td>{product.ABC}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MenuTable;
