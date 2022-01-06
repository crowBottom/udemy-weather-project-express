const express = require("express");
const axios = require("axios");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post("/", (req, res) => {
  const query = req.body.cityName;
  const apiKey = "68ecb7254aa07165df1e00dad6dcda01";
  const units = "imperial"
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${units}&appid=${apiKey}`;
  https.get(url, (response) => {
    console.log(response.statusCode)
    response.on("data", (data) => {
      //console.log(data);
      const weatherData = JSON.parse(data)
      const city = weatherData.name;
      const main = weatherData.weather[0].main;
      const description = weatherData.weather[0].description;
      const temp = weatherData.main.temp;
      const real_feel = weatherData.main.feels_like;
      const img = weatherData.weather[0].icon;
      res.send(
        `<html>` +
          `<head>` +
            `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">` +
          `</head>` +
          `<body>` +
              `<div class="w3-container w3-margin">` +
                  `<div class="w3-card-4 w3-margin">` +
                      `<div class="w3-margin">` +
                          `<div><h1>${city} weather</h1></div>` +
                          `<div class="w3-cell"><h2>current conditions</h2></div>` +
                          `<div class="w3-cell">` +
                              `<img src="http://openweathermap.org/img/wn/${img}@2x.png" >` +
                          `</div>` +
                          `<div><h3>${description}</h3></div>` +
                          `<div><h3>${temp}</h3></div>` +
                          `<div><h3>Real Feel: ${real_feel}</h3></div>` +
                      `</div>` +
                  `</div>` +
              `</div>` +
          `</body>` +
        `<html>`
      )
    })
  });

})



app.listen(3000, () => {
  console.log("Server running on 3000");
})
