import { useEffect, useState } from "react";
import "./App.css";
import logo from "./assets/images/logo.svg";
import outline2 from "./assets/images/outline (2).png";
import outline1 from "./assets/images/outline (1).png";
import outline from "./assets/images/outline.png";
import vector from "./assets/images/Vector.png";
import mintemp from "./assets/images/Vector (2).png";
import maxtemp from "./assets/images/Vector (1).png";
import axios from "axios";

function App() {
  const [cityName, setcityName] = useState("");
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");
  const [error,setError] = useState(false)
  const [weatherData, setWeatheData] = useState(null);
  console.log(cityName);
  const baseUrl = "https://api.openweathermap.org";
  const apiKey = `bb6451adcc9652478985bc7278005271`;

  const now = new Date();

  // Get hours and minutes
  let hours = now.getHours().toString().padStart(2, "0");
  let minutes = now.getMinutes().toString().padStart(2, "0");

  // Get weekday and date
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekday = days[now.getDay()];
  let day = now.getDate();

  // Get month short name
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];

  // Get 2-digit year
  let year = now.getFullYear().toString().slice(-2);

  // Final format
  let formatted = `${hours}:${minutes} - ${weekday}, ${day} ${month} ‘${year}`;
  console.log(formatted);


useEffect(() => {
  
  if (!city) return;

  const interval = setInterval(() => {
    console.log("Data is Refreshing...");
    getWeather(city);
  }, 300000); 

  // Cleanup the interval when city changes or component unmounts
  return () => clearInterval(interval);
}, [city]); // depend on 'city'


  async function getWeather(cityName) {
    try {
      if (cityName) {
        setLoading(true);
        const data = await axios.get(
          `${baseUrl}/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
        );

        
        setWeatheData(data.data);
        setCity(cityName);
       
        if (data.cod !== 200) return;


        console.log(data.data);
      }
    } catch (error) {
      console.log(error);
      if (error ){
        setError(true)
      }

    } finally {
      setLoading(false);
    }
  }

  const handelChange = (e) => {
    setcityName(
      e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1), 
    
    );
  
  };
  
  return (
    <>
      <div className="main-container">
        <div className="container">
          <div className="part1">
            <div className="logo">
              <img src={logo} alt="" />
            </div>

            <div className="modified">
              <div className="logodub">
                <img src={logo} alt="" onClick={() => getWeather(cityName)} />
              </div>
              <div>
                <div className="searchdub">
                  <input 
                    type="text"
                    name="text"
                    id="city-input-1"
                    value={cityName}
                    placeholder="Search Location... "
                    autoComplete="off"
                    onChange={(e) => handelChange(e)}
onKeyDown={(e) => {
    if (e.key === "Enter" && cityName.trim()) {
      getWeather(cityName);
      setcityName("");
    }
  }}         
           />
                  <div className="searchimgdub">
                    <img src={vector} alt="" id="mybutton-1" />
                  </div>
                </div>
                <div className="linedub"></div>
              </div>
            </div>
            {weatherData && (
              <div className="temp-info">
                <div>
                  <p id="temperature">{Math.floor(weatherData?.main?.temp)}°</p> 
                </div>
                <div className="city-info">
                  <p id="city">{city}</p>
                  <small id="info">{formatted}</small> 
                </div>
              </div>
            )}
          </div>

          <div className="housing">
            <div className="weather-house">
              <div className="search">
                <input
                  type="text"
                  name="text"
                  id="city-input-2"
                  placeholder="Search Location... "
                  autoComplete="off"
                  value={cityName}
                  onChange={(e) => handelChange(e)}
                  onKeyDown={(e) => {
    if (e.key === "Enter" && cityName.trim()) {
      getWeather(cityName);
      setcityName("");
    }
  }}
                />
                <div className="searchimg">
                  <img
                    src={vector}
                    alt=""
                    onClick={() => getWeather(cityName)}
                    id="mybutton-2"
                  />
                </div>
              </div>
              <div className="line"></div>

              <p className="details">Weather Details...</p>

              <div id="weather-resort">
                {loading && <p>Loading...</p>}
                {error && <p>Error fetching weather details <br/> Make sure you are connected to the internet.</p>}
                {weatherData && (
                  <>
                    <div class="weatherdiv">
                      <p>Temp max</p>
                      <div className="plus-img">
                        {" "}
                        <div className="data">
                          {" "}
                          {weatherData?.main?.temp_max}°
                        </div>
                        <div>
                          <img src={maxtemp} />{" "}
                        </div>
                      </div>
                    </div>

                    <div class="weatherdiv">
                      <p>Temp min</p>
                      <div class="plus-img">
                        {" "}
                        <div class="data"> {weatherData?.main?.temp_min}° </div>
                        <div>
                          <img src={mintemp} />{" "}
                        </div>
                      </div>
                    </div>
                    <div class="weatherdiv">
                      <p>Humidity</p>
                      <div class="plus-img">
                        {" "}
                        <div class="data"> {weatherData?.main?.humidity}% </div>
                        <div>
                          <img src={outline} />{" "}
                        </div>
                      </div>
                    </div>
                    <div class="weatherdiv">
                      <p>Cloudy</p>
                      <div class="plus-img">
                        {" "}
                        <div class="data"> {weatherData?.clouds?.all}% </div>
                        <div>
                          <img src={outline1} />{" "}
                        </div>
                      </div>
                    </div>
                    <div class="weatherdiv">
                      <p>Wind</p>
                      <div class="plus-img">
                        {" "}
                        <div class="data"> {weatherData?.wind?.speed}m/s </div>
                        <div>
                          <img src={outline2} />{" "}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="lines" id="lines"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
