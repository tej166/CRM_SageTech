const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["subuser", "supervisor", "admin"],
    default: "subuser",
  },
  supervisor: {
    type: Schema.Types.ObjectId,
    ref: "user",
    default: null,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
