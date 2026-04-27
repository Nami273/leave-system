const mysql = require('mysql2/promise');

async function update() {
  const conn = await mysql.createConnection({ user: 'root', database: 'leave_v7' });
  await conn.execute("UPDATE roles SET description = 'As an Employee, {name} can submit leave requests, view their personal leave balances, and track their request history.' WHERE name = 'Employee'");
  await conn.execute("UPDATE roles SET description = 'As a Manager, {name} can review and approve leave requests for their team, view team capacity, and access team-level reports.' WHERE name = 'Manager'");
  await conn.execute("UPDATE roles SET description = 'As an HR, {name} can manage employee records, configure leave balances, view organization-wide reports, and oversee the entire leave process.' WHERE name = 'HR'");
  await conn.execute("UPDATE roles SET description = 'As a Super Admin, {name} has full system access including managing user accounts, departments, and system configurations.' WHERE name = 'Super Admin'");
  console.log("Done");
  process.exit(0);
}
update();
