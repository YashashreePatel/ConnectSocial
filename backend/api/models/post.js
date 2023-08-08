import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    accountId: { type: mongoose.Schema.Types.ObjectId, required: true },
    platform: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, required: true },
    likesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    sharesCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// adding craeted at and updated at before save
postSchema.pre('save', function (next, err) {
    const now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    // if err is ValidationError then format it
    if (err) {
        if (err.name === 'ValidationError') {
            const errors = {};
            for (const [key, value] of Object.entries(err.errors)) {
                errors[key] = value.message;
            }
            console.log('errors', errors);
        }
    }
    next();
});

const Post = mongoose.model('post', postSchema);
export default Post;