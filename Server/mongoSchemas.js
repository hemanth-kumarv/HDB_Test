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

const ZonalAdsListTest = new Schema({
  TransmitterID: String,
  AdList: [],
});

const CustomerRewardsDBTest = new Schema({
  Email: String,
  RewardList: [
    {
      AdName: String,
      Duration: Number,
      Reward: Number,
      DateTime: String,
    },
  ],
  Total: {
    Count: Number,
    Time: Number,
    Amount: Number,
  },
  NewRewards: [{ Time: String, Ad: String }],
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
      DateTime: String,
      Amount: Number,
      TxnId: String,
    },
  ],
});

exports.CompanyListDBTest = CompanyListDBTest;
exports.ZonalAdsListTest = ZonalAdsListTest;
exports.CustomerRewardsDBTest = CustomerRewardsDBTest;
exports.CustomerLoginDBTest = CustomerLoginDBTest;
exports.CustomerDetailsDBTest = CustomerDetailsDBTest;
exports.TransactionHistoryTest = TransactionHistoryTest;
