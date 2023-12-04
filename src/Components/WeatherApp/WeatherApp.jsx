import React, { useState } from "react";
import '../WeatherApp/WeatherApp.css';
import clear from './img/clear.png';
import cloud from './img/cloud.png';
import snow from './img/snow.png';
import rain from './img/rain.png';
import drizzle from './img/drizzle.png';
import humidity from './img/humidity.png';
import wind from './img/wind.png';
import search_icon from './img/search.png';

const WeatherApp = () => {

    let apiKey = `d1088573ac88f21d423eaebe31a56664`;
    const [icon, setIcon] = useState(clear);

    async function search(selector) {
        const elem = document.getElementsByClassName(selector);
        if (elem[0].value === "") {
            return 0;
        }

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${elem[0].value}&units=Metric&appid=${apiKey}`;

        let res = await fetch(url);
        let data = await res.json();

        const humidityElem = document.getElementsByClassName("humidity_percent");
        const windElem = document.getElementsByClassName("wind_km");
        const tempElem = document.getElementsByClassName("temp");
        const locationElem = document.getElementsByClassName("location");

        if (data.ok === false) {
            alert("Something is wrong!");
        } else {
            if (data.main && data.main.humidity !== undefined) {
                humidityElem[0].innerHTML = Math.floor(data.main.humidity) + "%";
            }
            if (data.wind && data.wind.speed !== undefined) {
                windElem[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
            }
            if (data.main && data.main.temp !== undefined) {
                tempElem[0].innerHTML = Math.floor(data.main.temp) + "°C";
            }
            if (data.name) {
                locationElem[0].innerHTML = data.name;
            }
        
            // Check for the presence of data.weather and data.weather[0].icon
            if (data.weather && data.weather[0] && data.weather[0].icon) {
                const iconCode = data.weather[0].icon;
                if (iconCode === "01d" || iconCode === "01n") {
                    setIcon(clear);
                } else if (iconCode === "02d" || iconCode === "02n") {
                    setIcon(cloud);
                } else if (iconCode === "03d" || iconCode === "03n" || iconCode === "04d" || iconCode === "04n") {
                    setIcon(drizzle);
                } else if (iconCode === "09d" || iconCode === "09n" || iconCode === "10d" || iconCode === "10n") {
                    setIcon(rain);
                } else if (iconCode === "13d" || iconCode === "13n") {
                    setIcon(snow);
                } else {
                    setIcon(clear);
                }
            }
        }
        
    };

    return (
        <div className="main">
           <p>Check Real Time Weather Around The Word</p> 
            <div className="container">
                <div className="top_bar">
                    <input type="text" className="cityName" placeholder="Search" />
                    <div className="search-icon" onClick={() => {
                        search("cityName");
                    }}>
                        <img src={search_icon} alt="search" />
                    </div>
                </div>
                <div className="weather_icon">
                    <img src={icon} alt="cloud" />
                </div>
                <div className="temp">22°C</div>
                <div className="location">Yerevan</div>
                <div className="data_container">
                    <div className="elems">
                        <img src={humidity} alt="humidity" />
                        <div className="data">
                            <div className="humidity_percent">50%</div>
                            <div className="humidity_text">Humidity</div>
                        </div>
                    </div>
                    <div className="elems">
                        <img src={wind} alt="wind" />
                        <div className="data">
                            <div className="wind_km">5 km/h</div>
                            <div className="wind_text">Wind Speed</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp;