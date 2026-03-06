# HireSense — AI Resume Screening Platform

An intelligent resume screening system using NLP and machine learning to automatically
parse resumes, extract skills, and rank candidates by job fit.

---

## 📁 Project Structure

```
hiresense/
├── backend/
│   ├── app.py              ← Flask API server
│   ├── requirements.txt    ← Python dependencies
│   └── uploads/            ← Auto-created: uploaded resumes stored here
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js                      ← Main app + all state logic
│   │   ├── index.js
│   │   ├── index.css
│   │   ├── components/
│   │   │   ├── Navbar.js               ← Top navigation bar
│   │   │   ├── UploadZone.js           ← Drag & drop file uploader
│   │   │   ├── SkillSelector.js        ← Skill tag picker
│   │   │   ├── CandidateCard.js        ← Ranked candidate result card
│   │   │   └── StatsBar.js             ← Summary statistics
│   │   └── utils/
│   │       └── api.js                  ← Axios API calls
│   └── package.json
├── setup.bat               ← Windows one-click setup
├── setup.sh                ← Mac/Linux one-click setup
└── README.md
```

---

## 🚀 Quick Setup (VS Code)

### Prerequisites
- Python 3.9 or higher
- Node.js 16 or higher
- npm

---

### Step 1 — Open in VS Code

Open the `hiresense/` folder in VS Code.

---

### Step 2 — Set Up the Backend

Open a terminal in VS Code (`Ctrl+\`` or Terminal → New Terminal).

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Download spaCy language model
python -m spacy download en_core_web_sm

# Start the Flask server
python app.py
```

The API will run at: **http://localhost:5000**

---

### Step 3 — Set Up the Frontend

Open a **second terminal** in VS Code.

```bash
cd frontend

# Install packages
npm install

# Start React app
npm start
```

The app will open at: **http://localhost:3000**

---

## ✅ How to Use

1. **Upload Resumes** — Drag & drop PDF or DOCX files into the upload zone
2. **Set Job Title** — Enter the position you're hiring for
3. **Paste Job Description** *(optional)* — Click "Auto-extract Skills" to detect skills automatically
4. **Select Required Skills** — Toggle skills from the list or add custom ones
5. **Set Min Experience** *(optional)* — Enter years of experience required
6. **Click "Analyze & Rank Candidates"** — AI processes and ranks all resumes
7. **Review Results** — Filter by match score, search by name, expand cards for full profiles

---

## 🔌 API Endpoints

| Method | Endpoint          | Description                          |
|--------|-------------------|--------------------------------------|
| GET    | /api/health       | Check API status                     |
| POST   | /api/upload       | Upload resumes (PDF/DOCX)            |
| POST   | /api/match        | Match candidates to job requirements |
| POST   | /api/parse-jd     | Extract skills from job description  |

---

## 🧠 How the AI Works

- **Resume Parsing**: PyPDF2 / docx2txt extract raw text
- **NLP Entity Recognition**: spaCy detects names from resume text
- **Skill Extraction**: Regex matching against a 100+ keyword skill dictionary
- **Skill Match Score** (70% weight): % of required skills found in resume
- **Semantic Score** (30% weight): TF-IDF cosine similarity between resume text and job description
- **Final Score**: Weighted combination for overall candidate ranking

---

## 🛠 Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 18, Axios, React Dropzone     |
| Backend   | Python 3, Flask, Flask-CORS         |
| NLP       | spaCy (en_core_web_sm)              |
| ML        | scikit-learn (TF-IDF, cosine sim)   |
| Parsing   | PyPDF2, docx2txt                    |

---

## ⚠️ Troubleshooting

**CORS error**: Make sure Flask is running on port 5000 before starting React.

**spaCy model not found**: Run `python -m spacy download en_core_web_sm`

**PDF text extraction fails**: Some PDFs are image-based (scanned). Use text-based PDFs.

**Port already in use**: Kill the process on port 5000 or 3000 and retry.
