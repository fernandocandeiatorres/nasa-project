const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");

const results = [];

function isHabitablePlanet(planet) {
  // habitables = [];
  // results.map((result) => {
  //     if (result['koi_disposition'] === 'CONFIRMED') {
  //         habitables.push(result);
  //     }
  // })
  // console.log(habitables)

  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

// readstream que lê a data de planets e retorna ela no "results"
// envolvemos a fs.readstream em uma Promise, e jogamos tudo em uma
// função, ao invocarmos essa função com await ou then, ela vai
// bloquear o código até a promise ser completada
// Fazemos isso pois se não a readstream é asyncrona e o modulo
// exportaria o results antes da readstream terminar, mandando um
// results de planets vazio para o client que fez a request
function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#", // tells the parser what type of char is used to comment in the CSV
          columns: true, // returns as a JS object w/ key:value pairs, intead of just array of values
        })
      ) // readable.pipe(writable)
      .on("data", (data) => {
        if (isHabitablePlanet(data)) {
          results.push(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", () => {
        console.log(`${results.length} habitable planets found!`);
        resolve();
      });
  });
}

module.exports = {
  loadPlanetsData,
  planets: results,
};
