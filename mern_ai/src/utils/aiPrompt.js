export const buildPrompt = (resumeText) => `
You are a resume screening and English language expert.

Analyze ONLY the following resume content:

${resumeText}

Evaluate:
1. Overall resume quality
2. Strengths
3. Weaknesses
4. Spelling mistakes
5. Grammar mistakes

Return ONLY valid JSON in this format:
{
  "overallScore": 80,
  "strengths": [],
  "weaknesses": [],
  "spellingMistakes": [],
  "grammarMistakes": []
}
`;
