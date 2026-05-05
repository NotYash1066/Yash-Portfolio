# 🍽️ Safe Plate

A food ingredient scanner application that empowers consumers to make informed food choices by analyzing ingredient lists and providing clear, actionable health information. Built with **FastAPI** (Python) backend and **React** (Vite) frontend.

## What Safe Plate Does

- **Ingredient Analysis**: Scans or manually inputs ingredient lists and classifies each ingredient by health impact (🟥 harmful, 🟨 caution, 🟩 safe)
- **Plain English Explanations**: Converts complex ingredient names into understandable descriptions with health impact information
- **Hidden Sugar Detection**: Identifies sugar aliases (dextrose, corn syrup, etc.) and provides sugar severity warnings
- **Allergen & Dietary Filtering**: Flags ingredients incompatible with selected allergies and dietary restrictions (vegan, vegetarian, gluten-free)
- **Health Scoring**: Calculates a 0-100 health score with detailed explanations
- **Scan History**: Maintains session-based history of recent product analyses

## Project Structure

```
├── backend/                    # Python FastAPI backend
│   ├── app/
│   │   ├── api/               # API routes
│   │   ├── core/              # Configuration and logging
│   │   ├── data/              # Static ingredient database & rules
│   │   ├── models/            # Pydantic schemas
│   │   ├── services/          # Analysis engine components
│   │   │   ├── analysis_orchestrator.py  # Main orchestrator
│   │   │   ├── classifier.py             # Ingredient classification
│   │   │   ├── sugar_detector.py         # Sugar analysis
│   │   │   ├── allergen_filter.py        # Dietary restrictions
│   │   │   ├── health_scorer.py          # Health scoring
│   │   │   └── ai_service.py             # Gemini AI integration
│   │   └── storage/           # Session management
│   ├── main.py               # API entry point
│   └── requirements.txt
├── frontend/                  # React Vite frontend
│   ├── src/
│   │   ├── api/              # Backend API integration
│   │   ├── components/       # Analysis form & results display
│   │   ├── layout/           # Navigation components
│   │   └── ui/               # Reusable UI components
│   └── package.json
├── conductor/                 # Project documentation & guidelines
└── .kiro/specs/safe-plate/   # Detailed requirements & design specs
```

## Current Implementation Status

### ✅ Completed Features

**Backend (Python FastAPI)**
- Core analysis engine with all components implemented:
  - Ingredient classification with static database + Gemini AI fallback
  - Sugar detection with alias recognition and severity scoring
  - Allergen filtering for dietary restrictions
  - Health scoring algorithm (0-100 scale)
  - Session-based scan history management
- FastAPI endpoints: `/analyze`, `/history`, `/api/ingredients/{ingredient}`, health check
- Robust OCR Service using `pytesseract` and `OpenCV` image preprocessing
- Gemini Flash Latest integration for unknown ingredients
- Property-based testing framework with Hypothesis
- CORS configuration for React frontend
- Comprehensive data files (ingredient database, sugar aliases, allergen rules)

**Frontend (React + Vite)**
- Modern React UI with Tailwind CSS styling
- Browser-based OCR integration with Tesseract.js for instant feedback
- Scan history component for viewing past analyses
- Analysis form with image upload and manual text input
- Results display with color-coded ingredient classifications
- Health score visualization and summary cards
- Responsive, mobile-friendly design
- API integration layer for backend communication

### 🚧 In Progress / Planned

**Backend Enhancements**
- Expand ingredient database to 50-100 entries with complete metadata
- Enhance OCR accuracy with advanced preprocessing models

**Frontend Enhancements**
- Improve mobile camera experience
- Enhanced user preference management with session storage
- Property-based testing with Jest + fast-check

**Integration & Polish**
- End-to-end testing of complete scan workflow
- Enhanced error handling and user feedback
- Performance optimizations

## Prerequisites

- Python 3.10+
- Node.js 18+ (project specifies >=22.12.0)
- npm or yarn
- Google Gemini API key (for AI ingredient analysis)

## Setup & Running

### Environment Setup

1. **Get a Gemini API Key**:
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Create a new API key
   - Keep it handy for backend configuration

