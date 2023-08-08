import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    type: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, required: true },
    readStatus: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// adding craeted at and updated at before save
notificationSchema.pre('save', function (next, err) {
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

const Notification = mongoose.model('notification', notificationSchema);
export default Notification;