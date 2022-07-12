const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customer: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  return Array.from(launches.values());
}

function addLaunch(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      success: true,
      upcoming: true,
      customers: ["ZTM", "NASA"],
      flightNumber: latestFlightNumber,
    })
  );
}

// checks if the map has an element with a key
// that matches this id ( key in this case is the flightNumber )
function hasLaunchWithId(id) {
  return launches.has(id);
}

function abortLaunchById(id) {
  const aborted = launches.get(id);

  aborted.success = false;
  aborted.upcoming = false;

  return aborted;
}

module.exports = {
  addLaunch,
  getAllLaunches,
  hasLaunchWithId,
  abortLaunchById,
};
