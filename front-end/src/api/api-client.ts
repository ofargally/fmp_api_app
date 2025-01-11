import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 10000,
});

class APIClient<T> {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  fetchFinancialData = async (
    start_year?: number,
    end_year?: number,
    min_revenue?: number,
    max_revenue?: number,
    min_net_income?: number,
    max_net_income?: number,
    sort_by?: string,
    order: string = "desc"
  ) => {
    const params = {
      start_year,
      end_year,
      min_revenue,
      max_revenue,
      min_net_income,
      max_net_income,
      sort_by,
      order,
    };

    const response = await axiosInstance.get<T>(this.endpoint, { params });
    return response.data;
  };
}

export default APIClient;
