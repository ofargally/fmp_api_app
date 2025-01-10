import { useMutation } from "@tanstack/react-query";
import APIClient from "../api/api-client";
import { FinancialDataResponse, FilterParams } from "../Interfaces";

const apiClient = new APIClient<FinancialDataResponse[]>("/financial-data");

const useData = () =>
  useMutation<FinancialDataResponse[], Error, FilterParams>({
    mutationFn: (filters: FilterParams) =>
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
  });

export default useData;
