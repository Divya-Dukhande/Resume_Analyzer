import mysql from "mysql2";

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "gnims",
    database: "resume_db"
});

db.connect((err) => {
    if (err) {
        console.error(" MySQL connection failed:", err.message);
    } else {
        console.log(" MySQL connected successfully");
    }
});