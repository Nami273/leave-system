const pool = require('./src/db');
async function run() {
  const [rows] = await pool.query("SHOW COLUMNS FROM leave_types");
  console.log(rows);
  process.exit(0);
}
run();
