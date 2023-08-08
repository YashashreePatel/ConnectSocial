import express from "express";
import cors from "cors";
import debug from "debug";
import mongoose from "mongoose";
import models from "./models/index.js";
import commentRoute from "./routes/index.js";

const BackendApp = express();
const log = debug("app:log");
const error = debug("app:error");

BackendApp.use(cors());
BackendApp.use(express.json());
BackendApp.use(express.urlencoded({ extended: true }));

// passing app in routes
commentRoute(BackendApp);

export default BackendApp;