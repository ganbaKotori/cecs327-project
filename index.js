const fetch = require("node-fetch");
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", async function(req, res) {
  var api = "311";
  var url;

  switch (api) {
    case "311":
      url =
        "https://data.cityofchicago.org/resource/v6vf-nfxy.json?$where=created_date%20between%20%272020-02-01T12:00:00%27%20and%20%272020-02-08T14:00:00%27&sr_short_code=SDW";
      console.log("Retrieving 311 data");
      break;
    case "traffic":
      url =
        "https://data.cityofchicago.org/resource/85ca-t3if.json?$where=crash_date%20between%20%272020-02-01T12:00:00%27%20and%20%272020-02-08T14:00:00%27";
      console.log("Retrieving traffic data");
      break;
    default:
  }

  fetch(url)
    .then(res => res.json())
    .then(data => {
      res.send({ data });
    })
    .catch(err => {
      res.send(err);
    });
});

port = 3000;
var server = app.listen(port, function() {
  // go to http://localhost:3000
  console.log(`Server listening on port ${port}`);
});
