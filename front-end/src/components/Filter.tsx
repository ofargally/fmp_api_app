import React, { useState } from "react";

const Filter = () => {
  const [filters, setFilters] = useState({
    start_year: "",
    end_year: "",
    min_revenue: "",
    max_revenue: "",
    min_net_income: "",
    max_net_income: "",
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Start Year (2020-2024)
          </label>
          <input
            type="number"
            name="start_year"
            min="2020"
            max="2024"
            value={filters.start_year}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            End Year (2020-2024)
          </label>
          <input
            type="number"
            name="end_year"
            min="2020"
            max="2024"
            value={filters.end_year}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Min Revenue
          </label>
          <input
            type="number"
            name="min_revenue"
            min="0"
            value={filters.min_revenue}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Max Revenue
          </label>
          <input
            type="number"
            name="max_revenue"
            min="0"
            value={filters.max_revenue}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Min Net Income
          </label>
          <input
            type="number"
            name="min_net_income"
            min="0"
            value={filters.min_net_income}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Max Net Income
          </label>
          <input
            type="number"
            name="max_net_income"
            min="0"
            value={filters.max_net_income}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Apply Filters
      </button>
    </div>
  );
};

export default Filter;
