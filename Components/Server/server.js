var express = require("express");
var app = express();
const conn = require("./mongoConnections");

const CompanyListDBTest = conn.CompanyListDBTest;
const CustomerLoginDBTest = conn.CustomerLoginDBTest;

app.post("/getRewards", function (req, res) {
  if (req.query.name) {
    const CustomerDBTest = conn.getCustomerDb(req.query.name);
    CustomerDBTest.find({}, function (err, docs) {
      if (err) console.log(err);
      else {
        console.log(docs);
        res.send(docs);
      }
    });
  }
});

app.post("/login", function (req, res) {
  // console.log("Searching...");
  CustomerLoginDBTest.findOne({ UserID: req.query.name }, function (err, docs) {
    if (err) console.log(err);
    else {
      if (docs.PasswordHash === req.query.pass) res.send(false);
      else res.send("Username or Password incorrect.");
      // res.send(docs);
    }
  });
});

app.post("/", function (req, res) {
  res.send("Hello world!");
});
console.log("App running on port 3000!");
app.listen(3000);
