//our very hi-tech json file database
const fs = require("fs");
const coffeeRouter = require("express").Router();

const isNumeric = (val) => {
  return /^\d*\.?\d*$/.test(val);
};

const validateNumericFields = (fields) => {
  let isValid = true;
  fields.forEach((field) => {
    if (!isNumeric(field) || field.length === 0) {
      isValid = false;
    }
  });
  return isValid;
};

coffeeRouter.get("/", (req, res) => {
  const coffeeData = JSON.parse(
    fs.readFileSync("coffees.json", { encoding: "utf-8" })
  );
  res.json(coffeeData);
});

coffeeRouter.post("/", (req, res) => {
  const { name, weight, price, roast } = req.body;

  if (validateNumericFields([weight, price, roast])) {
    //get coffee data from the file
    const coffeeData = JSON.parse(
      fs.readFileSync("coffees.json", { encoding: "utf-8" })
    );
    //add new coffee to the list
    coffeeData.push({ name, weight, price, roast });
    //send new list back to the file
    fs.writeFileSync("coffees.json", JSON.stringify(coffeeData, null, 4));
    // send succesfful response
    res.json({ message: "Coffee saved" });
  } else {
    //send error
    res.status(403).json({ message: "invalid fields" });
  }
});

module.exports = coffeeRouter;
