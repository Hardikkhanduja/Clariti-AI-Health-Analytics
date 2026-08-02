import os
import requests
from dotenv import load_dotenv

load_dotenv()

 
WHATSAPP_TOKEN = os.getenv("WHATSAPP_TOKEN")
PHONE_NUMBER_ID = os.getenv("PHONE_NUMBER_ID")

def send_whatsapp_message(to_number: str, message_body: str):
    """Sends a text message back to the WhatsApp user."""
    if not WHATSAPP_TOKEN or not PHONE_NUMBER_ID:
        print("Warning: WhatsApp credentials missing in .env! (Message not sent)")
        return
 
    url = f"https://graph.facebook.com/v20.0/{PHONE_NUMBER_ID}/messages"
    
    headers = {
        "Authorization": f"Bearer {WHATSAPP_TOKEN}",
        "Content-Type": "application/json"
    }
    
    
    data = {
        "messaging_product": "whatsapp",
        "to": to_number,
        "type": "text",
        "text": {"body": message_body}
    }
    
    print(f"Sending reply to {to_number}...")
    response = requests.post(url, headers=headers, json=data)
    
    if response.status_code == 200:
        print("Message sent successfully!")
    else:
        print(f"Failed to send message: {response.text}")


def download_whatsapp_media(media_id: str, save_path: str):
    """Downloads a PDF or image sent by a user on WhatsApp."""
    if not WHATSAPP_TOKEN:
        print("Warning: Missing WhatsApp token!")
        return None
     
    url = f"https://graph.facebook.com/v20.0/{media_id}"
    headers = {"Authorization": f"Bearer {WHATSAPP_TOKEN}"}
    
     
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        print("Failed to get media URL from Meta:", response.text)
        return None  
        
    media_url = response.json().get('url')
    
     
    print("Downloading file bytes from Meta servers...")
    media_response = requests.get(media_url, headers=headers)
    
   
    with open(save_path, "wb") as file:
        file.write(media_response.content)
        
    print(f"File successfully saved to {save_path}")
    return save_path
