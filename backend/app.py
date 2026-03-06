from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import re
import json

# Resume text extraction
import PyPDF2
import docx2txt

# NLP
import spacy
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# Serve React build files
REACT_BUILD_DIR = os.path.join(os.path.dirname(__file__), '..', 'frontend', 'build')

app = Flask(__name__, static_folder=REACT_BUILD_DIR, static_url_path='/')
CORS(app)

UPLOAD_FOLDER = "uploads"
SAMPLES_FOLDER = "samples"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(SAMPLES_FOLDER, exist_ok=True)

# Load spaCy model
try:
    nlp = spacy.load("en_core_web_sm")
except:
    import subprocess
    subprocess.run(["python", "-m", "spacy", "download", "en_core_web_sm"])
    nlp = spacy.load("en_core_web_sm")

# ─── Skill Dictionary ────────────────────────────────────────────
SKILL_KEYWORDS = [
    # Programming Languages
    "python", "java", "javascript", "typescript", "c++", "c#", "c", "r", "go", "golang", "rust", 
    "kotlin", "swift", "php", "ruby", "scala", "matlab", "perl", "bash", "shell", "groovy",
    "objective-c", "vb.net", "visual basic", "lua", "haskell", "elixir", "clojure", "erlang",
    
    # Web Development
    "react", "react.js", "angular", "vue", "vue.js", "svelte", "ember", "backbone", 
    "node.js", "nodejs", "next.js", "nextjs", "nuxt", "gatsby", "nestjs", "nest.js",
    "django", "flask", "fastapi", "spring", "spring boot", "express", "asp.net", "asp .net",
    "html", "css", "scss", "sass", "less", "bootstrap", "tailwind", "material ui", "jquery", 
    "webpack", "vite", "babel", "gulp", "grunt", "parcel", "rollup",
    
    # REST & API
    "rest", "restful", "graphql", "grpc", "soap", "websocket", "json", "xml", "yaml", "postman",
    "swagger", "openapi", "api design", "rest api", "web services",
    
    # Data Science & ML
    "machine learning", "ml", "deep learning", "artificial intelligence", "ai",
    "natural language processing", "nlp", "computer vision", "cv", "image processing",
    "data mining", "big data", "data wrangling", "feature engineering",
    "tensorflow", "torch", "pytorch", "keras", "scikit-learn", "sklearn", "xgboost", 
    "lightgbm", "gradient boosting", "random forest", "neural networks", "cnn", "rnn", "lstm",
    "transformers", "hugging face", "bert", "gpt", "nlp models", "cv models",
    
    # Data & Databases
    "sql", "mysql", "postgresql", "sqlite", "oracle", "mssql", "mongodb", "cassandra",
    "redis", "elasticsearch", "dynamodb", "firebase", "cosmos db", "neo4j", "graph databases",
    "data warehousing", "data lakes", "etl", "erp", "crm", "dwh",
    
    # Data Analysis & BI
    "data analysis", "data science", "data engineering", "analytics", "business intelligence", "bi",
    "tableau", "power bi", "looker", "qlikview", "excel", "spreadsheets", "vlookup", "pivot tables",
    "statistics", "statistical analysis", "probability", "hypothesis testing",
    "a/b testing", "experimental design", "analytics", "dashboarding",
    
    # Big Data & Distributed Systems
    "spark", "hadoop", "hive", "pig", "mapreduce", "kafka", "rabbitmq", "airflow", "luigi",
    "beam", "flink", "presto", "impala", "distributed computing", "stream processing",
    
    # Cloud & DevOps
    "aws", "amazon web services", "azure", "microsoft azure", "gcp", "google cloud", "cloud computing",
    "docker", "containers", "kubernetes", "k8s", "openshift", "podman", "container orchestration",
    "jenkins", "gitlab ci", "github actions", "travis ci", "circleci", "bamboo", "teamcity",
    "ci/cd", "continuous integration", "continuous deployment", "devops", "mlops", "gitops",
    "terraform", "cloudformation", "ansible", "puppet", "chef", "ansible", "infrastructure as code", "iac",
    "linux", "unix", "windows server", "macos", "os administration", "system administration",
    "git", "github", "gitlab", "bitbucket", "version control", "svn", "mercurial",
    "nginx", "apache", "iis", "web servers", "load balancing", "reverse proxy",
    "ssl", "tls", "https", "security", "encryption", "firewall", "vpn", "network security",
    
    # Mobile Development
    "ios", "iphone", "android", "mobile app", "react native", "flutter", "xamarin", "ionic",
    "swift", "objective-c", "kotlin", "swift", "java android", "app development",
    
    # Testing & QA
    "testing", "unit testing", "integration testing", "end-to-end testing", "e2e", "qa", "quality assurance",
    "junit", "pytest", "testng", "mocha", "jest", "jasmine", "rspec", "cucumber", "selenium",
    "jira", "bug tracking", "test automation", "manual testing", "exploratory testing",
    "performance testing", "load testing", "stress testing", "security testing",
    
    # Software Architecture & Design
    "microservices", "monolithic", "serverless", "lambda", "architecture", "design patterns",
    "mvc", "mvvm", "solid principles", "clean code", "refactoring", "cqrs", "event sourcing",
    "api gateway", "service mesh", "istio", "consul", "oauth", "jwt", "auth0",
    
    # Version Control & Collaboration
    "git", "github", "gitlab", "bitbucket", "pull requests", "code review", "branching",
    "merge conflicts", "rebase", "cherry-pick", "git flow", "github flow",
    
    # Soft Skills & Management
    "communication", "leadership", "teamwork", "team collaboration", "problem solving", 
    "critical thinking", "analytical thinking", "project management", "agile", "scrum", 
    "sprint planning", "kanban", "waterfall", "time management", "collaboration", "mentoring",
    "training", "documentation", "presentation", "attention to detail", "adaptability",
    "creativity", "innovation", "customer service", "stakeholder management",
    
    # Business & Domain Knowledge
    "saas", "finance", "fintech", "banking", "e-commerce", "healthcare", "retail", "logistics",
    "manufacturing", "supply chain", "erp", "crm", "business analysis", "requirements gathering",
    "domain knowledge", "industry expertise", "business process", "workflow",
    
    # Other Technologies
    "blockchain", "crypto", "web3", "solidity", "smart contracts", "ethereum", "bitcoin",
    "iot", "internet of things", "embedded systems", "firmware", "microcontroller",
    "ar", "augmented reality", "vr", "virtual reality", "3d", "graphics", "rendering",
    "game development", "unity", "unreal engine", "godot", "directx", "opengl", "vulkan",
    "seo", "web optimization", "performance optimization", "caching", "cdn",
    "accessibility", "a11y", "wcag", "ux", "ui", "user experience", "interaction design",
    "figma", "adobe xd", "sketch", "design tools", "wireframing", "prototyping", "mockups",
    "content management", "cms", "wordpress", "drupal", "joomla", "wix", "shopify",
    
    # Additional Modern Tech
    "flutter", "react native", "xamarin", "ionic", "cordova", "expo",
    "cypress", "playwright", "puppeteer", "vitest", "testing library", "enzyme",
    "slack api", "discord api", "telegram", "twilio", "stripe", "paypal", "square",
    "oauth", "saml", "jwt", "auth0", "okta", "2fa", "mfa", "encryption", "ssl", "tls",
    "quantum", "quantum computing", "qiskit", "cirq", "amazon braket",
    "metaverse", "nft", "web3", "defi", "crypto", "dapp", "decentralized",
    "robotics", "drone", "automation", "production", "manufacturing", "supply chain",
]

