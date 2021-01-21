const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const userInfoSchema = new Schema({
  firstName: String,
  lastName: String,
  age: Number,
  id: {
    unique: true,
    type: Types.ObjectId,
    ref: "users",
  },
});

mongoose.model("users_profile_datas", userInfoSchema);
