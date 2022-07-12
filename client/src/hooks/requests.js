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

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URL}launches`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
  } catch (error) {
    return {
      ok: false,
    };
  }
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}launches/${id}`, {
      method: "delete",
    });
  } catch (error) {
    return {
      ok: false,
    };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
