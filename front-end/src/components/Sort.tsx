import React, { useState, useRef, useEffect } from "react";

type SortOption = "date" | "revenue" | "netIncome";
//create a simple hashmap

interface SortProps {
  onSort: (option: SortOption, order: "asc" | "desc") => void;
}

const Sort: React.FC<SortProps> = ({ onSort }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [isAscending, setIsAscending] = useState<boolean>(false);
  const sortOptions: SortOption[] = ["date", "revenue", "netIncome"];
  const containerRef = useRef<HTMLDivElement>(null);
  const newMap = new Map<string, string>();
  newMap.set("date", "Date");
  newMap.set("revenue", "Revenue");
  newMap.set("netIncome", "Net Income");
  const handleSort = (option: SortOption): void => {
    setSortBy(option);
    setIsOpen(false);
    onSort(option, isAscending ? "asc" : "desc");
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
      >
        Sort By: {newMap.get(sortBy) || "None"}
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-10 border transition ease-out duration-200">
          <div className="p-2 space-y-2">
            {/* Order Toggle Button */}
            <button
              onClick={() => setIsAscending(!isAscending)}
              className="w-full text-left px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded focus:outline-none"
            >
              Order: {isAscending ? "Ascending ↑" : "Descending ↓"}
            </button>

            {/* Sort Options */}
            {sortOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleSort(option)}
                className={`w-full text-left px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded focus:outline-none ${
                  sortBy === option ? "bg-gray-300" : ""
                }`}
              >
                {newMap.get(option)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sort;
