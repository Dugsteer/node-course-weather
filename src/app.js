const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { runInNewContext } = require("vm");
const geocode = require("../utils/geocode");
const forecast = require("../utils/forecast");

console.log(__dirname);
console.log(path.join(__dirname, "../public"));

const app = express();
const port = process.env.PORT || 3000;

// Defining paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Dug Steer",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Moi",
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Jimmington",
    message: "I'm afraid you're on your own",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(req.query.address, (error, { longitude, latitude, place } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(longitude, latitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        place,
        address: req.query.address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help Error",
    error: "Ain't no help frit",
    name: "Jimming",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "General Error",
    error: "That page don't not exist nowise",
    name: "ton",
  });
});

app.listen(port, () => {
  console.log("Server is up up up on port " + port);
});
