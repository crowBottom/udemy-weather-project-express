const express = require("express");
const axios = require("axios");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

// use the from to enter a city
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

//post the data to the api and use res data to display info
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
          `<div class="w3-margin" style="max-width:50% ;min-width: 40%;">` +
            `<div class="w3-container w3-border w3-round w3-margin w3-padding w3-blue">` +
              `<h3>Simple Weather App</h3>` +
              `<form class="w3-form" action="/" method="post">` +
                `<input id="cityInput" name="cityName" placeholder="enter city name">` +
                `<div class="w3-btn w3-ripple w3-right" type="submit" name="submit">Go</div>` +
              `</form>` +
            `</div>` +
            `<div class="w3-card-4 w3-margin" style=" background: linear-gradient(to bottom right, #33ccff 0%, #000099 100%);">` +
              `<div class="w3-margin">` +
                  `<h3>${city}</h3>` +
                  '<hr>' +
                  `<h5><h3>${description}</h3></h5>` +
                  `<img src="http://openweathermap.org/img/wn/${img}@2x.png" >` +
                  '<hr>' +
                  `<h5>Temp: ${temp}&#176; </h5>` +
                  `<div class="w3-small">Feels like: ${real_feel}&#176;</div>` +
              `</div>` +
            `</div>` +
          `</div>` +
          `</body>` +
        `<html>`
      )
    })
  });

})



app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on 3000");
})
