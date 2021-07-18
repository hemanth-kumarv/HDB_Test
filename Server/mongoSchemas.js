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
  ZoneName: String,
  AdList: [],
});

const CompanyDetailsDBTest = new Schema({
  Name: String,
  CompanyName: String,
  Email: String,
  Address1: String,
  Address2: String,
  Logo: String,
  UploadedAds: [
    {
      Video: String,
      Count: Number,
      Date: String,
      TimeSlot: String,
    },
  ],
});

const CompanyLoginDBTest = new Schema({
  UserID: String,
  Password: String,
  Preferences: {},
});

const UnreviewedAdsList = new Schema({
  DisplayDate: String,
  FromTime: String,
  ToTime: String,
  Location: String,
  Title: String,
  DisplayCount: String,
  UserID: String,
  UploadType: String,
});

const CompanyAnalyticsTest = new Schema({});

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
  Password: String,
  Preferences: {},
});

const CustomerDetailsDBTest = new Schema({
  Name: String,
  DateOfBirth: String,
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
exports.CompanyDetailsDBTest = CompanyDetailsDBTest;
exports.CompanyLoginDBTest = CompanyLoginDBTest;
exports.UnreviewedAdsList = UnreviewedAdsList;
exports.CompanyAnalyticsTest = CompanyAnalyticsTest;

exports.CustomerRewardsDBTest = CustomerRewardsDBTest;
exports.CustomerLoginDBTest = CustomerLoginDBTest;
exports.CustomerDetailsDBTest = CustomerDetailsDBTest;
exports.TransactionHistoryTest = TransactionHistoryTest;
