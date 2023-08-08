import commentRouter from "./post-route.js";

const commentRoute = (app) => {
    app.use('/api/posts/comment', commentRouter);
}

export default commentRoute;