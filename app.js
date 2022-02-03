import express from "express";
import loaders from "./loaders/express.js";

const app = express();

loaders(app);

export default app;
