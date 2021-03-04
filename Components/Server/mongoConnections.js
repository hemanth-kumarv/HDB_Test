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
const CompanyListDBTestConn = mongoose.createConnection(
  mongoUrl + "CompanyListDBTest",
  connectionOptions
);
const CompanyListDBTest = CompanyListDBTestConn.model(
  "CompanyListDBTest",
  schemas.CompanyListDBTest,
  "TestList"
);
const getCustomerDb = (name) => {
  const CustomerDBTestConn = mongoose.createConnection(
    mongoUrl + "CustomerDBTest",
    connectionOptions
  );
  const CustomerDBTest = CustomerDBTestConn.model(
    "CustomerDBTest",
    schemas.CustomerDBTest,
    name
  );
  return CustomerDBTest;
};
const CustomerLoginDBTestConn = mongoose.createConnection(
  mongoUrl + "CustomerLoginDBTest",
  connectionOptions
);
const CustomerLoginDBTest = CustomerLoginDBTestConn.model(
  "CustomerLoginDBTest",
  schemas.CustomerLoginDBTest,
  "UserList"
);

exports.CompanyListDBTest = CompanyListDBTest;
exports.CustomerLoginDBTest = CustomerLoginDBTest;
exports.getCustomerDb = getCustomerDb;
