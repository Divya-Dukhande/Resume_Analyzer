import { db } from "../config/db.js";

// REGISTER
export const registerUser = (req, res) => {
    const { name, email, password } = req.body;

    const checkQuery = "SELECT * FROM users WHERE email = ?";
    db.query(checkQuery, [email], (err, result) => {
        if (err) {
            console.log("CHECK ERROR:", err);
            return res.status(500).json({ message: "DB error" });
        }

        if (result.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        const insertQuery =
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

        db.query(insertQuery, [name, email, password], (err) => {
            if (err) {
                console.log("INSERT ERROR:", err);
                return res.status(500).json({ message: "Insert failed" });
            }

            res.status(201).json({ message: "Registration successful" });
        });
    });
};

// LOGIN
export const loginUser = (req, res) => {
    const { email, password } = req.body;

    const query =
        "SELECT * FROM users WHERE email = ? AND password = ?";

    db.query(query, [email, password], (err, result) => {
        if (err) {
            console.log("LOGIN ERROR:", err);
            return res.status(500).json({ message: "DB error" });
        }

        if (result.length === 0) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.json({
            message: "Login successful",
            user: result[0],
            token: "dummy-token",
        });
    });
};
