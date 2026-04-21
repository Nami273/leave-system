require("dotenv").config();
const mysql = require("mysql2/promise");
const pool = mysql.createPool({
  host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_NAME,
});
async function run() {
  try {
    const [rows] = await pool.query('SHOW CREATE TABLE users');
    console.log(rows[0]['Create Table']);
  } catch(e) {
    console.error(e);
  } finally {
    process.exit();
  }
}
run();
