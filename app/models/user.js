//user model
var mongoose = require('mongoose')
    , Schema = mongoose.Schema

var UserSchema = new Schema({
    lastname: String,
    firstname: String,
    username: String,
    email: String,
    password: String,
    lastcheckin: {
        day: {type: String, default: ""},
        date: {type: String, default: ""},
        localtime: {type: String, default: ""},
    },
    lastcheckout: {
        day: {type: String, default: ""},
        date: {type: String, default: ""},
        localtime: {type: String, default: ""},
    },
    message: {type: String, default: ""},
    checkin: {type: Boolean, default: false},
    checkout: {type: Boolean, default: false},
    admin: {type: Boolean, default: false},
    passwordRecovery : {
        token: { type:String, sparse:true },
        expires: Date
    },
});


var User = mongoose.model('User', UserSchema);
module.exports = mongoose.model('User', UserSchema);