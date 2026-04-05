# ✉️ Smart Email Processor: AI-Powered Workflow Engine

## Overview
This project is a full-stack AI-powered application that processes unstructured email content and converts it into structured, meaningful data using LLMs.

It classifies emails into predefined categories and extracts structured information such as summary and entities, enabling automation of real-world business workflows.

---

## Features
- Email classification (Business, Recruitment, Spam, Personal, Other)
- Confidence score for classification
- Structured JSON output (category, summary, entities)
- Fallback handling for low-confidence cases (Human Review Required)
- Clean and simple UI for interaction

---

## Tech Stack
- Frontend: React (Vite)
- Backend: Node.js, Express
- LLM: HuggingFace (BART MNLI for classification, Flan-T5 for extraction)
- API Handling: Axios

---

## Setup Instructions

### Backend
cd Backend  
npm install  
node app.js  

### Frontend
cd Frontend  
npm install  
npm run dev  

### Environment Variables

Create a `.env` file inside the Backend folder:

HF_API_KEY=your_huggingface_api_key

---

## Architecture Overview

Frontend (React UI)  
⬇  
Backend API (Node.js + Express)  
⬇  
HuggingFace LLM APIs  
⬇  
Structured JSON Response  
⬇  
Rendered in UI  

---

## Prompt Design Strategy

The system uses prompt-based LLM interaction for structured data extraction.

### Classification:
- Uses HuggingFace BART MNLI model for zero-shot classification
- Predefined candidate labels:
  - Business
  - Recruitment
  - Spam
  - Personal
  - Other

### Extraction:
- A structured prompt is used to convert email text into JSON format
- The expected output schema is explicitly defined:

{
  "category": "",
  "summary": "",
  "entities": []
}

- Additional validation and fallback logic is applied to handle inconsistent or incomplete LLM outputs
- Ensures reliable structured output even when LLM responses are imperfect

---

## Assumptions
- Input is primarily English text-based emails
- Fixed classification categories are sufficient for the use case
- Short to medium-length email content is processed
- HuggingFace free-tier APIs are used

---

## Future Improvements
- Integrate more powerful LLMs like OpenAI GPT or Google Gemini for better accuracy and structured extraction
- Add support for file uploads (PDF, TXT) and extract content before processing
- Improve entity extraction using advanced NLP or fine-tuned models
- Implement batch email processing
- Add retry and validation mechanisms for LLM outputs
- Allow users to edit extracted results
- Enhance UI with filtering and search capabilities

---

## Conclusion
This project demonstrates how LLMs can be effectively used to transform unstructured data into structured outputs, enabling scalable and intelligent workflow automation.
