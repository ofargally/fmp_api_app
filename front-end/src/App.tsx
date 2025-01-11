import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Sort from "./components/Sort";
import Table from "./components/Table";
import useData from "./hooks/useData";
import { FilterParams } from "./Interfaces";

function App() {
  const [filters, setFilters] = useState<FilterParams>({
    start_year: undefined,
    end_year: undefined,
    min_revenue: undefined,
    max_revenue: undefined,
    min_net_income: undefined,
    max_net_income: undefined,
    sort_by: undefined,
    order: undefined,
  });

  const { data, error, isLoading } = useData(filters);

  useEffect(() => {
    if (data) console.log(data);
  }, [data]);

  // Handle updated filters from child
  const handleFilterChange = (updatedFilters: FilterParams) => {
    setFilters(updatedFilters);
  };

  const handleSort = (
    sortBy: "date" | "revenue" | "netIncome",
    order: "asc" | "desc"
  ) => {
    setFilters((prev) => ({
      ...prev,
      sort_by: sortBy,
      order: order,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header section with Sort component */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Financial Data Dashboard for Apple Inc. (AAPL)
            </h1>
            <h2>
              Retrieved from the{" "}
              <a
                href="https://site.financialmodelingprep.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                Financial Modelling Prep
              </a>{" "}
              API
            </h2>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Table section - grows to fill space */}
          <div className="flex-grow overflow-x-auto bg-white rounded-lg shadow">
            <Table
              data={data?.data || []}
              isLoading={isLoading}
              error={error}
            />
          </div>

          {/* Filter section - fixed width on md and above, full width on small screens */}
          <div className="flex flex-col items-center w-full md:w-80 space-y-4">
            <Filter filters={filters} onFilterChange={handleFilterChange} />
            <Sort onSort={handleSort} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
