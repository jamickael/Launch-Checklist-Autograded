window.addEventListener("load", function() {

    let listedPlanets; 
    let listedPlanetsResponse = myFetch(); //setting the planets API equal to this variable
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets); //display all planets
        let planet = pickPlanet(listedPlanets); //choosing random planet
        console.log(planet); //display chosen planet
        addDestinationInfo(document, planet.name, planet.diameter, planet.star, planet.distance, planet.moons, planet.image)
    })

    const form = document.getElementById('launchForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let pilotCheck = document.getElementsByName("pilotName")[0].value;
        let copilotCheck = document.getElementsByName("copilotName")[0].value;
        let fuelCheck = document.getElementsByName("fuelLevel")[0].value; 
        let cargoCheck = document.getElementsByName("cargoMass")[0].value;

        formSubmission(document, listedPlanets, pilotCheck, copilotCheck, fuelCheck, cargoCheck)
    });

 });

