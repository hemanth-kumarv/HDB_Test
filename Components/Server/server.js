var express = require("express");
var fs = require("fs");
var app = express();
var cors = require("cors");
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const conn = require("./mongoConnections");

const CompanyListDBTest = conn.CompanyListDBTest;
const CustomerLoginDBTest = conn.CustomerLoginDBTest;
const CustomerRewardsDBTest = conn.CustomerRewardsDBTest;
const CustomerDetailsDBTest = conn.CustomerDetailsDBTest;

app.post("/getRewards", function (req, res) {
  if (req.body.name) {
    CustomerRewardsDBTest.findOne({ Email: req.body.name }, (err, docs) => {
      if (err) {
        console.log(err);
        res.send({ status: false, message: "Error connecting to database." });
      } else {
        res.send({ Rewards: docs.RewardList, Total: docs.Total, status: true });
      }
    });
  }
});

app.post("/login", function (req, res) {
  CustomerLoginDBTest.findOne({ UserID: req.body.name }, function (err, docs) {
    if (err) {
      res.send({ status: false, message: "Error connecting to database." });
    } else if (docs === null) {
      res.send({ status: false, message: "Username or Password incorrect." });
    } else {
      if (docs.PasswordHash === req.body.pass) {
        CustomerDetailsDBTest.findOne({ Email: req.body.name }, (err, docs) => {
          if (err) {
            res.send({
              status: false,
              message: "Error connecting to database.",
            });
          } else res.send({ status: true, data: docs });
        });
      } else
        res.send({ status: false, message: "Username or Password incorrect." });
      // res.send(docs);
    }
  });
});

// app.post("/uploadImage", async (req, res) => {
//   var image = req.body.img;
//   var buffer = Buffer.from(image, "base64");
//   fs.writeFileSync("test.jpg", buffer);
//   res.send({
//     status: true,
//     message: "File is uploaded.",
//   });
// });

app.post("/registerPage3", (req, res) => {
  CustomerDetailsDBTest.updateOne(
    { Email: req.body.email },
    { ProfilePicture: req.body.image },
    (err, result) => {
      if (err) {
        res.send("Error connecting to database.");
      } else {
        res.send({ status: true });
      }
    }
  );
});

app.post("/getAvailableAds", (req, res) => {
  CompanyListDBTest.find({}, function (err, docs) {
    if (err) {
      console.log(err);
      res.send("Error connecting to database.");
    } else {
      res.send(docs);
    }
  });
});

app.post("/", function (req, res) {
  res.send("Hello world!");
});
console.log("App running on port 3000!");
app.listen(3000);
