const path = require("path");
const express = require("express");
const cors = require("cors");

const morgan = require("morgan");
const rfs = require("rotating-file-stream");

const planetsRouter = require("./routes/planets/planets.router");
const launchesRouter = require("./routes/launches/launches.router");
const { deleteLaunch } = require("./routes/launches/launches.controller");

const app = express();

app.use(
  cors({
    // middleware CORS
    // da whitelist para que essa origin possa fazer
    // requests em nossa API
    origin: "http://localhost:3000",
  })
);

// rotating write stream
const accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "logs"),
});

// setup the logger
app.use(
  morgan("combined", {
    skip: function (req, res) {
      return req.path !== "/";
    },
    stream: accessLogStream,
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/planets", planetsRouter);
app.use("/launches", launchesRouter);

// Front End Routing vs Back End Routing:
// Back end é nossa API, vai ter os endpoints que receberão
// requests,
// Front end routing tambem tem endpoints, mas por exemplo "history"
// não recebe nenhuma request, apenas divide um site em um endpoint que mostra
// algo específico

// Esse asterisco diz que caso a request não esteja presente no backend routing,
// procurar no frontend routing.
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