### Backend

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Create virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. **Configure environment variables**:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

6. Run the server:
   ```bash
   python main.py
   ```

The backend API will be available at `http://localhost:8000`

API Documentation: `http://localhost:8000/docs`

### Frontend

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| POST | `/analyze` | Analyze ingredient list and return complete analysis |
| GET | `/history` | Get scan history for current session |

### Analysis Request Format

```json
{
  "ingredients": ["water", "sugar", "high fructose corn syrup", "artificial colors"],
  "dietary_restrictions": ["vegan"],
  "allergies": ["gluten"]
}
```

### Analysis Response Format

```json
{
  "health_score": 45,
  "score_explanation": "Low score due to multiple sugar sources and artificial additives",
  "ingredients": [
    {
      "name": "sugar",
      "category": "yellow",
      "explanation": "Common sweetener derived from sugar cane or beets",
      "health_impact": "High in calories, can contribute to tooth decay and blood sugar spikes",
      "confidence": 1.0
    }
  ],
  "sugar_analysis": {
    "sugar_count": 2,
    "severity": "high",
    "message": "Contains multiple sugar sources"
  },
  "allergen_warnings": [],
  "dietary_violations": []
}
```

## Development

### Architecture Overview

Safe Plate uses a **client-server architecture**:

- **Frontend (React)**: Handles user interface, image processing, and result visualization
- **Backend (FastAPI)**: Processes ingredient analysis using multiple specialized services
- **AI Integration**: Gemini Flash Latest for unknown ingredient classification
- **Data Layer**: Static JSON databases for common ingredients, allergens, and sugar aliases

### Analysis Engine Components

The backend analysis engine consists of several specialized services:

1. **IngredientClassifier**: Classifies ingredients using static database + AI fallback
2. **SugarDetector**: Identifies sugar aliases and calculates severity
3. **AllergenFilter**: Checks dietary restrictions and allergen compatibility  
4. **HealthScorer**: Calculates 0-100 health score with detailed explanations
5. **AnalysisOrchestrator**: Coordinates all analysis components

### Running Both Services

Open two terminal windows:

**Terminal 1 (Backend):**
```bash
cd backend
python main.py
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

### Frontend-Backend Integration

The frontend is configured to proxy `/api` requests to the backend via Vite's proxy configuration. This means:
- In development, requests to `/api/*` are forwarded to `http://localhost:8000`
- CORS is configured in the backend to allow requests from the frontend origin

### Testing

The project uses property-based testing to validate universal correctness properties:

- **Backend**: pytest + Hypothesis for Python property-based testing
- **Frontend**: Jest + fast-check for JavaScript property-based testing (planned)

Run backend tests:
```bash
cd backend
pytest
```

## Key Features in Detail

### 🔍 Ingredient Classification
- **Fine-Tuned Vision Model**: ResNet50 fine-tuned on the OpenFoodFacts global food dataset (2,600+ images) for direct ingredient recognition.
- **Static Database**: 50+ common food ingredients with health classifications.
- **AI Fallback**: Gemini Flash Latest analyzes unknown ingredients.
- **Color Coding**: 🟥 Harmful, 🟨 Caution, 🟩 Safe.
- **Plain English**: Clear explanations of what each ingredient is and why it's used.

### 🍬 Sugar Detection
- **Alias Recognition**: Identifies 20+ sugar aliases (dextrose, corn syrup, maltose, etc.)
- **Severity Scoring**: Low (1-2 sources), Moderate (3-4), High (5+)
- **Visual Indicators**: Clear warnings for products with multiple sugar sources

### 🚫 Allergen & Dietary Filtering
- **Supported Allergies**: Gluten, peanuts, lactose, and more
- **Dietary Preferences**: Vegan, vegetarian options
- **Clear Warnings**: Immediate alerts for incompatible ingredients

### 📊 Health Scoring Algorithm
- **Base Score**: Starts at 100 points
- **Penalties**: Red ingredients (-15), Yellow (-5), Multiple sugars (-10 to -20)
- **Bonuses**: Beneficial ingredients like fiber and protein (+5)
- **Range**: 0-100 with detailed explanations

## Team

**Runtime Rebels** - DU Hacks 5.0
