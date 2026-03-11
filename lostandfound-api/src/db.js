const { Pool } = require("pg");
require("dotenv").config();
//pool is like a manager: whenever your backend needs to talk to the database, it asks the pool to get a connection.
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

module.exports = pool;