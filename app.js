const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const coffeesRouter = require("./controllers/coffees");

//enable cors
app.use(cors());
// automatically parses .json responses
app.use(express.json());
app.use(express.static("public"));
// enable coffee router from the controller
app.use("/api/coffees", coffeesRouter);
// returns the react app
app.get("/", (req, res) => {
  res.sendFile("index.html", {
    root: path.join(__dirname, "./build/"),
  });
});

module.exports = app;
