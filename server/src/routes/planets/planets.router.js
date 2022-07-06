const express = require("express");

const { getAllPlanets } = require("./planets.controller");

const planetsRouter = express.Router();

// end point "/planets" que ao receber um GET
// invoca a função getAllPlanets
planetsRouter.get("/", getAllPlanets);

module.exports = planetsRouter;
