import mongoose from "mongoose";

const socialMediaAccountSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    platform: { type: String, required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    lastSynced: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// adding craeted at and updated at before save
socialMediaAccountSchema.pre('save', function (next, err) {
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

const SocialMediaAccount = mongoose.model('socialMediaAccount', socialMediaAccountSchema);
export default SocialMediaAccount;