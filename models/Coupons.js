const mongoose = require("mongoose");

const Coupons = mongoose.model(
    "coupons",
    new mongoose.Schema({
        code: String,
        user_id: Number,
        amount: Number,

    }, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
);

module.exports = Coupons;