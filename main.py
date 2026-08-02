from fastapi import FastAPI, Request, Query, BackgroundTasks
import os
from dotenv import load_dotenv 
from db_service import supabase

from whatsapp_service import send_whatsapp_message, download_whatsapp_media
from ai_service import analyze_medical_report
from ai_service import generate_health_summary
from db_service import save_health_data
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

VERIFY_TOKEN = os.getenv("WHATSAPP_VERIFY_TOKEN", "my_secret_token")

 
@app.get("/")
async def root():
    return {"status": "online", "message": "The Health AI Backend is running flawlessly!"}


@app.get("/webhook")
async def verify_webhook(
    hub_mode: str = Query(None, alias="hub.mode"),
    hub_challenge: int = Query(None, alias="hub.challenge"),
    hub_verify_token: str = Query(None, alias="hub.verify_token")
):
    if hub_mode == "subscribe" and hub_verify_token == VERIFY_TOKEN:
        print("Meta has verified our webhook")
        return int(hub_challenge)
    return {"error": "invalid token"}

def process_pdf(sender_phone: str, media_id: str):
    send_whatsapp_message(sender_phone, "PDF Received! Please wait while the AI analyzes your blood test...")
    
    pdf_path = f"temp_{sender_phone}.pdf"
    download_whatsapp_media(media_id, pdf_path)
    
    biomarker_json = analyze_medical_report(pdf_path)
    save_health_data(sender_phone, biomarker_json)
    
    if os.path.exists(pdf_path):
        os.remove(pdf_path)
        
    dashboard_link = f"https://your-future-website.com/dashboard?user={sender_phone}"
    
    success_msg = f"Analysis Complete!\n\nI have securely logged your health data.\nView your historical health graph here:\n{dashboard_link}"
    send_whatsapp_message(sender_phone, success_msg)


@app.post("/webhook")
async def whatsapp_webhook(request: Request, background_tasks: BackgroundTasks):
    payload = await request.json()
    print("\n--- NEW MESSAGE PAYLOAD ---")
    print(payload)
    print("---------------------------\n")
    
    try:
        entry = payload['entry'][0]['changes'][0]['value']
        if "messages" in entry:
            message = entry ['messages'][0]
            sender_phone = message['from']
            
            if 'document' in message:
                media_id = message['document']['id']
                background_tasks.add_task(process_pdf, sender_phone, media_id)
                
            elif 'text' in message:
                send_whatsapp_message(sender_phone, "Hello! I am your AI Health Assistant. \n\nPlease forward me a PDF of your latest blood test report, and I will analyze and graph it for you.")
    except KeyError as e:
        print(f"Missing key in payload: {e}")
    except Exception as e:
        print(f"Error processing payload: {e}")
        
    return {"status": "succcess"}
                
 
@app.get("/api/health_data")
async def get_health_data(user: str):
    """The frontend calls this route, so the browser never sees the Supabase keys."""
    if not supabase:
        return {"error": "Database not connected"}
        
     
    response = supabase.table("health_records").select("*").eq("phone_number", user).order('created_at', desc=False).execute()
    
    return {"data": response.data}

    
@app.post("/api/generate_summary")
async def api_generate_summary(request: Request):
    data = await request.json()
    user_phone = data.get("user")
    patient_name = data.get("patient_name")
    
     
    response = supabase.table("health_records").select("*").eq("phone_number", user_phone).eq("patient_name", patient_name).order('created_at', desc=True).limit(1).execute()
    
    if not response.data:
        return {"summary": "I couldn't find any recent health records for you."}
        
    latest_record = response.data[0]
    biomarkers = latest_record.get("biomarkers", {})
    
   
    summary_text = generate_health_summary(patient_name, biomarkers)
    
    return {"summary": summary_text}