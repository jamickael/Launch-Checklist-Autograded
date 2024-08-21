require('cross-fetch/polyfill');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let destinationUpdate = document.getElementById("missionTarget")
    destinationUpdate.innerHTML = `
        <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src="${imageUrl}">
        `
 }
 
 function validateInput(testInput = "") {
    if (testInput.length === 0) {
        return "Empty";
    } else if (isNaN(testInput) === false){
        return "Is a Number";
    } else if (isNaN(testInput) === true){
        return "Not a Number";
    } 
 }

 function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    const validatedAnswers = [
        validateInput(pilot), 
        validateInput(copilot), 
        validateInput(fuelLevel), 
        validateInput(cargoLevel)];
    console.log(validatedAnswers);
//makes sure all fields are filled
    if (validatedAnswers.includes("Empty")) {
        alert("Please complete all fields before submitting.");
        return false;    
    }
//makes sure all fields have the correct data type
    if (validatedAnswers[0] === "Is a Number" ||
        validatedAnswers[1] === "Is a Number" ||
        validatedAnswers[2] === "Not a Number" ||
        validatedAnswers[3] === "Not a Number"
    ) {
        alert("Please enter the correct type of entry for each field.");
        return false;
    }
    let pilotUpdate = document.getElementById("pilotStatus");
    let copilotUpdate = document.getElementById("copilotStatus");
    let fuelUpdate = document.getElementById("fuelStatus"); 
    let cargoUpdate = document.getElementById("cargoStatus");
    let fuelTracker = true; //used to determine style changes when launch fails/succeeds
    let cargoTracker = true; //""
//pilot
    pilotUpdate.innerHTML = `Pilot ${pilot} is ready for launch`
//copilot
    copilotUpdate.innerHTML = `Co-pilot ${copilot} is ready for launch`
//fuel
    if (fuelLevel < 10000) {
        fuelUpdate.innerHTML = "Fuel level too low for launch"
        fuelTracker = false;
    } else {
        fuelUpdate.innerHTML = "Fuel level high enough for launch"
    }
//cargo
    if (cargoLevel > 10000) {
        cargoUpdate.innerHTML = `Cargo mass too heavy for launch`
        cargoTracker = false;
    } else {
        cargoUpdate.innerHTML = "Cargo mass low enough for launch"
    }
//H2 heading update and color changing
    const launchH2 = document.getElementById("launchStatus");
    const faulty = document.getElementById("faultyItems");
    faulty.setAttribute("style", "visibility: visible");
    if (fuelTracker === false || cargoTracker === false) {
        launchH2.innerHTML = "Shuttle Not Ready for Launch";
        launchH2.setAttribute("style", "color: red");
    } else {
        launchH2.innerHTML = "Shuttle is Ready for Launch";
        launchH2.setAttribute("style", "color: green");
    }
 }
 
 async function myFetch() {
    let planetsReturned;
    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
        return response.json(); //setting the entire action of grabbing json to a this variable to return 
    });
    return planetsReturned;
 }
 
 function pickPlanet(planets) {
    let selectedPlanet = Math.floor(Math.random()*planets.length); //randomizer
    return planets[selectedPlanet];
 }
 
 module.exports.addDestinationInfo = addDestinationInfo;
 module.exports.validateInput = validateInput;
 module.exports.formSubmission = formSubmission;
 module.exports.pickPlanet = pickPlanet; 
 module.exports.myFetch = myFetch;