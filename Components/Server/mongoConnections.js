const mongoose = require("mongoose");
const schemas = require("./mongoSchemas");
const config = require("../config.json");

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
const TransactionHistoryTest = CustomerConn.model("Customer",
  schemas.TransactionHistoryTest,
  "TransactionHistoryTest"
);

exports.CompanyListDBTest = CompanyListDBTest;
exports.CustomerLoginDBTest = CustomerLoginDBTest;
exports.CustomerRewardsDBTest = CustomerRewardsDBTest;
exports.CustomerDetailsDBTest = CustomerDetailsDBTest;
exports.TransactionHistoryTest = TransactionHistoryTest;
