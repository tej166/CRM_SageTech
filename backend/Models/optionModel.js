const mongoose = require("mongoose");

const optionsSchema = new mongoose.Schema({
  leadTypeOptions: [String],
  verticalOptions: [String],
  leadStatusOptions: [String],
  priorityOptions: [String],
  leadSourceOptions: [String],
  stateOptions: [String],
  countryOptions: [String],
  leadUsableOptions: [String],
  nextActionOptions: [String],
  employeeCountOptions: [String],
  reasonOptions: [String],
  turnOverOptions: [String],
  usingERPOptions: [String],
  ERPTypeOptions: [String],
  noWhyOptions: [String],
  opportunityOptions: [String],
  timeframeOptions: [String],
  currentDatabaseOptions: [String],
  expiryOptions: [String],
  versionOptions: [String],
  partnerOptions: [String],
});

const OptionsModel = mongoose.model("Options", optionsSchema);

module.exports = OptionsModel;