# ─── Text Extraction ─────────────────────────────────────────────
def extract_text_from_pdf(filepath):
    text = ""
    try:
        with open(filepath, "rb") as f:
            reader = PyPDF2.PdfReader(f)
            
            # Handle encrypted/protected PDFs
            if reader.is_encrypted:
                try:
                    reader.decrypt('')
                except:
                    return ""
            
            for page_num, page in enumerate(reader.pages):
                try:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text + "\n"
                except Exception as e:
                    print(f"Error extracting text from page {page_num}: {str(e)}")
                    continue
        
        return text.strip()
    except Exception as e:
        print(f"Error reading PDF file: {str(e)}")
        return ""

def extract_text_from_docx(filepath):
    try:
        return docx2txt.process(filepath)
    except Exception as e:
        print(f"Error reading DOCX file: {str(e)}")
        return ""

def extract_text(filepath):
    ext = filepath.lower().split(".")[-1]
    if ext == "pdf":
        return extract_text_from_pdf(filepath)
    elif ext in ["docx", "doc"]:
        return extract_text_from_docx(filepath)
    return ""

# ─── Resume Parsing ──────────────────────────────────────────────
def extract_email(text):
    match = re.search(r"[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}", text)
    return match.group(0) if match else "Not found"

def extract_phone(text):
    match = re.search(r"(\+?\d[\d\s\-\(\)]{8,15}\d)", text)
    return match.group(0).strip() if match else "Not found"

