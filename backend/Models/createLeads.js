const mongoose = require("mongoose");
const Counter = require("./counter");

const leadSchema = new mongoose.Schema(
  {
    leadNumber: { type: Number, unique: true, index: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    }, // New field to track the creator of the lead
    companyInfo: {
      "Lead Type": String,
      "Generic Email 1": String,
      Vertical: String,
      "Company Name": String,
      "Generic Email 2": String,
      "Lead Assigned To": String,
      Website: String,
      "Generic Phone 1": String,
      BDM: String,
      Address: String,
      "Generic Phone 2": String,
      "Lead Status": String,
      City: String,
      "Lead Source": String,
      Priority: String,
      State: String,
      "totalNoOfOffices": { type: Number, default: 0 },
      "Next Action": String,
      Country: String,
      "Turn Over(INR)": String,
      "Lead Usable": String,
      "Employee Count": String,
      totalNoOfManufUnits: { type: Number, default: 0 },
      Reason: String,
      "About The Company": String,
      dateField: { type: Date, default: Date.now },
    },
    contactInfo: {
      it: {
        name: { type: String, required: true },
        dlExt: String,
        designation: String,
        mobile: String,
        email: { type: String, required: true },
        personalEmail: String,
      },
      finance: {
        name: { type: String, required: true },
        dlExt: String,
        designation: String,
        mobile: String,
        email: { type: String, required: true },
        personalEmail: String,
      },
      businessHead: {
        name: { type: String, required: true },
        dlExt: String,
        designation: String,
        mobile: String,
        email: { type: String, required: true },
        personalEmail: String,
      },
      otherSections: [
        {
          name: String,
          dlExt: String,
          designation: String,
          mobile: String,
          email: String,
          personalEmail: String,
        },
      ],
    },
    itLandscape: {
      netNew: {
        "Using ERP (y/n)": String,
        Budget: String,
        "If yes, which one": String,
        Hardware: String,
        Authority: String,
        "If no, why": String,
        Need: String,
        "Opportunity for us 1": String,
        Timeframe: String,
        "Opportunity Value 1": String,
        "Current Database": String,
      },
      SAPInstalledBase: {
        "Opportunity for us 2": String,
        "Year of Implementation": String,
        "Opportunity Value 2": String,
        "No. of Users": String,
        "Opportunity for us 3": String,
        "Contract Expiry": String,
        "Opportunity Value 3": String,
        "Exact Version": String,
        Hardware: String,
        "No. of License": String,
        "Support Partner": String,
        "License Value": String,
        "Modules Implemented": String,
        "Total Project Cost": String,
        "Implementation Partner": String,
      },
    },
    descriptions: [
      {
        description: String,
        createdAt: { type: Date, default: Date.now },
        file: {
          data: Buffer,
          contentType: String,
          filename: String,
        },
        selectedOption: String,
        radioValue: String,
        addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, // Add this line
      },
    ],
  },
  { timestamps: true }
);

// Static method for searching leads
leadSchema.statics.searchLeads = async function (companyName, leadType) {
  try {
    const query = {};
    
    if (companyName) query['companyInfo.Company Name'] = { $regex: companyName, $options: 'i' };
    if (leadType) query['companyInfo.Lead Type'] = { $regex: leadType, $options: 'i' };

    
    const result = await this.find(query).exec();
    return result;
  } catch (err) {
    throw new Error(`Error in searchLeads: ${err.message}`);
  }
};



leadSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "leadNumber" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.leadNumber = counter.seq;
  }
  next();
});

const Lead = mongoose.model("Lead", leadSchema);

module.exports = Lead;
