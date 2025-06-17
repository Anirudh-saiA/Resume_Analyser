import React from 'react';

const ResultDisplay = ({ result }) => {
  if (!result) return null;

  const {
    match_score = 0,
    matched = [],
    missing = [],
    suggestions = ''
  } = result;

  const getScoreColor = (score) => {
    if (score > 70) return '#4CAF50';     // Green
    if (score > 40) return '#FFC107';     // Amber
    return '#F44336';                     // Red
  };

  return (
    <div className="results" style={{
      marginTop: '2rem',
      padding: '2rem',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.08)'
    }}>
      {/* Match Score */}
      <div className="score-section" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.8rem' }}>
          <i className="fas fa-chart-line" style={{ color: getScoreColor(match_score), marginRight: '0.5rem' }}></i>
          Match Score:
          <span style={{
            color: getScoreColor(match_score),
            fontWeight: 'bold',
            marginLeft: '10px'
          }}>
            {match_score}%
          </span>
        </h2>
      </div>

      {/* Keyword Lists */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2rem',
        justifyContent: 'center'
      }}>
        {/* Matched Keywords */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h3 style={{
            color: '#4CAF50',
            borderBottom: '2px solid #4CAF50',
            paddingBottom: '0.5rem',
            marginBottom: '1rem'
          }}>
            ✅ Matched Keywords ({matched.length})
          </h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {matched.map((kw, i) => (
              <li key={i} style={{
                padding: '0.5rem 1rem',
                margin: '0.25rem 0',
                background: '#E8F5E9',
                borderLeft: '4px solid #4CAF50',
                borderRadius: '6px'
              }}>
                {kw}
              </li>
            ))}
          </ul>
        </div>

        {/* Missing Keywords */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h3 style={{
            color: '#F44336',
            borderBottom: '2px solid #F44336',
            paddingBottom: '0.5rem',
            marginBottom: '1rem'
          }}>
            ❌ Missing Keywords ({missing.length})
          </h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {missing.map((kw, i) => (
              <li key={i} style={{
                padding: '0.5rem 1rem',
                margin: '0.25rem 0',
                background: '#FFEBEE',
                borderLeft: '4px solid #F44336',
                borderRadius: '6px'
              }}>
                {kw}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Suggestions */}
      <div style={{ marginTop: '3rem' }}>
        <h3 style={{
          color: '#2196F3',
          borderBottom: '2px solid #2196F3',
          paddingBottom: '0.5rem',
          marginBottom: '1rem'
        }}>
          💡 Improvement Suggestions
        </h3>
        <div style={{
          background: '#E3F2FD',
          padding: '1.5rem',
          borderRadius: '8px',
          lineHeight: '1.6',
          fontSize: '1rem'
        }}>
          {suggestions.split('\n').map((p, i) => (
            <p key={i} style={{ marginBottom: '1rem' }}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
