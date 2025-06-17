import React, { useState, useEffect } from 'react';
import FileUpload from './components/FileUpload';
import ResultDisplay from './components/ResultDisplay';

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading screen (optional)
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <div className="app-container">Loading AI Resume Analyzer...</div>;

  return (
    <div className="app-container">
      <h1>AI Resume Analyzer</h1>
      <FileUpload setResult={setResult} />
      {result && <ResultDisplay result={result} />}
    </div>
  );
}

export default App;
