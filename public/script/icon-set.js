/* ICONS DATA SET */ 
let iconSet = {
    "sky": {
        "Sunny": `<i class="fa-solid fa-sun"></i>`,
        "Clear": `<i class="fa-solid fa-moon"></i>`,
        "Partly cloudy": `<i class="fa-solid fa-cloud-sun"></i>`,
        "Heavy snow": `<i class="fa-regular fa-snowflake"></i>`,
        "Patchy rain possible": `<i class="fa-solid fa-cloud-sun-rain"></i>`,
        "Moderate or heavy rain shower": `<i class="fa-solid fa-cloud-showers-heavy"></i>`,
        "Moderate or heavy rain": `<i class="fa-solid fa-cloud-showers-heavy"></i>`,
        "Moderate rain shower": `<i class="fa-solid fa-cloud-showers-heavy"></i>`,
        "Moderate rain": `<i class="fa-solid fa-cloud-showers-heavy"></i>`,
        "rain": `<i class="fa-solid fa-cloud-showers-heavy"></i>`,
        "Heavy rain shower": `<i class="fa-solid fa-cloud-showers-water"></i>`,
        "Heavy rain": `<i class="fa-solid fa-cloud-showers-water"></i>`,
        "Light rain shower": `<i class="fa-solid fa-cloud-rain"></i>`,
        "Light rain": `<i class="fa-solid fa-cloud-rain"></i>`,
    },

    "temperature": {
        0: `<i class="fa-solid fa-temperature-arrow-down"></i>`,
        1: `<i class="fa-solid fa-temperature-empty"></i>`,
        2: `<i class="fa-solid fa-temperature-quarter"></i>`,
        3: `<i class="fa-solid fa-temperature-half"></i>`,
        4: `<i class="fa-solid fa-temperature-three-quarters"></i>`,
        5: `<i class="fa-solid fa-temperature-arrow-up"></i>`,
    }
}

/* SELECT ICON ACCORDING TO THE SKY */
let selectSkyIcon = (sky_desc) => {
    let sky_i_elem = `<i class="fa-solid fa-cloud-sun-rain"></i>`;
    
    for (let key in iconSet.sky) {
        if (key == sky_desc) {
            sky_i_elem = iconSet.sky[key];
            break;
        }
    }

    return sky_i_elem;
}

/* SELECT ICON ACCORDING TO THE TEMPERATURE */
let selectTempIcon = (temp) => {
    let temp_i_elem;

    if (Number.parseInt(temp) <= 0) {
        temp_i_elem = iconSet.temperature['0'];
    }
    else if ((Number.parseInt(temp) >= 1) && (Number.parseInt(temp) <= 10)) {
        temp_i_elem = iconSet.temperature['1'];
    }
    else if ((Number.parseInt(temp) >= 11) && (Number.parseInt(temp) <= 20)) {
        temp_i_elem = iconSet.temperature['2'];
    }
    else if ((Number.parseInt(temp) >= 21) && (Number.parseInt(temp) <= 30)) {
        temp_i_elem = iconSet.temperature['3'];
    }
    else if ((Number.parseInt(temp) >= 31) && (Number.parseInt(temp) <= 40)) {
        temp_i_elem = iconSet.temperature['4'];
    }
    else {
        temp_i_elem = iconSet.temperature['5'];
    }

    return temp_i_elem;
}

/* GET ICON FOR SKY AND TEMPERATURE*/
let getIcon = (sky_desc, temp) => {
    let sky_i_elem = selectSkyIcon(sky_desc);
    let temp_i_elem = selectTempIcon(temp);

    return { sky_i_elem, temp_i_elem };
}

export default getIcon;