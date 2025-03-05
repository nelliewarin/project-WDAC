const fs = require("fs");
const path = require("path");

const { Client } = require("pg");
// Configure the client to connect to your containerized PostgreSQL

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "12345",
  database: "postgres", 
});

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to PostgreSQL database with async/await");
  } catch (err) {
    console.error("Connection error", err.stack);
  }
}

module.exports = { client, connectDB };

function createTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS stores (
    id SERIAL PRIMARY KEY,
    data JSON NOT NULL
    ); 
    `;
  client
    .query(createTableQuery)
    .then(() => console.log('Table "stores" created or already exists'))
    .catch((err) => console.error("Error creating table", err.stack));
}

async function insertRecordsFromFile(filename) {
  const filePath = path.join(__dirname, "public", filename);

  try {
    const data = await fs.promises.readFile(filePath, "utf8");
    const jsonObjects = JSON.parse(data);

    // Inserts every objects in the stores-table
    for (let jsonObject of jsonObjects) {
      const insertQuery = `
          INSERT INTO stores (data)
          VALUES ($1)
          RETURNING *;
        `;
      const jsonString = JSON.stringify(jsonObject);
      const res = await client.query(insertQuery, [jsonString]);
      console.log("Inserted record:", res.rows[0]);
    }
  } catch (err) {
    console.error("Error reading or inserting records", err.stack);
  }
}

// Logs all contents from stores table
async function selectRecords() {
  const selectQuery = "SELECT * FROM stores;";
  try {
    const res = await client.query(selectQuery);
    console.log("All stores:", res.rows);
  } catch (err) {
    console.error("Error selecting records", err.stack);
  }
}

connectDB();
createTable();
// insertRecordsFromFile("stores.json");
// selectRecords();

// Commands for the terminal
//enter container: docker exec -it my-postgres-container bash
//connect database: psql postgresql://postgres:12345@127.0.0.1:5432/postgres
// delete table: DROP TABLE IF EXISTS stores;
