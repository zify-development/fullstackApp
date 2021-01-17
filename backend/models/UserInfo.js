const mongoose = require('mongoose');
const {Schema} = mongoose;

const userInfoSchema = new Schema({
    firstName: String,
    lastName: String,
    age: Number,
    id: String
})

mongoose.model('users_profile_datas', userInfoSchema);