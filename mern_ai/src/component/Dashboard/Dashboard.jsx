import React, { useState } from 'react';
import styles from './DashBoard.module.css';
import { buildPrompt } from "../../utils/aiPrompt";
import { saveAnalysis } from "../../services/api";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const DashBoard = () => {

  const [result, setResult] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  // PDF upload
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : "");
  };

  // TEXT extraction
  const extractTextFromPDF = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map(item => item.str);
      text += strings.join(" ") + "\n";
    }
    return text;
  };

  // AI analysis
  const handleAnalyze = async () => {
    if (!file) {
      alert("Please upload a PDF resume");
      return;
    }

    if (!window.puter) {
      alert("Puter.js not loaded");
      return;
    }

    try {
      setLoading(true);

      const resumeText = await extractTextFromPDF(file);
      if (!resumeText.trim()) {
        alert("Could not extract text from resume");
        return;
      }

      const prompt = buildPrompt(resumeText);
      const response = await window.puter.ai.chat(prompt);
      const parsed = JSON.parse(response.message.content);

      setResult(parsed);
      await saveAnalysis(parsed);

    } catch (err) {
      console.error(err);
      alert("AI analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.Dashboard}>
      <div className={styles.DashboardLeft}>

        {/* HEADER */}
        <div className={styles.DashBoardHeader}>
          <div className={styles.DashboardHeaderTitle}>
            Smart Resume Screening
          </div>
          <div className={styles.DashboardHeaderLargeTitle}>
            Resume Match Score
          </div>
        </div>

        {/* INSTRUCTIONS */}
        <div className={styles.alertInfo}>
          <div>🔔 Important Instruction</div>
          <div className={styles.dashboardInstruction}>
            <div>🧷 Only PDF format (.pdf) resumes are accepted</div>
            <div>🤖 Resume will be analyzed using AI</div>
          </div>
        </div>

        {/* UPLOAD */}
        <div className={styles.DashboardUploadResume}>
          <div className={styles.DashboardResumeBlock}>
            <div>Upload Your Resume</div>

            {fileName && (
              <div style={{ marginTop: "10px", fontSize: "14px", color: "#1a7f37", fontWeight: "600" }}>
                ✅ {fileName}
              </div>
            )}
          </div>

          <div className={styles.DashboardInputField}>
            <label htmlFor='inputField' className={styles.analyzeAIBtn}>
              Upload Resume
            </label>
            <input
              type='file'
              accept='.pdf'
              id='inputField'
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* ANALYZE */}
        <div className={styles.jobDesc}>
          <div className={styles.AnalyzeBtn} onClick={handleAnalyze}>
            {loading ? "Analyzing..." : "Analyze"}
          </div>
        </div>

        {/* RESULT */}
        {result && (
          <div className={styles.resultBox}>
            <h2>Score: {result.overallScore}/100</h2>

            <h3>✅ Strengths</h3>
            <ul>{result.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>

            <h3>⚠️ Weaknesses</h3>
            <ul>{result.weaknesses.map((w, i) => <li key={i}>{w}</li>)}</ul>

            <h3>✍️ Spelling Mistakes</h3>
            <ul>{result.spellingMistakes.map((m, i) => <li key={i}>{m}</li>)}</ul>

            <h3>📖 Grammar Mistakes</h3>
            <ul>{result.grammarMistakes.map((g, i) => <li key={i}>{g}</li>)}</ul>
          </div>
        )}

      </div>
    </div>
  );
};

export default DashBoard;
