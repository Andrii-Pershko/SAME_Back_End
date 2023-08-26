const express = require("express");

const userRouter = require("./route/user.route");

const app = express();

app.use(express.json());

app.use("/api", userRouter);

module.exports = app;
