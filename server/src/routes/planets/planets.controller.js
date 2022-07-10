const planetsModel = require("../../models/planets.model");

// getAllPlanets usada quando uma GET request
// é feita no router planets ( end point definido no router )
function getAllPlanets(req, res) {
  return res.status(200).json(planetsModel.getAllPlanets());
}

module.exports = {
  getAllPlanets,
};
