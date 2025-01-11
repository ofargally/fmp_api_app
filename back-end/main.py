from typing import Optional
from fastapi import FastAPI, HTTPException, Query
from models import FinancialData, FinancialDataResponse
from fastapi.middleware.cors import CORSMiddleware
from utils import fetch_financial_data
from contextlib import asynccontextmanager
from dotenv import load_dotenv
import os
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '.env'))
api_key = os.getenv('API_KEY')
DEPLOYMENT_URL_1 = os.getenv('DEPLOYMENT_URL')
DEPLOYMENT_URL_2 = os.getenv('DEPLOYMENT_URL_2')
DEPLOYMENT_URL_3 = os.getenv('DEPLOYMENT_URL_3')
localhost = os.getenv('LOCAL_HOST')
financial_data = []

# Fetches from 3rd Party API --> Financial Modelling Prep


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load data from the 3rd party api
    global financial_data
    print("Application Start")
    try:
        print("Fetching Data from 3rd Party API... ")
        financial_data = await fetch_financial_data(api_key=api_key)
        yield
    except Exception as e:
        print("Failed to fetch data from 3rd Party API")
        raise HTTPException(
            status_code=500, detail=f"Failed to fetch data from 3rd Party API: {str(e)}")


app = FastAPI(lifespan=lifespan, title="Data API")

origins = ['valueglanceproject.vercel.app',
           DEPLOYMENT_URL_2, DEPLOYMENT_URL_3, localhost]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def helloWorld():
    return {"detail": "The app has been initialized"}


@app.get("/all")
def get_all_data():
    return {"data": financial_data}


@app.get("/financial-data", response_model=FinancialDataResponse)
def get_financial_data(
    start_year: Optional[int] = Query(None, ge=2020, le=2024),
    end_year: Optional[int] = Query(None, ge=2020, le=2024),
    min_revenue: Optional[int] = Query(None, ge=0),
    max_revenue: Optional[int] = Query(None, ge=0),
    min_net_income: Optional[int] = Query(None, ge=0),
    max_net_income: Optional[int] = Query(None, ge=0),
    sort_by: Optional[str] = Query(
        None, regex="^(date|revenue|netIncome)$"),
    order: Optional[str] = Query("asc", regex="^(asc|desc)$")
):
    # Filter
    filtered = [
        item for item in financial_data
        if (not start_year or int(item.get('calendarYear', 0)) >= start_year)
        and (not end_year or int(item.get('calendarYear', 0)) <= end_year)
        and (min_revenue is None or item.get('revenue', 0) >= min_revenue)
        and (max_revenue is None or item.get('revenue', 0) <= max_revenue)
        and (min_net_income is None or item.get('netIncome', 0) >= min_net_income)
        and (max_net_income is None or item.get('netIncome', 0) <= max_net_income)
    ]

    # Sort
    if sort_by:
        key = sort_by if sort_by != "netIncome" else "netIncome"
        reverse = (order == "desc")
        try:
            filtered.sort(key=lambda x: x.get(key, 0) if key !=
                          "date" else x.get(key, ""), reverse=reverse)
        except KeyError:
            raise HTTPException(status_code=400, detail="Invalid sort field.")

    # Prepare response
    response_data = []
    for item in filtered:
        try:
            response_data.append(FinancialData(
                date=item.get('date', ''),
                revenue=item.get('revenue', 0),
                net_income=item.get('netIncome', 0),
                gross_profit=item.get('grossProfit', 0),
                eps=item.get('eps', 0.0),
                operating_income=item.get('operatingIncome', 0)
            ))
        except Exception as e:
            print(f"Error processing item: {e}")
            continue
    print(f"Returning {len(response_data)} items")
    return FinancialDataResponse(data=response_data)
