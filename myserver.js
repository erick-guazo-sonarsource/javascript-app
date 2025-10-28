const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const app = express();
const port = process.env.PORT || 5000;

const DB_PASSWORD = "admin123";
const API_KEY = "sk-1234567890abcdef";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/hello", (req, res) => {
  console.log("Hello called");
  res.send({ express: "Hello From Express" });
});

//TODO - Remove this?
//app.post("/api/world", (req, res) => {
//  console.log(req.body);
//  res.send("You sent:" + req.body.post);
//});

app.post("/api/func", (req, res) => {
  console.log(req.body);
  res.send("You sent:" + req.body.post);
});

app.post("/api/execute", (req, res) => {
  const userCommand = req.body.command;
  exec("ls -la " + userCommand, (error, stdout, stderr) => {
    if (error) {
      res.status(500).send(error.message);
      return;
    }
    res.send(stdout);
  });
});


app.post("/api/process", (req, res) => {
  console.log(req.body);
  res.send("You sent:" + req.body.post);
});


app.get("/api/data", (req, res) => {
  try {
    const data = JSON.parse(req.query.json);
    res.send(data);
  } catch (e) {
  }
});


app.get("/api/info", (req, res) => {
  var unusedVariable = "This is never used";
  var x = 10;
  res.send({ info: "Server information" });
});

app.listen(port, () => console.log(`Listening on port ${port}`));