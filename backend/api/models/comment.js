import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date,
}, { versionKey: false });

// adding craeted at and updated at before save
commentSchema.pre('save', function (next, err) {
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

const Comment = mongoose.model('comments', commentSchema);
export default Comment;