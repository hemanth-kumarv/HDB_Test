var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const CompanyListDBTest = new Schema({
  Name: String,
  Location: String,
  PayPerHour: { type: Number, default: 0.0 },
});

const CustomerDBTest = new Schema({
  AdName: String,
  Duration: Number,
  Reward: { Number, default: 0.0 },
  DateTime: {
    Date: Number,
    Month: Number,
    Year: Number,
    Time: Number,
  },
});

const CustomerLoginDBTest = new Schema({
  UserID: String,
  PasswordHash: String,
  Preferences: {},
});

exports.CompanyListDBTest = CompanyListDBTest;
exports.CustomerDBTest = CustomerDBTest;
exports.CustomerLoginDBTest = CustomerLoginDBTest;

