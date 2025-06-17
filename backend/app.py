from flask import Flask, request, jsonify
from flask_cors import CORS
import fitz  # PyMuPDF
import re

app = Flask(__name__)
CORS(app)

def extract_text_from_pdf(file):
    doc = fitz.open(stream=file.read(), filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()
    return text

def preprocess(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s]', '', text)
    words = text.split()
    return set(words)

@app.route('/analyze', methods=['POST'])
def analyze_resume():
    try:
        resume_file = request.files.get('resume')
        job_description = request.form.get('job_description')

        if not resume_file or not job_description:
            return jsonify({"error": "Missing resume or job description"}), 400

        resume_text = extract_text_from_pdf(resume_file)
        resume_words = preprocess(resume_text)
        jd_words = preprocess(job_description)

        matched_keywords = list(jd_words & resume_words)
        missing_keywords = list(jd_words - resume_words)
        match_score = int((len(matched_keywords) / len(jd_words)) * 100) if jd_words else 0

        suggestions = "Try including the following keywords in your resume:\n"
        suggestions += ", ".join(missing_keywords) if missing_keywords else "Great! Your resume covers most of the relevant keywords."

        return jsonify({
            "match_score": match_score,
            "matched": matched_keywords,
            "missing": missing_keywords,
            "suggestions": suggestions
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
