const { client, connectDB } = require("./db");
const express = require("express");
//const path = require("path");
const app = express();
const PORT = 3000;

connectDB();

//index.html (public folder) is displayed at http://localhost:3000
app.use("/", express.static("public"));

// Connect to stores.json
// app.get("/api/stores", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "stores.json"));
// });

app.get("/api/stores", async (req, res) => {
  try {
    const dbres = await client.query(
      "SELECT data->>'name' AS name, data->>'url' AS url FROM stores;"
    );
    console.log("All stores:", dbres.rows);
    res.json(dbres.rows);
  } catch (err) {
    console.error("Error selecting records", err.stack);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
