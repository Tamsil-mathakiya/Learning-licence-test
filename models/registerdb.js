const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    emailid: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    contactnumber: { type: Number, required: true }
});

const Register = mongoose.model('Register', registerSchema);
module.exports = Register;
