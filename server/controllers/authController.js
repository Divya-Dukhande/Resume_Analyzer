const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function register(req, res) {
    const { name, email, password } = req.body;
    const hash = bcrypt.hashSync(password, 10);

    db.query(
        "INSERT INTO users(name,email,password) VALUES (?,?,?)",
        [name, email, hash],
        err => {
            if (err) return res.status(400).json({ msg: "User exists" });
            res.json({ msg: "Registered" });
        }
    );
}

function login(req, res) {
    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email=?", [email], (err, result) => {
        if (!result.length) return res.status(404).json({ msg: "User not found" });

        const valid = bcrypt.compareSync(password, result[0].password);
        if (!valid) return res.status(401).json({ msg: "Wrong password" });

        const token = jwt.sign({ id: result[0].id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.json({ token });
    });
}

module.exports = { register, login };
