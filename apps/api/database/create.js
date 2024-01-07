import mariadb from "mariadb";

export async function createDatabase() {
  // Create a connection to the MySQL server
  const pool = mariadb.createPool({
    host: "mariadb",
    user: "root",
    password: "root",
    database: "count-of-money",
  });

  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();
    console.log("Connected to MariaDB!");
    connection.release();
  } catch (err) {
    console.error("Error connecting to MariaDB:", err);
  }

  return pool;
}
