import mysql from "mysql";

export async function createDatabase() {
    // Create a connection to the MySQL server
    const connection = mysql.createConnection({
        host: 'database',
        user: 'root',
        password: 'root',
        database: 'CountOfMoney',
    });

    // Connect to MySQL
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL:', err);
            return;
        }
        console.log('Connected to MySQL!');
    });

    // Close the MySQL connection
    connection.end();
}
