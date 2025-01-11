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

  // Call mutate when filter criteria changes
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
        <div className="mb-6 flex justify-between items-center">
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
          <Sort onSort={handleSort} />
        </div>
        {/* Table section - full width on all screens */}
        <div className="overflow-x-auto bg-white rounded-lg shadow"></div>
        <Table data={data?.data || []} isLoading={isLoading} error={error} />
      </div>
      {/* Filter section */}
      <div className="mb-6">
        <Filter filters={filters} onFilterChange={handleFilterChange} />
      </div>
    </div>
  );
}

export default App;
