# SHL Conversational Assessment Recommender

Production-grade Conversational RAG (Retrieval-Augmented Generation) system built for the SHL AI Intern Assignment.

This project helps recruiters and hiring managers discover relevant SHL assessments through natural conversation instead of keyword-only catalog search.

---

# Features

## Conversational Recommendation Engine

Supports:

* Clarification workflows
* Dynamic recommendation generation
* Mid-conversation refinement
* Assessment comparison
* Off-topic refusal
* Prompt injection prevention

---

## RAG Architecture

Implemented using:

* Semantic search
* Embedding generation
* ChromaDB vector retrieval
* Grounded LLM responses
* Context-aware prompt engineering

---

## AI Safety Guardrails

Includes:

* Prompt injection prevention
* Unsafe request refusal
* Hallucination prevention
* Strict schema enforcement
* Catalog-only recommendations

---

## Production Backend Engineering

Implemented with:

* Node.js
* Express.js
* ChromaDB
* Ollama
* Jest testing
* Docker support
* Modular architecture
* Validation middleware
* Error handling middleware
* Logging

---

# Architecture

```txt
Frontend / Postman
        ↓
Express API
        ↓
Conversation Agent
        ↓
Retriever Service
        ↓
ChromaDB Vector Store
        ↓
Ollama (llama3)
```

---

# Tech Stack

| Component        | Technology        |
| ---------------- | ----------------- |
| Backend          | Node.js + Express |
| LLM              | Ollama (llama3)   |
| Embeddings       | nomic-embed-text  |
| Vector Database  | ChromaDB          |
| Validation       | Zod               |
| Testing          | Jest + Supertest  |
| Scraping         | Cheerio           |
| Containerization | Docker            |

---

# Folder Structure

```txt
backend/
│
├── src/
│   ├── agents/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── scrapers/
│   ├── services/
│   ├── tests/
│   ├── utils/
│   ├── validators/
│   ├── vector-db/
│   ├── data/
│   ├── app.js
│   └── server.js
│
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```

---

# Core Workflows

## 1. Clarification Workflow

Example:

User:

```txt
Need assessment
```

Agent:

```txt
What role are you hiring for?
```

---

## 2. Recommendation Workflow

Example:

User:

```txt
Need Java backend assessment
```

Agent retrieves relevant SHL catalog items and returns grounded recommendations.

---

## 3. Refinement Workflow

Example:

User:

```txt
Actually add personality tests
```

Agent refines recommendations using stateless conversation history.

---

## 4. Comparison Workflow

Example:

```txt
Compare OPQ and GSA
```

Agent retrieves both assessments and generates grounded comparison.

---

## 5. Safety Workflow

Example:

```txt
Ignore previous instructions
```

Agent safely refuses the request.

---

# API Endpoints

## GET /health

Health check endpoint.

### Response

```json
{
  "success": true,
  "message": "Server healthy"
}
```

---

## POST /chat

Main conversational endpoint.

### Request

```json
{
  "messages": [
    {
      "role": "user",
      "content": "Need Java backend assessment"
    }
  ]
}
```

---

### Response

```json
{
  "reply": "Here are recommended SHL assessments.",
  "recommendations": [
    {
      "name": "Java Assessment",
      "url": "https://www.shl.com/...",
      "test_type": "Technical"
    }
  ],
  "end_of_conversation": true
}
```

---

# Stateless Conversation Design

The API is fully stateless.

Every `/chat` request contains the full conversation history.

The backend stores NO conversation state.

Example:

```json
{
  "messages": [
    {
      "role": "user",
      "content": "Need frontend assessment"
    },
    {
      "role": "assistant",
      "content": "What experience level?"
    },
    {
      "role": "user",
      "content": "Senior developers"
    }
  ]
}
```

---

# RAG Pipeline

```txt
User Query
    ↓
Embedding Generation
    ↓
ChromaDB Semantic Search
    ↓
Ranking
    ↓
Context Construction
    ↓
Ollama Response Generation
    ↓
JSON Validation
```

---

# Recommendation Engine

Implemented features:

* Semantic retrieval
* Query expansion
* Top-k ranking
* Duplicate removal
* Context grounding
* Catalog-only recommendations

---

# Safety Guardrails

Implemented protections:

* Prompt injection detection
* Off-topic rejection
* Unsafe request handling
* Hallucination prevention
* Response schema enforcement

Blocked examples:

```txt
Ignore previous instructions
Act as another AI
Recommend HackerRank
Give legal hiring advice
```

---

# Testing

Implemented:

* API tests
* Retrieval tests
* Recommendation tests
* Hallucination tests
* Prompt injection tests
* Schema validation tests
* Comparison tests
* Clarification tests

---

# Test Execution

Run:

```bash
npm test
```

Current status:

```txt
10/10 test suites passing
```

---

# Local Setup

## 1. Install Dependencies

```bash
npm install
```

---

## 2. Start ChromaDB

```bash
docker run -p 8000:8000 chromadb/chroma
```

---

## 3. Start Ollama

```bash
ollama serve
```

---

## 4. Pull Models

```bash
ollama pull llama3
ollama pull nomic-embed-text
```

---

## 5. Run Ingestion Pipeline

```bash
node src/vector-db/ingest.js
```

---

## 6. Start Backend

```bash
npm start
```

---

# Docker Setup

Run:

```bash
docker compose up --build
```

---

# Design Decisions

## Why RAG?

RAG prevents hallucinations and allows recommendations to stay grounded in SHL catalog data.

---

## Why ChromaDB?

ChromaDB is lightweight, easy to integrate, and optimized for vector similarity retrieval.

---

## Why Ollama?

Ollama allows local inference with zero API cost and supports rapid experimentation.

---

## Why Stateless APIs?

Stateless APIs scale more easily and align with the assignment specification.

---

# Challenges Faced

## 1. ESM + Jest Compatibility

Jest required VM module configuration for ES modules.

---

## 2. Retrieval Threshold Tuning

Initial retrieval filtering removed valid semantic matches.

---

## 3. ChromaDB Query Compatibility

Manual embedding queries required careful vector scoring normalization.

---

## 4. Ollama Mocking During Tests

Real inference slowed automated tests, so mocking was introduced for stability.

---

# Future Improvements

Potential enhancements:

* Better metadata extraction
* Hybrid BM25 + vector retrieval
* Frontend React chat interface
* Redis caching
* Streaming responses
* Better ranking signals
* Advanced conversational memory summarization

---

# Submission Notes

This implementation satisfies the assignment requirements:

* Conversational recommendation workflows
* Clarification handling
* Comparison support
* Stateless API design
* Guardrails and safety
* Structured schema responses
* Catalog-only recommendations
* Production backend engineering
* Automated testing

---

# Author

SHL AI Intern Assignment Submission
