var express = require("express");
var fs = require("fs");
var app = express();
var cors = require("cors");
var ip = require("ip");
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const conn = require("./mongoConnections");

const CompanyListDBTest = conn.CompanyListDBTest;
const CustomerLoginDBTest = conn.CustomerLoginDBTest;
const CustomerRewardsDBTest = conn.CustomerRewardsDBTest;
const CustomerDetailsDBTest = conn.CustomerDetailsDBTest;
const TransactionHistoryTest = conn.TransactionHistoryTest;

app.post("/getRewards", (req, res) => {
  try {
    if (req.body.name) {
      CustomerRewardsDBTest.findOne({ Email: req.body.name }, (err, docs) => {
        if (err) {
          console.log(err);
          res.send({ status: false, message: "Error connecting to database." });
        } else {
          // CustomerRewardsDBTest.aggregate([
          //   {
          //     $project: {
          //       _id: 0,
          //       Email: 1,
          //       total: { $sum: "$RewardList.Reward" },
          //       totalTime: { $sum: "$RewardList.Duration" },
          //       size: { $size: "$RewardList" },
          //     },
          //   },
          // ]).exec((err, docs) => {
          //   if (err) console.log(err);
          //   else console.log(docs);
          // });
          res.send({
            Rewards: docs.RewardList,
            Total: docs.Total,
            status: true,
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", (req, res) => {
  try {
    CustomerLoginDBTest.findOne({ UserID: req.body.name }, (err, docs) => {
      if (err) {
        res.send({ status: false, message: "Error connecting to database." });
      } else if (docs === null) {
        res.send({ status: false, message: "Username or Password incorrect." });
      } else {
        if (docs.PasswordHash === req.body.pass) {
          CustomerDetailsDBTest.findOne(
            { Email: req.body.name },
            (err, docs) => {
              if (err) {
                res.send({
                  status: false,
                  message: "Error connecting to database.",
                });
              } else res.send({ status: true, data: docs });
            }
          );
        } else
          res.send({
            status: false,
            message: "Username or Password incorrect.",
          });
        // res.send(docs);
      }
    });
  } catch (error) {
    console.log(error);
  }
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
  try {
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
  } catch (error) {
    console.log(error);
  }
});

app.post("/getAvailableAds", (req, res) => {
  try {
    CompanyListDBTest.find({}, (err, docs) => {
      if (err) {
        console.log(err);
        res.send("Error connecting to database.");
      } else {
        res.send(docs);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/getPreviousTransactions", (req, res) => {
  try {
    TransactionHistoryTest.findOne({ Email: req.body.email }, (err, docs) => {
      if (err) {
        console.log(err);
        res.send("Error connecting to database.");
      } else {
        res.send(docs);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});
console.log("App running on",ip.address()+":3000");
app.listen(3000);
