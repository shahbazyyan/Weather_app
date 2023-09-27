import React from "react";
import  '../WeatherApp/WeatherApp.css';
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

  async function  search (selector) {
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

             humidityElem[0].innerHTML = Math.floor(data.main.humidity) + "%";
             windElem[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
             tempElem[0].innerHTML = Math.floor(data.main.temp) + "°C";
             locationElem[0].innerHTML = data.name;
             
    }
    

    return (
        <div className="container">
            <div className="top_bar">
               <input type="text" className="cityName" placeholder="Search"/>
               <div className="search-icon" onClick={() => {
                search("cityName");
               }}>
                <img src={search_icon} alt="search" />
               </div>
            </div>
            <div className="weather_icon">
                <img src={cloud} alt="cloud"/>
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
        
    )
}

export default WeatherApp;