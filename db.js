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
    name VARCHAR(50),
    url VARCHAR(255) UNIQUE,
    district VARCHAR(50)
    ); 
    `;
  client
    .query(createTableQuery)
    .then(() => console.log('Table "stores" created or already exists'))
    .catch((err) => console.error("Error creating table", err.stack));
}

const insertValues = ["NameOfStore", "urlSWAG?", "District"];
function insertRecord(insertValues) {
  const insertQuery = `
    INSERT INTO stores (name, url, district)
    VALUES ($1, $2, $3)
    RETURNING *;
    `;
  client
    .query(insertQuery, insertValues)
    .then((res) => console.log("Inserted record:", res.rows[0]))
    .catch((err) => console.error("Error inserting record", err.stack));
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
// insertRecord(insertValues);
selectRecords();
