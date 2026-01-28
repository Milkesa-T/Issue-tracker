const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());
// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123", 
  database: "issue_tracker"
});

db.connect(err => {
  if (err) {
    console.error("DB connection failed:", err);
    return;
  }
  console.log("✅ MySQL connected");
});

// GET all issues
app.get("/issues", (req, res) => {
  db.query("SELECT * FROM issues ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// CREATE issue
app.post("/issues", (req, res) => {
  const { title, description, priority, status } = req.body;
  const sql =
    "INSERT INTO issues (title, description, priority, status) VALUES (?, ?, ?, ?)";
  db.query(sql, [title, description, priority, status], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({
      id: result.insertId,
      title,
      description,
      priority,
      status
    });
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
