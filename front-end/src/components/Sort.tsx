import React, { useState } from "react";
type SortOption = "date" | "revenue" | "netIncome";
interface SortProps {
  onSort: (option: SortOption, order: "asc" | "desc") => void;
}

const Sort: React.FC<SortProps> = ({ onSort }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [isAscending, setIsAscending] = useState<boolean>(false);
  const sortOptions: SortOption[] = ["date", "revenue", "netIncome"];
  const handleSort = (option: "date" | "revenue" | "netIncome"): void => {
    setSortBy(option);
    setIsOpen(false);
    onSort(option, isAscending ? "asc" : "desc");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
      >
        Sort By: {sortBy || "None"}
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
          <div className="p-2">
            <div className="mb-2 border-b pb-2">
              <button
                onClick={() => setIsAscending(!isAscending)}
                className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
              >
                Order: {isAscending ? "Ascending ↑" : "Descending ↓"}
              </button>
            </div>
            {sortOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleSort(option)}
                className={`w-full text-left px-2 py-1 hover:bg-gray-100 rounded ${
                  sortBy === option ? "bg-gray-100" : ""
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sort;
