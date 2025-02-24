const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Welcome to the REST API!");
  //send back index.html
});

app.get("/api/shops", (req, res) => {
  res.send({ name: "my shop", address: "something" });
  //send all the json objects
});

// app.get("/api/shop/:id", (req, res) => {

//     res.send({ name: "my shop", address: "something" });
//     //send all the json objects
//   });

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
