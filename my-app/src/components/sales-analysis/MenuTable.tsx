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
    category: "メイン",
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
    category: "メイン",
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
  {name: "味噌ラーメン",
  category: "メイン",
  price: 800,
  percentage: 28.11,
  numSales: 1657,
  numReturned: 1,
  netSales: 1325600,
  totalSales: 1205568,
  costPrice: 301392,
  grossProfit: 904176,
  ABC: "B",
},
{name: "半ライス",
  category: "サイド",
  price: 120,
  percentage: 4.95,
  numSales: 1947,
  numReturned: 0,
  netSales: 233640,
  totalSales: 212223,
  costPrice: 53056,
  grossProfit: 159167,
  ABC: "C",
},
{name: "烏龍茶",
  category: "ドリンク",
  price: 100,
  percentage: 2.65,
  numSales: 1253,
  numReturned: 3,
  netSales: 125300,
  totalSales: 113750,
  costPrice: 28438,
  grossProfit: 85312,
  ABC: "C",
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
