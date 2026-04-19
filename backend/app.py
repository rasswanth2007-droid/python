from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import re

# Resume text extraction
import PyPDF2
import docx2txt

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ─── Skill Dictionary ────────────────────────────
SKILL_KEYWORDS = [
    "python", "java", "javascript", "react", "node", "flask",
    "machine learning", "ai", "sql", "html", "css"
]

# ─── Text Extraction ─────────────────────────────

def extract_text_from_pdf(filepath):
    text = ""
    try:
        with open(filepath, "rb") as f:
            reader = PyPDF2.PdfReader(f)
            for page in reader.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
    except:
        return ""
    return text.strip()


def extract_text_from_docx(filepath):
    try:
        return docx2txt.process(filepath)
    except:
        return ""


def extract_text(filepath):
    ext = filepath.lower().split(".")[-1]
    if ext == "pdf":
        return extract_text_from_pdf(filepath)
    elif ext in ["docx", "doc"]:
        return extract_text_from_docx(filepath)
    return ""

# ─── Resume Parsing ─────────────────────────────

def extract_email(text):
    match = re.search(r"[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}", text)
    return match.group(0) if match else "Not found"


def extract_phone(text):
    match = re.search(r"(\+?\d[\d\s\-\(\)]{8,15}\d)", text)
    return match.group(0).strip() if match else "Not found"


def extract_name(text):
    for line in text.split("\n"):
        line = line.strip()
        if line and len(line.split()) <= 4:
            return line
    return "Unknown"


def extract_skills(text):
    text_lower = text.lower()
    return list(set([s for s in SKILL_KEYWORDS if s in text_lower]))


def parse_resume(text):
    return {
        "name": extract_name(text),
        "email": extract_email(text),
        "phone": extract_phone(text),
        "skills": extract_skills(text),
        "raw_text": text[:1000],
        "final_score": 0,
        "rank": 0
    }

# ─── Matching ─────────────────────────────

def calculate_match_score(candidate_skills, required_skills):
    if not required_skills:
        return 0, [], []
    matched = [s for s in required_skills if s.lower() in [c.lower() for c in candidate_skills]]
    missing = [s for s in required_skills if s.lower() not in [c.lower() for c in candidate_skills]]
    score = round((len(matched) / len(required_skills)) * 100)
    return score, matched, missing

# ─── API ROUTES ─────────────────────────────

@app.route("/")
def home():
    return "Backend running 🚀"


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


@app.route("/api/upload", methods=["POST"])
def upload_resumes():
    files = request.files.getlist("resumes")

    if not files:
        return jsonify({"error": "No files uploaded"}), 400

    results = []

    for file in files:
        filename = file.filename
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)

        text = extract_text(filepath)

        if not text:
            results.append({"filename": filename, "error": "Could not read file"})
            continue

        parsed = parse_resume(text)
        parsed["filename"] = filename
        results.append(parsed)

    return jsonify({"candidates": results})


@app.route("/api/match", methods=["POST"])
def match_candidates():
    data = request.json
    candidates = data.get("candidates", [])
    required_skills = data.get("required_skills", [])

    ranked = []
    for c in candidates:
        score, matched, missing = calculate_match_score(
            c.get("skills", []), required_skills
        )

        ranked.append({
            **c,
            "final_score": score,
            "matched_skills": matched,
            "missing_skills": missing
        })

    ranked.sort(key=lambda x: x["final_score"], reverse=True)

    for i, c in enumerate(ranked):
        c["rank"] = i + 1

    return jsonify({"ranked_candidates": ranked})


@app.route("/api/parse-jd", methods=["POST"])
def parse_job_description():
    data = request.json
    jd_text = data.get("text", "")
    skills = extract_skills(jd_text)
    return jsonify({"extracted_skills": skills})


# ─── RUN SERVER ─────────────────────────────

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
