const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");


const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    }
});

UserSchema.plugin(passportLocalMongoose); // adds username, hash and salt fields

module.exports = mongoose.model("User", UserSchema);