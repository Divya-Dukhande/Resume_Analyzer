

import React, { useEffect, useState } from 'react';
import styles from './History.module.css';
import { getHistory } from '../../services/api';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await getHistory();
      setHistory(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading history...</div>;
  }

  return (
    <div className={styles.historyPage}>
      <h1 className={styles.historyTitle}>Resume Analysis History</h1>

      {history.length === 0 ? (
        <p>No analysis found</p>
      ) : (
        <div className={styles.historyGrid}>
          {history.map((item) => (
            <div key={item.id} className={styles.historyCard}>
              <h3>Score: {item.overall_score}/100</h3>

              <p>
                <strong>Date:</strong>{' '}
                {new Date(item.created_at).toLocaleString()}
              </p>

              <details>
                <summary>View Details</summary>

                <h4>Strengths</h4>
                <ul>
                  {JSON.parse(item.strengths).map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>

                <h4>Weaknesses</h4>
                <ul>
                  {JSON.parse(item.weaknesses).map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>

                <h4>Spelling Mistakes</h4>
                <ul>
                  {JSON.parse(item.spelling_mistakes).map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>

                <h4>Grammar Mistakes</h4>
                <ul>
                  {JSON.parse(item.grammar_mistakes).map((g, i) => (
                    <li key={i}>{g}</li>
                  ))}
                </ul>
              </details>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
