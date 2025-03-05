const { client, connectDB } = require("./db");
const express = require("express");
const app = express();
const PORT = 3000;

connectDB();

app.use("/", express.static("public"));

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
