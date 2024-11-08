const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    content: { type: String, required: true, trim: true },
    image: { type: [String], default: [], required: true },
    isPrivate: { type: Boolean, default: false },
    likes: { type: [mongoose.Schema.Types.ObjectId], ref: 'user', default: [] },
    comments: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        comment: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

const PostModel = mongoose.model('post', postSchema)

module.exports = PostModel;