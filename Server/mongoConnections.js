const mongoose = require("mongoose");
const schemas = require("./mongoSchemas");
const config = require("./config.json");

const mongoUrl =
  "mongodb+srv://" +
  config.MongoDBCredentials.UserName +
  ":" +
  config.MongoDBCredentials.Password +
  "@cluster0.ckaqz.mongodb.net/";
const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

// Connections to Databases "Company" and "Customer"
const CompanyConn = mongoose.createConnection(
  mongoUrl + "Company",
  connectionOptions
);
const CustomerConn = mongoose.createConnection(
  mongoUrl + "Customer",
  connectionOptions
);

// Model of Company Collections
const CompanyListDBTest = CompanyConn.model(
  "Company",
  schemas.CompanyListDBTest,
  "CompanyListDBTest"
);
const CompanyDetailsDBTest = CompanyConn.model(
  "Company",
  schemas.CompanyDetailsDBTest,
  "CompanyDetailsDBTest"
);
const CompanyLoginDBTest = CompanyConn.model(
  "Company",
  schemas.CompanyLoginDBTest,
  "CompanyLoginDBTest"
);

const ZonalAdsListTest = CompanyConn.model(
  "Company",
  schemas.ZonalAdsListTest,
  "ZonalAdsListTest"
);
const UnreviewedAdsList = CompanyConn.model(
  "Company",
  schemas.UnreviewedAdsList,
  "UnreviewedAdsList"
);
const CompanyAnalyticsTest = CompanyConn.model(
  "Company",
  schemas.CompanyAnalyticsTest,
  "CompanyAnalyticsTest"
);

// Model of Customer Collections
const CustomerRewardsDBTest = CustomerConn.model(
  "Customer",
  schemas.CustomerRewardsDBTest,
  "CustomerRewardsDBTest"
);
const CustomerLoginDBTest = CustomerConn.model(
  "Customer",
  schemas.CustomerLoginDBTest,
  "CustomerLoginDBTest"
);
const CustomerDetailsDBTest = CustomerConn.model(
  "Customer",
  schemas.CustomerDetailsDBTest,
  "CustomerDetailsDBTest"
);
const TransactionHistoryTest = CustomerConn.model(
  "Customer",
  schemas.TransactionHistoryTest,
  "TransactionHistoryTest"
);

exports.CompanyListDBTest = CompanyListDBTest;
exports.ZonalAdsListTest = ZonalAdsListTest;
exports.CompanyDetailsDBTest = CompanyDetailsDBTest;
exports.CompanyLoginDBTest = CompanyLoginDBTest;
exports.UnreviewedAdsList = UnreviewedAdsList;
exports.CompanyAnalyticsTest = CompanyAnalyticsTest;

exports.CustomerLoginDBTest = CustomerLoginDBTest;
exports.CustomerRewardsDBTest = CustomerRewardsDBTest;
exports.CustomerDetailsDBTest = CustomerDetailsDBTest;
exports.TransactionHistoryTest = TransactionHistoryTest;