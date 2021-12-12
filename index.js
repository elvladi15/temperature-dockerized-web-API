const express = require("express");
const app = express();
const { SCALES, Temperature } = require("elvladi15-temperature-converter");

app.get("/api/:number/:start_scale/to/:final_scale", (req, res) => {
  let { number, start_scale, final_scale } = req.params;

  number = parseFloat(number);
  if (typeof number !== "number" || isNaN(number)) {
    res.status(400).json("number parameter is not of type number");
  }
  let temperature;
  if (start_scale === "c") {
    temperature = new Temperature(number, SCALES.CELCIUS);
  } else if (start_scale === "f") {
    temperature = new Temperature(number, SCALES.FAHRENHEIT);
  } else if (start_scale === "k") {
    temperature = new Temperature(number, SCALES.KELVIN);
  } else {
    res.status(400).json("Start scale parameter must be c, f or k");
  }
  let result;
  try {
    if (final_scale === "c") {
      result = Temperature.toCelcius(temperature);
    } else if (final_scale === "f") {
      result = Temperature.toFahrenheit(temperature);
    } else if (final_scale === "k") {
      result = Temperature.toKelvin(temperature);
    } else {
      res.status(400).json("Final scale parameter must be c, f or k");
    }
  } catch (err) {
    res.status(400).json("Cannot convert from one scale to the same one.");
  }
  res.status(200).json({ result });
});
app.get("*", (req, res) => {
  res
    .status(400)
    .json(
      "Syntax error. The url structure must be http://localhost:8000/api/{number}/{start-scale}/to/{final-scale}"
    );
});

app.listen(8000, () => {
  console.log("Server running on port 8000!");
});
