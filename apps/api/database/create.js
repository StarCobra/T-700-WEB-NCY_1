import mariadb from "mariadb";

export async function createDatabase() {
  // Create a connection to the MySQL server
  const connection = mariadb.createPool({
    host: "mariadb.count-of-money.local",
    user: "root",
    password: "root",
    database: "count-of-money",
  });

  try {
    // Get a connection from the pool
    connection = await pool.getConnection();

    // Perform database operations here...

    console.log("Connected to MariaDB!");
  } catch (err) {
    console.error("Error connecting to MariaDB:", err);
  } finally {
    if (connection) {
      // Release the connection back to the pool
      connection.release();
    }
  }
}
