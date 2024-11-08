const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    username: { type: String, required: true, unique: true },
    fullName: { type: String },
    email: { type: String },
    bio: { type: String, maxLength: 500 },
    profilePicture: { type: String },
    coverPhoto: { type: String },
    website: { type: String },
    location: { type: String },
    birthday: { type: Date },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    phone: { type: String },
    isPrivate: { type: Boolean, default: false },
    socialLinks: {
        twitter: { type: String },
        instagram: { type: String },
        linkedin: { type: String }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

const ProfileModel = mongoose.model('profile', profileSchema)
module.exports = ProfileModel