def extract_name(text):
    doc = nlp(text[:500])
    for ent in doc.ents:
        if ent.label_ == "PERSON":
            return ent.text
    # Fallback: first non-empty line
    for line in text.split("\n"):
        line = line.strip()
        if line and len(line.split()) <= 5 and not any(c.isdigit() for c in line):
            return line
    return "Unknown"

def extract_skills(text):
    text_lower = text.lower()
    found = []
    for skill in SKILL_KEYWORDS:
        # Use negative lookaround to handle skills with special characters (e.g., C++, .NET)
        pattern = r'(?<!\w)' + re.escape(skill) + r'(?!\w)'
        if re.search(pattern, text_lower):
            found.append(skill.title())
    return list(set(found))

def extract_education(text):
    edu_keywords = ["bachelor", "master", "phd", "b.tech", "m.tech", "b.sc", "m.sc",
                    "mba", "b.e", "m.e", "diploma", "degree", "university", "college", "institute"]
    lines = text.split("\n")
    edu_lines = []
    for line in lines:
        if any(kw in line.lower() for kw in edu_keywords):
            cleaned = line.strip()
            if cleaned and len(cleaned) > 5:
                edu_lines.append(cleaned)
    return edu_lines[:3] if edu_lines else ["Not detected"]

def extract_experience_years(text):
    patterns = [
        r"(\d+)\+?\s*years?\s*(?:of\s*)?(?:experience|exp)",
        r"experience[:\s]+(\d+)\+?\s*years?",
    ]
    for p in patterns:
        match = re.search(p, text.lower())
        if match:
            return f"{match.group(1)}+ years"
    return "Not specified"

def parse_resume(text):
    skills_found = extract_skills(text)
    return {
        "name": extract_name(text),
        "email": extract_email(text),
        "phone": extract_phone(text),
        "skills": skills_found,
        "education": extract_education(text),
        "experience": extract_experience_years(text),
        "raw_text": text[:2000],
        # Initially, no skills are matched (they're just "found")
        # Skills will be properly matched/missing/bonus after job requirements are applied
        "matched_skills": [],  # ALWAYS empty until requirements are evaluated
        "missing_skills": [],   # ALWAYS empty until requirements are evaluated
        "bonus_skills": skills_found,  # ALL detected skills initially - they're "extra" until requirements defined
        "skill_score": 0,  # 0 until evaluated against requirements
        "semantic_score": 0,
        "project_weight": 0,
        "experience_bonus": 0,
        "final_score": 0,  # 0 until evaluated against requirements
        "rank": 0
    }

