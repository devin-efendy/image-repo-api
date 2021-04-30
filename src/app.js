const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello express!");
});

app.get("/search", (req, res) => {
  response = {
    name: "test",
    image: [1, 2, 3, 4, 5],
  };

  res.json(response);
});

app.get("*", (req, res) => {
  res.status(404).send("Not found");
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
