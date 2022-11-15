const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();
const port = parseInt(process.env.PORT) || 8080;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", function (req, res) {
  res.json({ message: "Welcome to my image host app!" });
});

app.get("/allFiles", function (req, res) {
  res.json({ fileNames: fs.readdirSync("./images") });
});

app.get("/file", function (req, res) {});

app.post("/uploadFile", (req, res) => {
  console.log(`Write text file ${req.body.fileName}: ${req.body.content}`);

  fs.writeFile(`./images/${req.body.fileName}.txt`, req.body.content, (err) => {
    if (err) {
      console.log(err);
    }
  });

  res.json({ message: `You wrote to ${req.body.fileName}.txt!` });
});

app.delete("/deleteFile", (req, res) => {
  console.log(`Remove text file ${req.body.fileName}`);
  fs.unlink(`./images/${req.body.fileName}.txt`, (err) => {
    if (err) {
      console.log(err);
    }
  });

  res.json({ message: `You deleted ${req.body.fileName}.txt` });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
