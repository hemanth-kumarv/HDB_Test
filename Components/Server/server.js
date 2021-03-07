var express = require("express");
var app = express();
var cors = require("cors");
var multer = require("multer");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const conn = require("./mongoConnections");

const CompanyListDBTest = conn.CompanyListDBTest;
const CustomerLoginDBTest = conn.CustomerLoginDBTest;
const CustomerRewardsDBTest = conn.CustomerRewardsDBTest;

app.post("/getRewards", function (req, res) {
  if (req.body.name) {
    CustomerRewardsDBTest.findOne(
      { Email: req.body.name },
      function (err, docs) {
        if (err) {
          console.log(err);
          res.send("Error connecting to database.");
        } else {
          res.send(docs.RewardList);
        }
      }
    );
  }
});

app.post("/login", function (req, res) {
  CustomerLoginDBTest.findOne({ UserID: req.body.name }, function (err, docs) {
    if (err) {
      res.send("Error connecting to database.");
    } else if (docs === null) {
      res.send("Username or Password incorrect.");
    } else {
      if (docs.PasswordHash === req.body.pass) res.send(false);
      else res.send("Username or Password incorrect.");
      // res.send(docs);
    }
  });
});

var upload = multer({ dest: "uploads/" });

app.post("/bla", async (req, res) => {
  var avatar = req.body.img;
  console.log(req.body);
  upload.single(avatar.path)

  res.send({
    status: true,
    message: "File is uploaded.",
    data: {
      name: avatar.path,
      mimetype: avatar.mime,
      size: avatar.size,
    },
  });
});

app.post("/", function (req, res) {
  res.send("Hello world!");
});
console.log("App running on port 3000!");
app.listen(3000);
