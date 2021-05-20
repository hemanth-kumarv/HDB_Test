var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const CompanyListDBTest = new Schema({
  Name: String,
  Location: String,
  Reward: { type: Number, default: 0.0 },
  Duration: Number,
  Icon: String,
  VideoID: String,
});

const CustomerRewardsDBTest = new Schema({
  Email: String,
  RewardList: [
    {
      AdName: String,
      Duration: Number,
      Reward: { Number, default: 0.0 },
      DateTime: {
        Date: Number,
        Month: Number,
        Year: Number,
        Time: Number,
      },
    },
  ],
  Total: {
    Count: Number,
    Time: Number,
    Amount: Number,
  },
});

const CustomerLoginDBTest = new Schema({
  UserID: String,
  PasswordHash: String,
  Preferences: {},
});

const CustomerDetailsDBTest = new Schema({
  Name: String,
  DoB: String,
  MobileNumber: Number,
  UPID: String,
  Gender: String,
  Address1: String,
  Address2: String,
  Referral: String,
  Email: String,
  ProfilePicture: String,
});
const TransactionHistoryTest = new Schema({
  Email: String,
  TotalAmount: Number,
  TransactionHistory: [
    {
      Date: String,
      Time: String,
      Amount: Number,
      TxnId: String,
    },
  ],
});

exports.CompanyListDBTest = CompanyListDBTest;
exports.CustomerRewardsDBTest = CustomerRewardsDBTest;
exports.CustomerLoginDBTest = CustomerLoginDBTest;
exports.CustomerDetailsDBTest = CustomerDetailsDBTest;
exports.TransactionHistoryTest = TransactionHistoryTest;