# ─── Skill Matching ──────────────────────────────────────────────
def calculate_match_score(candidate_skills, required_skills):
    if not required_skills:
        return 0, [], []
    c_lower = [s.lower() for s in candidate_skills]
    r_lower = [s.lower() for s in required_skills]
    matched = [s for s in required_skills if s.lower() in c_lower]
    missing = [s for s in required_skills if s.lower() not in c_lower]
    score = round((len(matched) / len(required_skills)) * 100)
    return score, matched, missing

def semantic_score(candidate_text, job_description):
    if not candidate_text.strip() or not job_description.strip():
        return 0
    try:
        vectorizer = TfidfVectorizer(stop_words="english")
        tfidf = vectorizer.fit_transform([candidate_text, job_description])
        sim = cosine_similarity(tfidf[0:1], tfidf[1:2])[0][0]
        return round(float(sim) * 100, 1)
    except:
        return 0

# ─── API Routes ───────────────────────────────────────────────────

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "message": "HireSense API running"})

@app.route("/api/upload", methods=["POST"])
def upload_resumes():
    files = request.files.getlist("resumes")
    
    # Check if files were actually sent in the request
    if not files or all(f.filename == '' for f in files):
        return jsonify({
            "error": "No files uploaded. Please drag & drop resume files (PDF or DOCX) into the upload zone.",
            "hint": "Make sure files are actually being selected before clicking Analyze"
        }), 400

    results = []
    for file in files:
        if file.filename == '':
            continue
            
        filename = file.filename
        # Validate file extension
        if not filename.lower().endswith(('.pdf', '.docx', '.doc')):
            results.append({
                "filename": filename, 
                "error": "Invalid file type. Only PDF and DOCX files are supported",
                "name": filename
            })
            continue
            
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        try:
            file.save(filepath)
            text = extract_text(filepath)
            
            # Validate that text was actually extracted (very lenient - allow minimal text)
            if not text or len(text.strip()) < 3:
                results.append({
                    "filename": filename,
                    "error": "Could not extract text from file. The PDF might be image-based, encrypted, or corrupted. Try: 1) Using a text-based PDF, 2) Converting PDF to DOCX, or 3) Checking file integrity.",
                    "name": filename
                })
                continue
            
            # Log the extracted text length for debugging
            print(f"Extracted {len(text)} characters from {filename}")
                
            parsed = parse_resume(text)
            parsed["filename"] = filename
            parsed["upload_source"] = "user_upload"  # Mark as user upload
            results.append(parsed)
        except Exception as e:
            results.append({
                "filename": filename, 
                "error": str(e),
                "name": filename
            })

    # Separate successful and failed results
    successful = [r for r in results if "error" not in r]
    failed = [r for r in results if "error" in r]
    
    # If no successful uploads, return error
    if not successful:
        return jsonify({
            "error": "Failed to process resumes. Check file formats.",
            "failed_files": failed
        }), 400
    
    # Return successful uploads
    return jsonify({
        "candidates": successful, 
        "count": len(successful),
        "uploaded_count": len(successful),
        "failed": failed,
        "total": len(results)
    })

