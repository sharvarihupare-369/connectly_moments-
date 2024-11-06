const mongoose = require("mongoose");

const blackListSchema = mongoose.Schema({
    token : {type:String, required: true},
    blackListedAt: {type:Date, default: Date.now}
})

const BlackListModel = mongoose.model('blacklisttoken',blackListSchema)

module.exports = BlackListModel;