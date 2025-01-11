export interface FinancialDataResponse {
  date: string;
  revenue: number;
  net_income: number;
  gross_profit: number;
  eps: number;
  operating_income: number;
}

export interface FinancialDataResponseArray {
  data: FinancialDataResponse[];
}

export interface FilterParams {
  start_year?: number;
  end_year?: number;
  min_revenue?: number;
  max_revenue?: number;
  min_net_income?: number;
  max_net_income?: number;
  sort_by?: string;
  order?: string;
}
