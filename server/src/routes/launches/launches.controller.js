const launchesModel = require("../../models/launches.model");

function getAllLaunches(req, res) {
  return res.status(200).json(launchesModel.getAllLaunches());
}

function abortLaunch(req, res) {
  const launchId = Number(req.params.id);

  if (!launchesModel.hasLaunchWithId) {
    return res.status(404).json("error: no launch with specified id.");
  }

  launchesModel.abortLaunchById(launchId);
  return res.status(200).json(`Launch with ID: ${launchId} was aborted.`);
}

function addNewLaunch(req, res) {
  const launch = req.body; // pega o body da request com os input do user

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "missing launch properties",
    });
  }
  // modifica o que quisermos no input que o user passou
  launch.launchDate = new Date(launch.launchDate);

  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "invalid launch date",
    });
  }
  // adiciona a request no nosso model
  launchesModel.addLaunch(launch);
  // retorna status de success
  return res.status(201).json(launch);
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  abortLaunch,
};
