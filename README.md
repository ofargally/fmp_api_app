# fmp_api_app

ValueGlance Application Material

**_DEPLOYMENT_**
FRONT-END: https://valueglancefrontend.onrender.com/
BACK-END: https://valueglanceapp.onrender.com/

DISCLAIMER: The free plan on Render does not support fully continuous deployment. The application may be down if the server is not running and requests may take up to 50 seconds to load.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup](#setup)
  - [Front-End](#front-end)
  - [Back-End](#back-end)
- [Running the Application](#running-the-application)
  - [Start the Back-End Server](#start-the-back-end-server)
  - [Start the Front-End Development Server](#start-the-front-end-development-server)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)

## Prerequisites

- **Node.js** (v14 or later)
- **npm** (v10 or later)
- **Python** (v3.8 or later)
- **pip**

## Setup

### Front-End Installation

**Navigate to the Front-End Directory:**

```bash
cd front-end
```

2. **Install Dependencies:**
   Using npm:

```bash
npm install
```

### Back-End Installation

Back-End

1. Navigate to the Back-End Directory:

```bash
cd back-end
```

2. Create a Virtual Environment (Optional but Recommended):

```bash
python3 -m venv venv
source venv/bin/activate
```

3. Install Dependencies:

```bash
pip install -r requirements.txt
```

Running the Application
Start the Back-End Server

1. Navigate to the back-end directory:

```bash
cd back-end
```

2. Set Up Environment Variables:

Ensure the .env file is properly configured with the required variables. You need to provide your api key from the Financial Modeling Prep API as well as the front-end local host url for the CORS policy.

```bash
LOCAL_HOST = http://localhost:5173
API_KEY = <your_api_key>
```

3. Run the Server:

```bash
uvicorn main:app --reload
```

The server will start at http://localhost:8000

## Running the Front-end Application

\*\*Start the Front-End Development Server

1. Navigate to the Front-End Directory:

```bash
cd front-end
```

2. Run the Development Server:

```bash
npm run dev
```

The application will be available at http://localhost:5173

Environment Variables
Create a .env file in the front-end directory. Here are examples of the environment variables you need to set:

```bash
VITE_SERVER_URL=https://valueglanceapp.onrender.com
VITE_LOCAL_HOST=http://127.0.0.1:8000
```

Project Structure

fmp_api_app/
├── front-end/
│ ├── api/
│ ├── assets/
│ ├── components/
│ ├── hooks/
│ ├── src/
│ ├── index.html
│ ├── package.json
│ └── ...other front-end files
├── back-end/
│ ├── models.py
│ ├── utils.py
│ ├── main.py
│ ├── requirements.txt
│ └── ...other back-end files
├── .gitignore
└── README.md

## Front-End Build

\*\*Build for Production:

```bash
npm run build
```

The production build will be available in the dist/ directory.

Liscense: NONE