@app.route("/api/match", methods=["POST"])
def match_candidates():
    data = request.json
    candidates = data.get("candidates", [])
    required_skills = data.get("required_skills", [])
    job_description = data.get("job_description", "")
    min_experience = data.get("min_experience", 0)

    print(f"DEBUG: Required skills = {required_skills}")
    ranked = []
    for c in candidates:
        candidate_skills = c.get("skills", [])
        print(f"DEBUG: Candidate {c.get('name', 'Unknown')} skills = {candidate_skills}")
        skill_score, matched, missing = calculate_match_score(
            candidate_skills, required_skills
        )
        print(f"DEBUG: Matched = {matched}, Missing = {missing}, Score = {skill_score}")
        sem_score = semantic_score(c.get("raw_text", ""), job_description)
        
        # Extract project/experience indicators for weighting
        experience = c.get("experience", "").lower()
        has_relevant_exp = any(year in experience for year in ["5+", "4+", "3+", "2+", "1+", "10", "9", "8", "7", "6", "5", "4", "3", "2"])
        experience_bonus = 15 if has_relevant_exp else 0  # 15% bonus if experience mentioned
        
        # Check for project keywords in resume
        project_keywords = ["project", "developed", "built", "created", "led", "implemented", 
                           "designed", "architected", "deployed", "launched", "contributed"]
        project_weight = sum(1 for kw in project_keywords if kw in c.get("raw_text", "").lower()) * 2
        project_weight = min(project_weight, 20)  # Cap bonus at 20%
        
        # Weighted final score (70% skills, 20% semantic, 10% weighted by projects & experience)
        final_score = round(
            (skill_score * 0.70) + 
            (sem_score * 0.20) + 
            ((experience_bonus + project_weight) / 100 * 10)
        )
        final_score = min(final_score, 100)  # Cap at 100%
        
        bonus_skills = [s for s in c.get("skills", []) if s.lower() not in [r.lower() for r in required_skills]]

        # Generate per-requirement analysis report
        analysis_report = []
        raw_text_lower = c.get("raw_text", "").lower()
        for req_skill in required_skills:
            is_present = req_skill.lower() in [sk.lower() for sk in candidate_skills]
            # Check how deeply the skill appears in the resume context
            skill_mentions = raw_text_lower.count(req_skill.lower())
            
            if is_present and skill_mentions >= 3:
                recommendation = f"Strong evidence of {req_skill} — mentioned {skill_mentions} times in resume."
                usefulness = "Candidate demonstrates solid proficiency. Consider for senior-level tasks."
            elif is_present and skill_mentions >= 1:
                recommendation = f"{req_skill} is present but mentioned only {skill_mentions} time(s)."
                usefulness = "Skill detected but depth is limited. May benefit from a technical assessment."
            else:
                recommendation = f"{req_skill} was not found in the candidate's resume."
                usefulness = "Candidate may need training or upskilling in this area."
            
            analysis_report.append({
                "requirement": req_skill,
                "present_and_adequate": is_present and skill_mentions >= 2,
                "is_necessary": True,
                "recommendation": recommendation,
                "modified_for_usefulness": usefulness,
            })

        ranked.append({
            **c,
            "skill_score": skill_score,
            "semantic_score": sem_score,
            "project_weight": project_weight,
            "experience_bonus": experience_bonus,
            "final_score": final_score,
            "matched_skills": matched,
            "missing_skills": missing,
            "bonus_skills": bonus_skills[:6],
            "analysis_report": analysis_report,
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
    exp = extract_experience_years(jd_text)
    return jsonify({"extracted_skills": skills, "experience": exp})

@app.route("/api/samples", methods=["GET"])
def get_sample_candidates():
    """Load sample resumes for demo purposes"""
    try:
        sample_files = [f for f in os.listdir(SAMPLES_FOLDER) 
                       if f.lower().endswith(('.pdf', '.docx', '.doc'))]
        
        results = []
        for fname in sample_files:
            filepath = os.path.join(SAMPLES_FOLDER, fname)
            try:
                text = extract_text(filepath)
                parsed = parse_resume(text)
                parsed["filename"] = fname
                parsed["upload_source"] = "sample_demo"
                results.append(parsed)
            except Exception as e:
                results.append({"filename": fname, "error": str(e), "name": fname})
        
        return jsonify({
            "candidates": results,
            "count": len(results),
            "message": "Sample resumes loaded for demo"
        })
    except Exception as e:
        return jsonify({"error": f"Failed to load samples: {str(e)}"}), 400

# Serve React app for all other routes
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):
    if path and os.path.exists(os.path.join(REACT_BUILD_DIR, path)):
        return send_from_directory(REACT_BUILD_DIR, path)
    return send_from_directory(REACT_BUILD_DIR, 'index.html')

if __name__ == "__main__":
    app.run(debug=True, port=5000)
