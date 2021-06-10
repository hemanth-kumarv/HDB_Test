var express = require("express");
var fs = require("fs");
var app = express();
var cors = require("cors");
var ip = require("ip");
var _ = require("lodash");
var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./newAds/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({ storage: storage });
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const conn = require("./mongoConnections");

const CompanyListDBTest = conn.CompanyListDBTest;
const ZonalAdsListTest = conn.ZonalAdsListTest;
const CompanyLoginDBTest = conn.CompanyLoginDBTest;
const CompanyDetailsDBTest = conn.CompanyDetailsDBTest;

const CustomerLoginDBTest = conn.CustomerLoginDBTest;
const CustomerRewardsDBTest = conn.CustomerRewardsDBTest;
const CustomerDetailsDBTest = conn.CustomerDetailsDBTest;
const TransactionHistoryTest = conn.TransactionHistoryTest;

const findFromCompanyList = async (arr) => {
  let res = await CompanyListDBTest.find({ VideoID: { $in: arr } });
  return res;
};

app.post("/getAvailableEmails", async (req, res) => {
  try {
    let customers = [],
      companies = [];
    await CompanyLoginDBTest.find({}, (err, docs) => {
      companies = docs.map((obj) => obj.Email);
    });
    await CustomerLoginDBTest.find({}, (err, docs) => {
      customers = docs.map((obj) => obj.UserID);
    });
    res.send({ customers: customers, companies: companies });
  } catch (error) {
    console.log(error);
  }
});

app.post("/getRewards", (req, res) => {
  try {
    if (req.body.name) {
      CustomerRewardsDBTest.findOne(
        { Email: req.body.name },
        async (err, docs) => {
          if (err) {
            console.log(err);
            res.send({
              status: false,
              message: "Error connecting to database.",
            });
          } else {
            let newDocs = docs;
            console.log(newDocs);
            if (docs.NewRewards.length > 0) {
              let arr = [],
                newRewards = [];
              newDocs.NewRewards.forEach((i) => arr.push(i.Ad));
              let result = await findFromCompanyList(arr);
              newDocs.NewRewards.forEach((i) => {
                let x = result.find((obj) => obj.VideoID === i.Ad);
                newDocs.Total.Time += Number(x.Duration);
                newDocs.Total.Amount += Number(x.Reward);
                newDocs.Total.Count += 1;
                newRewards.push({
                  AdName: x.Name,
                  Duration: x.Duration,
                  Reward: x.Reward,
                  DateTime: i.Time,
                });
              });
              newDocs.NewRewards = [];
              newDocs.RewardList = [...newDocs.RewardList, ...newRewards];
              await CustomerRewardsDBTest.updateOne(
                { Email: req.body.name },
                newDocs
              );
            }
            res.send({
              Rewards: newDocs.RewardList,
              Total: newDocs.Total,
              status: true,
            });
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", (req, res) => {
  try {
    let loginDB, detailsDB;
    if (req.body.type === "Customer") {
      loginDB = CustomerLoginDBTest;
      detailsDB = CustomerDetailsDBTest;
    } else {
      loginDB = CompanyLoginDBTest;
      detailsDB = CompanyDetailsDBTest;
    }
    loginDB.findOne({ UserID: req.body.name }, (err, docs) => {
      if (err) {
        res.send({ status: false, message: "Error connecting to database." });
      } else if (docs === null) {
        res.send({
          status: false,
          message: "Username or Password incorrect.",
        });
      } else {
        if (docs.Password === req.body.pass) {
          detailsDB.findOne({ Email: req.body.name }, (err, docs) => {
            if (err) {
              res.send({
                status: false,
                message: "Error connecting to database.",
              });
            } else res.send({ status: true, data: docs });
          });
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

// app.post("/editCustomerData", (req, res) => {
//   try {
//     CustomerDetailsDBTest.updateOne(
//       { Email: req.body.email },
//       { ProfilePicture: req.body.image },
//       (err, result) => {
//         if (err) {
//           res.send("Error connecting to database.");
//         } else {
//           res.send({ status: true });
//         }
//       }
//     );
//   } catch (error) {
//     console.log(error);
//   }
// });

app.post("/registration", (req, res) => {
  try {
    if (req.body.type === "Customer") {
      const newDetailsDoc = new CustomerDetailsDBTest(req.body);
      newDetailsDoc.save();

      const newLoginDoc = new CustomerLoginDBTest({
        UserID: req.body.Email,
        Password: req.body.Password,
        Preferences: {},
      });
      newLoginDoc.save();

      const newRewardsDoc = new CustomerRewardsDBTest({
        Email: req.body.Email,
        RewardList: [],
        NewRewards: [],
        Total: { Count: 0, Time: 0, Amount: 0.0 },
      });
      newRewardsDoc.save();

      const newTransactionsDoc = new TransactionHistoryTest({
        Email: req.body.Email,
        TotalAmount: 0.0,
        TransactionHistory: [],
      });
      newTransactionsDoc.save();
    } else if (req.body.type === "Company") {
      const newDetailsDocs = new CompanyDetailsDBTest({
        ...req.body,
        UploadedAds: [],
      });
      newDetailsDocs.save();
      const newLoginDocs = new CompanyLoginDBTest({
        ...req.body,
        UserID: re.body.Email,
        Preferences: {},
      });
      newLoginDocs.save();
    }

    res.send({});
  } catch (error) {
    console.log(error);
  }
});

app.post("/getAvailableAds", (req, res) => {
  try {
    ZonalAdsListTest.findOne(
      { TransmitterID: req.body.tID },
      async (err, docs) => {
        if (err) {
          console.log(err);
          res.send("Error connecting to database.");
        } else {
          let newDocs = await findFromCompanyList(docs.AdList);
          res.send(newDocs);
        }
      }
    );
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

app.post("/getPreviouslyUploadedAds", (req, res) => {
  try {
    CompanyDetailsDBTest.findOne(
      { Email: req.body.emailID },
      async (err, docs) => {
        if (err) {
          console.log(err);
          res.send("Error connecting to database.");
        } else {
          let newRes;
          if (docs.UploadedAds)
            newRes = await findFromCompanyList(docs.UploadedAds);
          res.send(newRes);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.post("/uploadNewAd", upload.single("MyNewVideo"), (req, res) => {
  console.log("Hehe", req.body);
  try {
    res.send({
      status: 200,
      message:
        "Uploaded successfully. You shall be notified if the ad uploaded is suitable to be displayed or not.",
    });
  } catch (error) {
    res.send({ status: 400, message: "Error while uploading. Please retry." });
    console.log(error);
  }
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});
console.log("App running on", ip.address() + ":3000");
app.listen(3000);
