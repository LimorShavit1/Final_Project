const mongoose = require('mongoose');

//in the constructor of 'Schema' class we can define objects
const userSchema = new mongoose.Schema({
    fullName: { type: String, require: true },
    email: { type: String, unique: true, require: true },
    password: { type: String, require: true }
})

const User = module.exports = mongoose.model('User',userSchema);