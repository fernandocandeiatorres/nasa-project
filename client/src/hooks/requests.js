const API_URL = "http://localhost:8000/";

async function httpGetPlanets() {
  // faz um fetch (GET) no end point planets da nossa API,
  // invocando toda a lógica do app <-> router <-> controller <-> model
  const planets = await fetch(`${API_URL}planets`);
  return await planets.json();
}

async function httpGetLaunches() {
  const launches = await fetch(`${API_URL}launches`);
  const launchesJson = await launches.json();
  return launchesJson.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
