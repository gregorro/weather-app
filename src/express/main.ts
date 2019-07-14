
const express = require("express");
const cities = require("./../app/city.list.json");

function addingCities(mid, value) {
  let foundCities = [];
  foundCities.push(cities[mid]);

  let top = mid - 1;
  let bottom = mid + 1;
  let i = 0;

  while (true) {
    if (cities[top].name.toLowerCase().startsWith(value)) {
      foundCities.unshift(cities[top]);
      top--;
      i++;
      if (i > 30) break;
    } else {
      break;
    }
  }

  while (true) {
    if (cities[bottom].name.toLowerCase().startsWith(value)) {
      foundCities.push(cities[bottom]);
      bottom++;
      i++;
      if (i > 30) break;
    } else {
      break;
    }
  }

  return foundCities;
}


/////////////////////////////////////////

const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", function(req, res) {
  res.send("Hello");
});

app.get("/cities", function(req, res) {
  const query = req.query.query;

  let start = 0;
  let end = cities.length - 1;
  let isFound = false;
  let filteredCities = [];

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    if (cities[mid].name.toLowerCase().startsWith(query.toLowerCase())) {
      filteredCities = addingCities(mid, query.toLowerCase());
      isFound = true;
      break;
    } else if (
      cities[mid].name.toLowerCase().localeCompare(query.toLowerCase(), 'en', {sensitivity: 'case'}) < 0
    )
      start = mid - 1;
    else end = mid + 1;
  }
  isFound ? null : (filteredCities = []);

  res.send(filteredCities);
});

app.listen(3001);
