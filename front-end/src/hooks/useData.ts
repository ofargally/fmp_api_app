import { useQuery } from "@tanstack/react-query";
import APIClient from "../api/api-client";
import axios from "axios";
import { FinancialDataResponseArray, FilterParams } from "../Interfaces";

const apiClient = new APIClient<FinancialDataResponseArray>("/financial-data");

const useData = (filters: FilterParams) =>
  useQuery<FinancialDataResponseArray, Error>({
    queryKey: ["financialData", filters],
    queryFn: () =>
      apiClient.fetchFinancialData(
        filters.start_year,
        filters.end_year,
        filters.min_revenue,
        filters.max_revenue,
        filters.min_net_income,
        filters.max_net_income,
        filters.sort_by,
        filters.order
      ),
    staleTime: 60_000, // 1 min
    gcTime: 300_000, // 5 mins
    retry: (failureCount, error) => {
      if (axios.isAxiosError(error) && error.response?.status === 422) {
        return false; // No need to retry validation errors
      }
      return failureCount < 3; // Retry other errors up to 3 times
    },
  });

export default useData;
