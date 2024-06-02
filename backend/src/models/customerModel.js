const mongoose = require('mongoose')
const customerSchema = new mongoose.Schema(
    {
        avatar: { type: String },
        name: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phone: { type: Number },
        address: { type: String },
        avatar: { type: String },
    },
    {
        timestamps: true
    }

);
const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;