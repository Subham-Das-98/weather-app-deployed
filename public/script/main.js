import getIcon from "./icon-set.js";

/* ASSIGN REQUIRED VARIABLES */
let search_box = document.getElementById("search-box");

let main_container = document.getElementById("main-container");
let result_container = document.getElementById("result-container");
let loading_card = document.getElementById("loading-card");
let serv_error_card = document.getElementById("serv-error-card");
let weather_not_found_card = document.getElementById("weather-not-found-card");
let weather_found_card = document.getElementById("weather-found-card");


/* GET MAIN CONTAINER HEIGHT TO MANIPULATE IT'S THE HEIGHT ACCORDING TO RESULT-CONTAINER */
let main_container_initial_height = main_container.offsetHeight;

/* TRIM STRING, REMOVE EXTRA WHITE SPACES */
const trimStr = (str) => {
    let regex = /\s{2,}/;
    str = str.trim();
    str = str.replace(regex, " ");

    return str;
}

/* VALIDATE FORM INPUT */
const validate = (str) => {
    let regexNum = /\d/;
    let regexSpecChar = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    let hasNum = regexNum.test(str); 
    let hasSpecChar = regexSpecChar.test(str);

    if (str.length == 0 || hasNum || hasSpecChar) {
        return false;
    }
    else return true;
}

/* SET CARD VISIBILITY */
const setCardVisibility = (card_list_show, card_list_hide) => {
    for(let element of card_list_show){
        element.style.display = "flex";
    }

    for(let element of card_list_hide){
        element.style.display = "none";
    }
}

/* SET ALL DATA FOR WEATHER-FOUND CARD */
const setData = (data, location) => {
    // inject current weather data
    document.getElementById("location-name").innerHTML = location;
    document.getElementById("location-sky").innerHTML = data.description;
    document.getElementById("location-temp").innerHTML = data.temperature;
    document.getElementById("location-wind").innerHTML = data.wind;

    // inject icons according to the weather
    let { sky_i_elem, temp_i_elem } = getIcon(data.description, data.temperature);

    document.getElementById("sky-icon").innerHTML = `${sky_i_elem}`;
    document.getElementById("temp-icon").innerHTML = `${temp_i_elem}`;

    // inject forecast-weather data
    let forecast_data_table = document.getElementById("forecast-data-table");
    forecast_data_table.innerHTML = "";

    for(let i = 0; i < data.forecast.length; i++) {
        let key = Object.keys(data.forecast[i]);
        let val = Object.values(data.forecast[i]);

        forecast_data_table.innerHTML = forecast_data_table.innerHTML +
            `<p>
                <i class="fa-solid fa-rainbow"></i>
                <span class="bold upr-case"> ${key[0]} : </span>${val[0]} &ensp;&ensp; 
                <span class="bold upr-case"> ${key[1]} : </span>${val[1]} &ensp;&ensp; 
                <span class="bold upr-case"> ${key[2]} : </span>${val[2]}
            </p>`;
    }
}

/* FETCH WEATHER DATA */
const fetchWeather = async (location) => {
    let url = `https://goweather.herokuapp.com/weather/${location}`;
    let response = await fetch(url);

    /* After Fulfillment of Fetch API : when Promise Resolved */
    if (response.ok == true) {
        let data = await response.json();

        // set all data in html document and show weather-found-card
        setData(data, location);
        setCardVisibility([weather_found_card], [loading_card, serv_error_card, weather_not_found_card]);
        main_container.style.height = `${main_container_initial_height + result_container.offsetHeight}px`;
    }
    /* After Fulfillment of Fetch API : when Promise Rejected */
    else {
        // show weather-not-found-card
        document.getElementById("nf-location-name").innerHTML = location;
        setCardVisibility([weather_not_found_card], [loading_card, serv_error_card, weather_found_card]);
        main_container.style.height = `${main_container_initial_height + result_container.offsetHeight}px`;
    }
}

/* MAIN FUNCTION */
const main = () => {
    // get location name as value
    let location = search_box.value;
    
    // reset user input field
    search_box.value = null;
    
    // remove extra white spaces from user input
    location = trimStr(location);
    
    // validate user input
    let valid = validate(location);
    
    /* When Input is Not-Valid */
    if (!valid) {
        search_box.placeholder = "*invalid input !!";

        // show no cards
        setCardVisibility([], [loading_card, serv_error_card, weather_not_found_card, weather_found_card]);
        main_container.style.height = `${main_container_initial_height + result_container.offsetHeight}px`;
    }
    /* When Input is Valid */
    else {
        search_box.placeholder = "Enter Location here";

        /* On-Progress : show loading-card */
        setCardVisibility([loading_card], [serv_error_card, weather_not_found_card, weather_found_card]);
        main_container.style.height = `${main_container_initial_height + result_container.offsetHeight}px`;
        
        /* On-Load : */
        fetchWeather(location)
            .catch((error) => {
                // when server unreachable, show server-error-card
                setCardVisibility([serv_error_card], [loading_card, weather_not_found_card, weather_found_card]);
                main_container.style.height = `${main_container_initial_height + result_container.offsetHeight}px`;

                console.log(error.name + " : " + error.message);
            });
    }
}

export default main;