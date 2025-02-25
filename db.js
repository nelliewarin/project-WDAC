const fs = require("fs");
const path = require("path");

const { Client } = require("pg");
// Configure the client to connect to your containerized PostgreSQL

const client = new Client({
  host: "localhost", // since the container's port is mapped to localhost
  port: 5432,
  user: "postgres", // default user
  password: "12345", // password set in the container command
  database: "postgres", // default database
});

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to PostgreSQL database with async/await");
  } catch (err) {
    console.error("Connection error", err.stack);
  }
}

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

async function selectRecords() {
  const selectQuery = "SELECT * FROM stores;";
  try {
    const res = await client.query(selectQuery);
    console.log("All stores:", res.rows);
  } catch (err) {
    console.error("Error selecting records", err.stack);
  }
}

// async function getIDByURL(url) {
//   const selectQuery = "SELECT id FROM stores WHERE url = $1;";
//   try {
//     const res = await client.query(selectQuery, [url]);
//     return res.rows[0].id;
//   } catch (err) {
//     console.error("Error getting ID", err.stack);
//   }
// }
// getIDByURL("urlSWAG").then((id) => {
//   console.log("ID:", id);
// });

// function updateRecord(updateValues) {
//   const updateQuery = `
//     UPDATE stores
//     SET name = $1, url = $2, district = $3
//     WHERE id = $4
//     RETURNING *;
//     `;
//   client
//     .query(updateQuery, updateValues)
//     .then((res) => console.log("Updated record:", res.rows[0]))
//     .catch((err) => console.error("Error updating record", err.stack));
// }

// getIDByURL("url").then((id) => {
//   console.log("ID:", id);
//   updateRecord(["Tilde", "honarking.se", "dinmamma", id]);
// });

connectDB();
createTable();
// insertRecordsFromFile("stores.json");
selectRecords();

//enter container: docker exec -it my-postgres-container bash
//connect database: psql postgresql://postgres:12345@127.0.0.1:5432/postgres
// delete table: DROP TABLE IF EXISTS stores;
