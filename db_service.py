import os
import json  
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if SUPABASE_URL and SUPABASE_KEY:
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
else:
    supabase = None
    print("Warning: Supabase credentials missing in .env! (Database saving is paused)")


def save_health_data(phone_number, ai_extracted_data):
    if ai_extracted_data:
        try:
            parsed_data = json.loads(ai_extracted_data)
            
            # Pull all 3 data points
            patient_name = parsed_data.get("patient_name", "Unknown Patient")
            health_score = parsed_data.get("health_score", 0)
            biomarkers = parsed_data.get("biomarkers", {})
            
            # Insert into Supabase
            supabase.table("health_records").insert({
                "phone_number": phone_number,
                "patient_name": patient_name,
                "health_score": health_score,
                "biomarkers": biomarkers
            }).execute()
            
            print(f"Saved records for {patient_name} with Score: {health_score}")
            
        except json.JSONDecodeError:
            print("Error: The AI did not return valid JSON.")

