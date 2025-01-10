from pydantic import BaseModel
from typing import Optional, List


class FinancialData(BaseModel):
    date: str
    revenue: int
    net_income: int
    gross_profit: int
    eps: float
    operating_income: int


class FinancialDataResponse(BaseModel):
    data: List[FinancialData]
