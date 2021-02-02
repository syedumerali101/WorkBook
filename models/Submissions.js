const mongoose = require("mongoose");

const Submissions = mongoose.model(
    "submissions",
    new mongoose.Schema({
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        user_name: { type: String, default: '' },
        title: { type: String, default: '' },
        description: { type: String, default: '' },
        admin_comments: { type: String, default: '' },
        status: {
            type: Boolean,
            default: false
        },


    }, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
);

module.exports = Submissions;