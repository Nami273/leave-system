require("dotenv").config();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function run() {
  try {
    // 1. Recreate departments table with correct constraints
    await pool.query(`DROP TABLE IF EXISTS hr_departments`);
    await pool.query(`ALTER TABLE users DROP FOREIGN KEY fk_users_department`).catch(() => {});
    await pool.query(`ALTER TABLE users DROP COLUMN department_id`).catch(() => {});
    await pool.query(`DROP TABLE IF EXISTS departments`);

    await pool.query(`
      CREATE TABLE departments (
        id CHAR(36) NOT NULL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        is_active TINYINT(1) DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log("Created departments table.");

    // 2. Insert unstructured "HQ" or default department as fallback
    const defaultDeptId = require("crypto").randomUUID();
    await pool.query(`
      INSERT INTO departments (id, name, is_active) 
      VALUES (?, 'Default Department', 1)
    `, [defaultDeptId]);
    console.log("Inserted Default Department.");

    // 3. Add department_id to users
    await pool.query(`
      ALTER TABLE users 
      ADD COLUMN department_id CHAR(36) DEFAULT NULL
    `);
    
    // Set default department for existing users
    await pool.query(`UPDATE users SET department_id = ?`, [defaultDeptId]);

    // Now add foreign key constraint
    await pool.query(`
      ALTER TABLE users
      ADD CONSTRAINT fk_users_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
    `);
    console.log("Added department_id to users table.");

    // 4. Create hr_departments table
    await pool.query(`
      CREATE TABLE hr_departments (
        user_id CHAR(36) NOT NULL,
        department_id CHAR(36) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (user_id, department_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log("Created hr_departments table.");
    
    console.log("Migration for departments completed successfully.");
  } catch(e) {
    console.error("Migration error:", e);
  } finally {
    process.exit();
  }
}

run();
