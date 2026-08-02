import os
from google import genai
from dotenv import load_dotenv
import json
 
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY is missing! Please check your .env file.")

 
client = genai.Client(api_key=api_key)

def analyze_medical_report(pdf_path: str) -> str:
    print(f"Uploading {pdf_path} to Gemini...")
     
    uploaded_file = client.files.upload(file=pdf_path)
    
    prompt = """
    Extract the patient name and all the medical biomarkers from this PDF report.
    Return ONLY a valid JSON dictionary with exactly three keys: "patient_name", "health_score", and "biomarkers".
    
    - "patient_name": the full name of the patient (string, or "Unknown Patient").
    - "health_score": calculate an overall health score from 0 to 100 based on the percentage of biomarkers that fall within the normal range. (integer)
    - "biomarkers": a dictionary of biomarkers. 
    
    CRITICAL RULE FOR BIOMARKERS: You MUST standardize the names of the biomarkers to universal medical terms. 
    For example, if the PDF says "TOTAL CHOLESTEROL" or "T. CHOL", you must rename it to exactly "Cholesterol". 
    If it says "GLUCOSE FASTING (F)", rename it to exactly "Fasting Glucose".
    
    For each biomarker, the value must be a nested dictionary containing:
        - "value": the numerical result (float)
        - "unit": the unit of measurement (string, or null)
        - "min_normal": the minimum normal reference value (float, or null)
        - "max_normal": the maximum normal reference value (float, or null)
        - "category": the medical category (string, e.g., "Lipid Profile", "Complete Blood Count")

    Do not include markdown blocks like ```json. Just return raw JSON.
    Example:
    {
      "patient_name": "Hardik Khanduja",
      "health_score": 85,
      "biomarkers": {
        "Cholesterol": {
          "value": 130.0,
          "unit": "mg/dL",
          "min_normal": null,
          "max_normal": 200.0,
          "category": "Lipid Profile"
        }
      }
    }
    """



    
    print("Analyzing report...")
    
     
    response = client.models.generate_content(
        model='gemini-3.5-flash',
        contents=[uploaded_file, prompt]
    )
    
    return response.text
 

def generate_health_summary(patient_name, biomarkers_dict):
    """Takes a patient's data and writes a warm, empathetic summary."""
    prompt = f"""
    You are a warm, highly empathetic AI medical assistant speaking to {patient_name}.
    Here is their latest blood test data:
    {json.dumps(biomarkers_dict)}
    
    Write an extremely concise, punchy health summary (MAXIMUM 4 short sentences).
    - Sentence 1: Warm greeting and one positive highlight.
    - Sentence 2: One clear area of improvement (if any abnormal markers exist).
    - Sentence 3: One highly practical, one-sentence lifestyle or diet tip.
    
    Keep it under 100 words total. Do not use bold markdown (**).
    """

    
    try:
        response = client.models.generate_content(
            model='gemini-3.5-flash',
            contents=prompt,
        )
        return response.text
    except Exception as e:
        print("Summary Generation Error:", e)
        return "I am so sorry, but I am having trouble reading your data right now. Please try again later!"
