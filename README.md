# ✉️Smart Email Processor – AI-Powered Workflow Engine

## Overview
This project is a full-stack application that classifies and processes unstructured email content using LLMs.

## Features
- Email classification (Business, Recruitment, Spam, etc.)
- Confidence score
- Structured JSON output (category, summary, entities)
- Fallback handling for low-confidence cases

## Tech Stack
- Frontend: React (Vite)
- Backend: Node.js, Express
- LLM: HuggingFace (BART MNLI)

## How to Run

### Backend
cd Backend  
npm install  
node app.js  

### Frontend
cd Frontend  
npm install  
npm run dev  

## Architecture
Frontend → Backend API → LLM → Structured JSON → UI

## Assumptions
- Input is English email text
- Fixed categories used

## Future Improvements
- File upload support (.pdf, .txt)
- Better entity extraction using stronger LLMs
- Batch processing
