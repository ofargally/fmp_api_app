import React from "react";
import { FinancialDataResponse } from "../Interfaces";

interface TableProps {
  data: FinancialDataResponse[];
  error?: Error | null;
  isLoading?: boolean;
}

const Table: React.FC<TableProps> = ({ data, error, isLoading }) => {
  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error.message}</div>;
  }

  if (!data || data.length === 0) {
    return <div className="text-center p-4">No data available</div>;
  }

  return (
    <table className="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">Date</th>
          <th className="border p-2">Revenue</th>
          <th className="border p-2">Net Income</th>
          <th className="border p-2">Gross Profit</th>
          <th className="border p-2">EPS</th>
          <th className="border p-2">Operating Income</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="border p-2">{item.date}</td>
            <td className="border p-2">${item.revenue.toLocaleString()}</td>
            <td className="border p-2">${item.net_income.toLocaleString()}</td>
            <td className="border p-2">
              ${item.gross_profit.toLocaleString()}
            </td>
            <td className="border p-2">${item.eps.toFixed(2)}</td>
            <td className="border p-2">
              ${item.operating_income.toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
