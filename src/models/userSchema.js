const {  Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: String,
    password: String,
    role: String,
    remembertoken: String,
    status: Boolean,
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports =  model("User", userSchema);

