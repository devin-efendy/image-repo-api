require("dotenv").config();

const app = require("./App");

const port = process.env.PORT || 3000;

const { SetUp } = require("./src/AppController");

app.listen(port, SetUp);

module.exports = app;
