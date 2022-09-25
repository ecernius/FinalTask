const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const mainRouter = require("./router/mainRouter");
require("dotenv").config();
mongoose
  .connect(process.env.MONGO_KEY)
  .then((res) => {
    console.log("CONNECTED");
  })
  .catch((e) => {
    console.log("ERROR");
  });

app.listen(4000);
app.use(express.json());

const session = require("express-session");

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: "GET, POST",
  })
);

app.use(
  session({
    secret: "6s5d4fs89d4f65",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/", mainRouter);
