import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// adding craeted at and updated at before save
messageSchema.pre('save', function (next, err) {
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

const Message = mongoose.model('message', messageSchema);
export default Message;