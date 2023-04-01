const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const UserSchema = new Schema({
    username: String,
    password: String,
    firstName: String,
    firstSurname: String,
    birthDate: {type: Date},
    photo: ObjectId
});

const User = mongoose.model('User',UserSchema);
module.exports = User;