import sys
import os

# Add backend directory to path so we can import app
sys.path.append(os.path.dirname(__file__))

import app

# Test 1: Simple text with skills
text = "I have experience with Python, Java, and C++."
skills = app.extract_skills(text)
print("Skills found testing regex:", skills)

# Test 2: Test with an actual PDF
pdf_path = os.path.join("samples", "resume-sample.pdf")
if os.path.exists(pdf_path):
    pdf_text = app.extract_text(pdf_path)
    print("Extracted PDF text length:", len(pdf_text))
    pdf_skills = app.extract_skills(pdf_text)
    print("Skills found in PDF:", pdf_skills)
else:
    print("Sample PDF not found.")
