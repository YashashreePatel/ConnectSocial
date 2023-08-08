import Comment from "./comment.js";
// import Message from "./message.js";
// import Notification from "./notification.js";
// import Post from "./post.js";
// import SocialMediaAccount from "./social-media-account.js";
// import User from "./user.js";
import mongoose from "mongoose";

//const url = 'mongodb+srv://yashashreepatel:JklfLJWmgd3isxNw@connectsocial.k3tdcm0.mongodb.net/ConnectSocialDatabase';
const url = "mongodb://127.0.0.1/coonectsocial";

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB ConnectSocial Database");
}).catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
});

export default {
    Comment
    // Message,
    // Notification,
    // Post,
    // SocialMediaAccount,
    // User
};