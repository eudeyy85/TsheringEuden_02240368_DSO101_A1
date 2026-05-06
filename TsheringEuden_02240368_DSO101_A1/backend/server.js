const db = require("./db");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Test route
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Get all tasks
app.get("/tasks", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM tasks ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const { title } = req.body;
    const result = await db.query(
      "INSERT INTO tasks (title) VALUES ($1) RETURNING *",
      [title]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const { title, completed } = req.body;
    const { id } = req.params;

    const result = await db.query(
      "UPDATE tasks SET title = $1, completed = $2 WHERE id = $3 RETURNING *",
      [title, completed, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM tasks WHERE id = $1", [id]);

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});
