const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const path = require("path");

const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../template/views");

app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.static(staticPath));

app.get("/", (req, res) => {
  res.render("userlogin");
});

app.get("/signup", (req, res) => {
  res.render("usersignup");
});

app.get("/adminregister", (req, res) => {
  res.render("adminsignup");
});

app.get("/shops", (req, res) => {
  res.render("shops");
});


app.listen(port, () => {
    console.log("listening");
  });
  