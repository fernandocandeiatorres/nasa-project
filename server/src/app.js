const express = require("express");
const cors = require("cors");

const planetsRouter = require("./routes/planets/planets.router");

const app = express();

app.use(
  cors({
    // middleware CORS
    // da whitelist para que essa origin possa fazer
    // requests em nossa API
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use("/planets", planetsRouter);

module.exports = app;
