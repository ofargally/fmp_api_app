import requests
from typing import List, Dict, Any


async def fetch_financial_data(api_key: str, company: str = "AAPL") -> List[Dict[str, Any]]:
    api_url = f"https://financialmodelingprep.com/api/v3/income-statement/{
        company}?period=annual&apikey={api_key}"
    try:
        response = requests.get(api_url)
        response.raise_for_status()
        data = response.json()
        return data
    except requests.RequestException as e:
        print(f"Error fetching data: {e}")
        return []
