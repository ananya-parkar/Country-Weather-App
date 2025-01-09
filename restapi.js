// console.log('Hello from JS')

const box = document.getElementById("country-cards");

fetch("https://restcountries.com/v2/all")
.then((response) => response.json())
.then((countries) => {
    
    countries.forEach((country) =>{

        const card = document.createElement("div");
        card.className = "c-card";

        card.innerHTML = `
        <h2>${country.name}</h2>
        <img src = "${country.flags.svg}" alt= "${country.name} Flag">
        <p> <strong> Capital:</Strong> ${country.capital || "N/A"}</p>
        <p> <strong> Region:</Strong> ${country.region}</p>
        <p> <strong> Country Code:</Strong> ${country.alpha3Code}</p>
        <button onclick = "weatherInfo('${country.capital}', '${country.name}')"> Weather Info </button>
        `;

        box.appendChild(card);      
    });    
})
.catch((error)=> {
    console.error("Fetching error", error);
    box.innerHTML = "server issue, Please try later";
});

function weatherInfo(countryCapital, countryName){
    if(!countryCapital){
        alert("Error: No Data Available");
        return;
    }

    const key ="7502570c409c17adbea4bd36a46a173d";
    const countryweatherAPI =`https://api.openweathermap.org/data/2.5/weather?q=${countryCapital}&appid=${key}`;

    fetch(countryweatherAPI)
    .then((response)=> response.json())
    .then((data) => {
        if(data.cod==200){
            alert("Weather in "+countryCapital+":\n"+"Temperature: " + data.main.temp + " degrees \n" +"Condition: "+ data.weather[0].description+ "\n"+ "Humidity: " + data.main.humidity+"%");
        }
    })
    .catch((error) => {
        console.log("Error: Weather data", error);
        alert("Sorry! Could'nt fetch weather");
    });
}