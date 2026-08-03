<div align="center">
  <img src="https://clariti-ai-health-analytics.vercel.app/favicon.png" alt="Clariti Logo" width="80" height="80">
  
  # Clariti Health
  **Understand your blood tests. In seconds.**
  
  [![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)](https://clariti-ai-health-analytics.vercel.app/)
  [![Render](https://img.shields.io/badge/Render-Backend-46E3B7?style=for-the-badge&logo=render)](https://clariti-backend.onrender.com)
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)]()
  [![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)]()
  [![WhatsApp API](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)]()
  [![Gemini AI](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)]()
</div>

---

## Overview

**Clariti Health** is an AI-powered healthcare assistant that transforms how patients interact with their medical data. Instead of trying to read raw PDF lab reports, users forward their blood test PDFs to a secure WhatsApp bot. 

Our Clinical AI extracts, standardizes, and analyzes the biomarkers, generating a personalized and interactive health dashboard.

<br/>

## System Architecture

```mermaid
graph TD
    UserWA[User WhatsApp] -->|Sends PDF Report| MetaAPI(Meta Graph API)
    MetaAPI -->|Webhook Trigger| FastAPI{FastAPI Backend}
    FastAPI <-->|Extracts Biomarkers| Gemini[Google Gemini 3.5 AI]
    FastAPI <-->|Stores & Retrieves Data| Supabase[(Supabase PostgreSQL)]
    FastAPI -->|Sends Dashboard Link| MetaAPI
    UserWeb[User Browser] -->|Clicks Link| ReactFrontend[React Frontend]
    ReactFrontend <-->|REST API JSON| FastAPI
```

<br/>

## Key Features

- **WhatsApp Native:** Zero friction. No apps to download. Process begins by forwarding a PDF in WhatsApp.
- **Clinical AI Extraction:** Uses Google Gemini 3.5 Flash to extract structured data from unstructured medical PDFs with high accuracy.
- **Interactive Dashboard:** A highly responsive UI built in React that tracks biomarker trends over time.
- **Historical Trend Tracking:** Automatically matches new test results with past data to generate visual trend graphs.
- **Executive AI Summary:** Generates a highly actionable health summary based on the latest biomarker data.

<br/>

## Tech Stack

**Frontend:**
- React (Vite)
- Recharts (Data Visualization)
- Vanilla CSS 
- Hosted on **Vercel**

**Backend:**
- Python 3 (FastAPI)
- Google GenAI SDK (Gemini 3.5 Flash)
- Meta Graph API (WhatsApp Business API)
- Hosted on **Render**

**Database:**
- PostgreSQL (Supabase)

<br/>

## Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/Hardikkhanduja/Clariti-AI-Health-Analytics
cd Clariti-AI-Health-Analytics
```

### 2. Backend Setup
```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate

pip install -r requirements.txt

# Create .env file with your API keys
# (WHATSAPP_TOKEN, SUPABASE_URL, GEMINI_API_KEY, etc.)

uvicorn main:app --reload --port 8000
```

### 3. Frontend Setup
```bash
cd frontend/health-dashboard

npm install
npm run dev
```

<br/>

<div align="center">
  <i>Built by Hardik Khanduja</i>
</div>
