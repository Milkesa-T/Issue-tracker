const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all issues
router.get("/", (req, res) => {
  const sql = `
    SELECT id, title, description, priority, status, created_at
    FROM issues
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to fetch issues" });
    }
    res.json(results);
  });
});

// CREATE new issue
router.post("/", (req, res) => {
  const { title, description, priority } = req.body;

  if (!title || !priority) {
    return res.status(400).json({ message: "Title and priority required" });
  }

  const sql = `
    INSERT INTO issues (title, description, priority, status)
    VALUES (?, ?, ?, 'open')
  `;

  db.query(sql, [title, description, priority], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to create issue" });
    }

    res.status(201).json({
      id: result.insertId,
      title,
      description,
      priority,
      status: "open",
      created_at: new Date()
    });
  });
});

module.exports = router;
