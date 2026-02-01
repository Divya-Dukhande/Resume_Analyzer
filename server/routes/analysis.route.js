import express from "express";
import { db } from "../config/db.js";

const router = express.Router();

router.post("/", (req, res) => {
    const d = req.body;
    db.query(
        "INSERT INTO analysis (overall_score,strengths,weaknesses,spelling_mistakes,grammar_mistakes) VALUES (?,?,?,?,?)",
        [
            d.overallScore,
            JSON.stringify(d.strengths),
            JSON.stringify(d.weaknesses),
            JSON.stringify(d.spellingMistakes),
            JSON.stringify(d.grammarMistakes)
        ],
        () => res.json({ success: true })
    );
});

router.get("/", (req, res) => {
    db.query("SELECT * FROM analysis ORDER BY created_at DESC", (e, r) => res.json(r));
});

export default router;
