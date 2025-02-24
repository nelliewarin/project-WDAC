const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

//index.html (public folder) is displayed at http://localhost:3000
app.use("/", express.static("public"));

// REST API
app.get("/api/shops", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "stores.json"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
