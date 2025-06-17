import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = ({ setResult }) => {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) {
      alert("No file selected.");
    } else if (selected.type !== 'application/pdf') {
      alert("Only PDF files are allowed.");
    } else {
      setFile(selected);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !jobDesc) {
      alert("Both resume and job description are required.");
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('job_description', jobDesc);

    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:5000/analyze', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
  });

      setResult(response.data);
    } catch (err) {
      console.error(err);
      alert('Upload failed: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>AI Resume Analyzer</h1>
      </header>

      <div className="upload-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="resumeUpload" className="custom-file-upload">
              {file ? `📄 ${file.name}` : "Click to Upload Resume (PDF)"}
            </label>
            <input
              id="resumeUpload"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
            />
          </div>

          <div className="form-group">
            <label>Job Description</label>
            <textarea
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              placeholder="Paste the job description here..."
              required
            />
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Analyzing...' : 'Analyze Resume'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FileUpload;
