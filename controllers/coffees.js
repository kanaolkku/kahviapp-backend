//our very hi-tech json file database
const fs = require("fs");
const coffeeRouter = require("express").Router();

coffeeRouter.get("/", (req, res) => {
  const coffeeData = JSON.parse(
    fs.readFileSync("coffees.json", { encoding: "utf-8" })
  );
  res.json(coffeeData);
});

coffeeRouter.post("/", (req, res) => {
  const body = req.body;
  const coffeeData = JSON.parse(
    fs.readFileSync("coffees.json", { encoding: "utf-8" })
  );

  coffeeData.push(body);

  fs.writeFileSync("coffees.json", JSON.stringify(coffeeData, null, 4));

  res.json({ message: "Coffee saved" });
});

module.exports = coffeeRouter;
