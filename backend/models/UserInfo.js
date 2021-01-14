const mongoose = require('mongoose');
const {Schema} = mongoose;

const userInfoSchema = new Schema({
    firstName: String,
    lastName: String,
    myMotivation: String,
    age: Number,
})

mongoose.model('usersInfo', userInfoSchema);