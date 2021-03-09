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
  useCreateIndex: true
};

const CompanyListDBTestConn = mongoose.createConnection(
  mongoUrl + "CompanyListDBTest",
  connectionOptions
);
const CompanyListDBTest = CompanyListDBTestConn.model(
  "CompanyListDBTest",
  schemas.CompanyListDBTest,
  "TestList"
);

const CustomerRewardsDBTestConn = mongoose.createConnection(
  mongoUrl + "CustomerRewardsDBTest",
  connectionOptions
);
const CustomerRewardsDBTest = CustomerRewardsDBTestConn.model(
  "CustomerRewardsDBTest",
  schemas.CustomerRewardsDBTest,
  "CustomerList1"
);

const CustomerLoginDBTestConn = mongoose.createConnection(
  mongoUrl + "CustomerLoginDBTest",
  connectionOptions
);
const CustomerLoginDBTest = CustomerLoginDBTestConn.model(
  "CustomerLoginDBTest",
  schemas.CustomerLoginDBTest,
  "CustomerList1"
);

const CustomerDetailsDBTestConn = mongoose.createConnection(
  mongoUrl + "CustomerDetailsDBTest",
  connectionOptions
);
const CustomerDetailsDBTest = CustomerDetailsDBTestConn.model(
  "CustomerDetailsDBTest",
  schemas.CustomerDetailsDBTest,
  "CustomerList1"
);

exports.CompanyListDBTest = CompanyListDBTest;
exports.CustomerLoginDBTest = CustomerLoginDBTest;
exports.CustomerRewardsDBTest = CustomerRewardsDBTest;
exports.CustomerDetailsDBTest = CustomerDetailsDBTest;
