import React, { useRef } from "react";
import { FilterParams } from "../Interfaces";

interface FilterProps {
  filters: FilterParams;
  onFilterChange: (updatedFilters: FilterParams) => void;
}

const Filter: React.FC<FilterProps> = ({ filters, onFilterChange }) => {
  const startYearRef = useRef<HTMLInputElement>(null);
  const endYearRef = useRef<HTMLInputElement>(null);
  const minRevenueRef = useRef<HTMLInputElement>(null);
  const maxRevenueRef = useRef<HTMLInputElement>(null);
  const minNetIncomeRef = useRef<HTMLInputElement>(null);
  const maxNetIncomeRef = useRef<HTMLInputElement>(null);

  const handleApplyFilters = () => {
    const updatedFilters: FilterParams = {
      start_year: startYearRef.current?.value
        ? parseInt(startYearRef.current.value)
        : undefined,
      end_year: endYearRef.current?.value
        ? parseInt(endYearRef.current.value)
        : undefined,
      min_revenue: minRevenueRef.current?.value
        ? parseInt(minRevenueRef.current.value)
        : undefined,
      max_revenue: maxRevenueRef.current?.value
        ? parseInt(maxRevenueRef.current.value)
        : undefined,
      min_net_income: minNetIncomeRef.current?.value
        ? parseInt(minNetIncomeRef.current.value)
        : undefined,
      max_net_income: maxNetIncomeRef.current?.value
        ? parseInt(maxNetIncomeRef.current.value)
        : undefined,
      sort_by: filters.sort_by,
      order: filters.order,
    };
    onFilterChange(updatedFilters);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleApplyFilters();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Start Year (2020-2024)
          </label>
          <input
            type="number"
            ref={startYearRef}
            name="start_year"
            min="2020"
            max="2024"
            defaultValue={filters.start_year || ""}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            End Year (2020-2024)
          </label>
          <input
            type="number"
            ref={endYearRef}
            name="end_year"
            min="2020"
            max="2024"
            defaultValue={filters.end_year || ""}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Min Revenue
          </label>
          <input
            type="number"
            ref={minRevenueRef}
            name="min_revenue"
            min="0"
            defaultValue={filters.min_revenue || ""}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Max Revenue
          </label>
          <input
            type="number"
            ref={maxRevenueRef}
            name="max_revenue"
            min="0"
            defaultValue={filters.max_revenue || ""}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Min Net Income
          </label>
          <input
            type="number"
            ref={minNetIncomeRef}
            name="min_net_income"
            min="0"
            defaultValue={filters.min_net_income || ""}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Max Net Income
          </label>
          <input
            type="number"
            ref={maxNetIncomeRef}
            name="max_net_income"
            min="0"
            defaultValue={filters.max_net_income || ""}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      <button
        onClick={handleApplyFilters}
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md"
      >
        Apply Filters
      </button>
    </form>
  );
};

export default Filter;
