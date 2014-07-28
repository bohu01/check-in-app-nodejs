//user model
var mongoose = require('mongoose')
    , Schema = mongoose.Schema

var RecordSchema = new Schema({
    date: String,
    weekday: String,
    month: String,
    year: String,
    user_id: String,
    checkin_records: Array,
    checkout_records: Array,
    hours: Array,
    notes: Array,
});


var Record = mongoose.model('Record', RecordSchema);
module.exports = mongoose.model('Record', RecordSchema);