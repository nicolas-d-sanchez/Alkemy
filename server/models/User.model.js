const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
    user: {type: String,required: true, max:100},
    password: {type: String,required: true, max:128},
});

module.exports = mongoose.model("user", UserSchema);