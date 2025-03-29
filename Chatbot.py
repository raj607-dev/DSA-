from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import pipeline
import openai
import logging

# Initialize FastAPI
app = FastAPI()

# Load sentiment analysis pipeline
sentiment_analyzer = pipeline("sentiment-analysis")

# OpenAI API Key (Replace with your own key)
openai.api_key = "your_openai_api_key"

# Logging setup
logging.basicConfig(filename="chatbot.log", level=logging.INFO)

# Define request model
class UserInput(BaseModel):
    user_id: str
    message: str

# Crisis keywords
CRISIS_KEYWORDS = {"suicide", "harm", "depressed", "self-harm", "end life"}

@app.post("/chat")
def chat(user_input: UserInput):
    message = user_input.message.lower()
    user_id = user_input.user_id

    # Sentiment Analysis
    sentiment = sentiment_analyzer(message)[0]
    logging.info(f"User {user_id} Sentiment: {sentiment}")

    # Crisis Detection
    if any(word in message for word in CRISIS_KEYWORDS) or sentiment["label"] == "NEGATIVE":
        return {"response": "I'm here for you. Please reach out to a trusted person or a professional. If you're in crisis, consider calling a helpline."}

    # Generate empathetic response using GPT
    prompt = f"You are an empathetic mental health chatbot. Respond to: '{message}' with kindness and support."
    response = openai.ChatCompletion.create(
        model="gpt-4-turbo",
        messages=[{"role": "system", "content": prompt}]
    )

    chatbot_reply = response["choices"][0]["message"]["content"]
    logging.info(f"Chatbot Response: {chatbot_reply}")
    
    return {"response": chatbot_reply}

@app.get("/")
def root():
    return {"message": "Empathetic AI Chatbot is running."}
