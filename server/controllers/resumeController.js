const fs = require("fs");
const pdf = require("pdf-parse");
const db = require("../config/db");

function uploadResume(req, res) {
    const dataBuffer = fs.readFileSync(req.file.path);

    pdf(dataBuffer).then(data => {
        const text = data.text;

        // AI simulation (replace with Puter/OpenAI later)
        const analysis = `
Strengths: Good technical skills
Weaknesses: Formatting issues
Grammar: Minor mistakes
Suggestions: Improve alignment
`;
        const score = Math.floor(Math.random() * 20) + 70;

        db.query(
            "INSERT INTO resumes(user_id, analysis, score) VALUES (?,?,?)",
            [req.user.id, analysis, score]
        );

        res.json({ analysis, score });
    });
}

module.exports = { uploadResume };
