
const mongoose = require('mongoose');

const HouseSchema = new mongoose.Schema({
    CustumerID: [{ type: String, require: true }],
    ListName: { type: String, require: true },
    items:  []
})

module.exports = mongoose.model('House', HouseSchema);