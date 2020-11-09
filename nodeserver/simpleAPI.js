const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();


app.get("/api/profiles", (_, res) => {
  console.log(path.join(__dirname, "..", "models", "profiles.json"));
  fs.readFile(
    path.join(__dirname, "..", "models", "profiles.json"),
    "utf8",
    (_, data) => {
      console.log(data);
      res.end(data);
    }
  );
});


app.get("/api/profiles/:id", (req, res) => {
  const data = fs.readFile(
    path.join(__dirname, "..", "models", "profiles.json"),
    "utf8",
    (err, data) => {
      if (err) throw err;
      return data;
    }
  );
  res.setHeader("Content-Type", "application/json");
  let profiles = JSON.parse(data);
  let profile = profiles["profile" + req.params.id];
  if (profile) {
    console.log(profile);
    res.end(JSON.stringify(profile));
  } else {
    res.status(404).send("Error, profile not found");
  }
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());

app.put("/api/profiles", (req, res) => {
  let newProfile = JSON.stringify(req.body);
  fs.appendFile("newProfile.txt", "text", "utf8", (err, data) => {
    console.log(req.body);
    if (err) throw err;
    res.send("Data received, thank you!");
  });

});
app.listen(3000, () => {
  console.log("Node server is running http://localhost:3000 ...");
});