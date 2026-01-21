const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function getTables() {
  const res = await pool.query(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
  `);
  console.log(res.rows);
}

pool.on("connect", () => {
  getTables();
  console.log("✅ Connected to PostgreSQL");
});

module.exports = pool;
