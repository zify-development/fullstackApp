const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
  },
});

mongoose.model("users", userSchema);
