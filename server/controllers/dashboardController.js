const db = require("../config/db");

function getDashboard(req, res) {
    db.query(
        "SELECT * FROM resumes WHERE user_id=?",
        [req.user.id],
        (err, data) => {
            res.json(data);
        }
    );
}

module.exports = { getDashboard };
