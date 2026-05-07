const { Pool } = require("pg");
require("dotenv").config();

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

db.connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) => console.log("Database connection failed:", err));

module.exports = db;

db.query(`
  CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT false
  )
`)
  .then(() => console.log("Tasks table ready"))
  .catch((err) => console.log("Table creation failed:", err));

