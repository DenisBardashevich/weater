const apiKey = "6cd15a3b87554316a16201624240705";

const header = document.querySelector("header");
const form = document.querySelector("#form");
const input = document.querySelector("#inputCity");
const wednesday_temp = document.querySelector("wednesday_temp");



async function getWeather(city) {
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    const responce = await fetch(url);
    const data = await responce.json();
    const City_Time = data.location.tz_id;
    // Подключение времени
    let time_location = data.location.localtime;
    let time_date = new Date(time_location);
    let hours = time_date.getHours();
    let min = time_date.getMinutes();

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (min < 10) {
        min = "0" + min;
    }

    let times = hours + ":" + min;
    // Подключение даты
    let dates = time_date.getDate();
    let months = [
        "Января",
        "Февраля",
        "Марта",
        "Апреля",
        "Мая",
        "Июня",
        "Июля",
        "Августа",
        "Сентября",
        "Октября",
        "Ноября",
        "Декабря",
    ];
    let month = months[time_date.getMonth()];

    document.getElementById("City-name").innerHTML = data.location.name;
    document.getElementById("Country-name").innerHTML = data.location.country;
    document.getElementById("temp").innerHTML = data.current.temp_c;
    document.getElementById("humidity").innerHTML = data.current.humidity;
    document.getElementById("speed").innerHTML = data.current.wind_kph;

    document.getElementById("month").innerHTML = month;
    document.getElementById("dates").innerHTML = dates;
    document.getElementById("times").innerHTML = times;
}

// Создание карт
let map;


ymaps.ready(initMap);

function initMap() {
    
    map = new ymaps.Map("map", {
        center: [0, 0],
        zoom: 12,
    });

    map.controls.remove("searchControl");
    map.controls.remove("trafficControl");
    map.controls.remove("typeSelector");
    map.controls.remove("rulerControl");
}

form.onsubmit = function (event) {
    event.preventDefault();
    

    let City = input.value.trim();
    document.getElementById("cordinats_name").innerHTML = City;

    getWeather(City);
    updateMap(City);
    clearSearch();
};

function updateMap(city) {
    ymaps.geocode(city).then(function (res) {
        let coordinates = res.geoObjects.get(0).geometry.getCoordinates();
        document.getElementById("cordinats").innerHTML = coordinates.join(", ");

        map.setCenter(coordinates); // Обновление центра карты
    });
}

function clearSearch() {
    input.value = '';
}
