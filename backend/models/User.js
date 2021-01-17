const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    email: String,
    password: String,
    createdDate: Date
})

mongoose.model('users', userSchema);