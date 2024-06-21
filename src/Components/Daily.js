import React from "react";
import "./daily.css";
import styles from "./daily.css";
import log from "./images/clouds.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function Daily() {
  // const [i , seti] = useState(0);
  const [iconsContainerVisible, setIconsContainerVisible] = useState(true);
  const [aqiContainerVisible, setAqiContainerVisible] = useState(true);
  // async function fetchData() {
  //     try {
  //         const response = await fetch('https://api.waqi.info/feed/'+newName.value+'/?token=362fd0e01d4f28069afd4feb9319b9545125d3e5');
  //         const data = await response.json();
  //         return data.data.aqi;
  //     } catch (error) {
  //         console.error('Error fetching data:', error);
  //     }
  // }

  function GetInfo() {
    var citName = document.getElementById("cityInput").value;
    console.log(citName);
    setAqiContainerVisible(false);
    setAqiContainerVisible(false);
    const element = document.getElementById("local");
    if (!element.classList.contains("block")) {
      element.classList.add("block");
      console.log("sfgvbh");
    }
    var newName = document.getElementById("cityInput");
    var cityName = document.getElementById("cityName");
    cityName.innerHTML = "--" + newName.value + "--";

    console.log("Every");
    async function fetchData(citName) {
      let url =
        "https://api.waqi.info/feed/" +
        citName +
        "/?token=362fd0e01d4f28069afd4feb9319b9545125d3e5";
      try {
        let response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        let data = await response.json();
        console.log(data);
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }

      //         try {
      //             const response = await fetch('https://api.waqi.info/feed/'+newName.value+'/?token=362fd0e01d4f28069afd4feb9319b9545125d3e5');
      //             const data = await response.json();
      //             return data.data.aqi;
      //         } catch (error) {
      //             console.error('Error fetching data:', error);
      //         }
    }

    function updateAQIRepresentation(aqi) {
      const aqiCircle = document.getElementById("aqicircle");
      console.log(aqi);
      aqiCircle.textContent = aqi.data.aqi;

      if (aqi <= 50) {
        aqiCircle.className = "good";
      } else if (aqi <= 100) {
        aqiCircle.className = "moderate";
      } else {
        aqiCircle.className = "unhealthy";
      }
    }

    async function updateAQI(citName) {
      try {
        const aqi = await fetchData(citName);
        updateAQIRepresentation(aqi);
        console.log(aqi);
      } catch (error) {
        console.error("Error updating AQI:", error);
      }
    }

    updateAQI(citName);

    setInterval(updateAQI, 5 * 60 * 1000);

    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        citName +
        "&appid=ce43e15daba37b83f3c9290def769506"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        var hiddenElements = document.getElementById("weatherContainer");
        hiddenElements.style.display = "block";
        var i = 0;
        // for(i = 0; i<5; i=i+1){
        //     console.log( document.getElementById("day1Min"))

        // }
        for (i = 0; i < 5; i = i + 1) {
          let currentDay = parseInt(data.list[i].dt_txt.slice(8, 10));
          document.getElementById("day" + (i + 1) + "Max").innerHTML =
            "Max: " +
            Number(data.list[i].main.temp_max - 273.15).toFixed(2) +
            "°";
          document.getElementById("day" + (i + 1) + "Min").innerHTML =
            "Min: " +
            Number(data.list[i].main.temp_min - 273.15).toFixed(2) +
            "°";
          document.getElementById("time" + (i + 1)).innerHTML =
            data.list[i].dt_txt.slice(0, 8) + " " + (currentDay + i);
        }

        for (let i = 0; i < 5; i++) {
          const mainCondition = data.list[i].weather[0].main;
          console.log("Main condition:", mainCondition);
          if (mainCondition === "Clouds") {
            document.getElementById("img" + (i + 1)).src = log; // Updated path to clouds.jpg
          } else if (mainCondition === "Rain") {
            document.getElementById("img" + (i + 1)).src =
              "styles/images/rain.jpg"; // Corrected path
          } else if (mainCondition === "Clear") {
            document.getElementById("img" + (i + 1)).src =
              "styles/images/sun.jpg"; // Corrected path
          }
        }
        console.log(data);
      })
      .catch((err) =>
        console.log(
          "Something Went Wrong: Try Checking Your Internet Coneciton"
        )
      );
  }

  var d = new Date();
  var weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function CheckDay(day) {
    if (day + d.getDay() > 6) {
      return day + d.getDay() - 7;
    } else {
      return day + d.getDay();
    }
  }
  let co;
  function callbylatlon(latitude, longitude, successCallback, errorCallback) {
    if (latitude.length !== 0 && longitude.length !== 0) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=a9553eeffc4cfe23a2011d3fb64edc72`
      )
        .then((response) => response.json())
        .then((data) => {
          co = [
            data.main.temp,
            data.main.humidity,
            data.weather[0].main,
            data.weather[0].description,
          ];
          console.log(
            "Successfully fetched weather:",
            data.weather[0].main,
            data.weather[0].description
          );
          // Invoke the success callback
          successCallback(data);
          createlocal(co);
          // Determine weather URL and set background {styles.image}
          document.body.style.backgroundSize = "cover";
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);

          // Invoke the error callback
          errorCallback(error);
        });
    } else {
      // If latitude or longitude is not available
      console.warn("Please give location permission");

      // Invoke the error callback
      errorCallback("Location permission not granted");
    }
  }

  // Example usage:
  const successCallback = (data) => {
    console.log("Success callback with data:", data);
    // Handle the success scenario, e.g., update UI
  };

  const errorCallback = (error) => {
    console.error("Error callback with error:", error);
    // Handle the error scenario, e.g., display an error message
  };

  // Call the function with latitude, longitude, success callback, and error callback

  const getLocation = () => {
    // document.getElementById("iconsContainer").style.display = "none";
    // document.getElementById("aqi-container").styles.display = "none";
    setAqiContainerVisible(true);
    setAqiContainerVisible(true);
    console.log("get");
    document.getElementById("local").classList.toggle("block");
    document.getElementById("local").innerHTML = "";
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Your logic with latitude and longitude
          console.log("Latitude:", latitude);
          console.log("Longitude:", longitude);
          callbylatlon(latitude, longitude, successCallback, errorCallback);
        },
        (error) => {
          console.error("Error getting geolocation:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  function createlocal(co) {
    let cont = document.createElement("div");
    console.log(co[0]);
    document.getElementById("cityName").innerHTML = "";
    // Your SVG code as a string
    let svgString = `<svg width="155px" height="155px" viewBox="-30 -30 560.00 560.00" id="Layer_1" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" stroke="#000000" stroke-width="1.5"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(20,20), scale(0.92)"><rect x="-30" y="-30" width="560.00" height="560.00" rx="280" fill="#7ed0ec" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="21"> <style type="text/css"> .st0{fill:#F26E91;} .st1{fill:#00A779;} .st2{fill:#C4FFC9;} .st3{fill:#AB630A;} .st4{fill:#C98C40;} .st5{fill:#15AA78;} .st6{fill:#FF9000;} .st7{fill:#FCEECF;} .st8{fill:#FFE940;} .st9{fill:#F0E3CE;} .st10{fill:#FFB5C5;} .st11{fill:#91EDFF;} .st12{fill:#7191F0;} .st13{fill:#363636;} .st14{fill:#565656;} .st15{fill:#F3DF4D;} .st16{fill:#CD4A77;} .st17{fill:#577AE6;} .st18{fill:#F4D100;} </style> <g id="sun"> <circle className="st8" cx="249.83" cy="255.63" r="142.54"></circle> <g> <path className="st8" d="M252.32,29.09l32.12,55.63c1.11,1.92-0.28,4.31-2.49,4.31l-64.23,0c-2.21,0-3.6-2.39-2.49-4.31l32.12-55.63 C248.45,27.17,251.21,27.17,252.32,29.09z"></path> <path className="st8" d="M399.68,86.23l-13.32,62.83c-0.46,2.16-3.09,3.02-4.73,1.54l-47.76-42.95c-1.64-1.48-1.07-4.18,1.03-4.87 l61.08-19.88C398.08,82.21,400.14,84.06,399.68,86.23z"></path> <path className="st8" d="M474.27,222.89l-50.62,39.54c-1.74,1.36-4.31,0.33-4.62-1.87l-8.93-63.61c-0.31-2.19,1.87-3.89,3.92-3.06 l59.55,24.07C475.62,218.79,476.01,221.52,474.27,222.89z"></path> <path className="st8" d="M439.63,378.98l-64.12-3.7c-2.21-0.13-3.45-2.6-2.24-4.45l35.27-53.68c1.21-1.85,3.98-1.69,4.97,0.29 l28.86,57.38C443.36,376.79,441.84,379.11,439.63,378.98z"></path> <path className="st8" d="M330.43,466.26l-50.03-40.29c-1.72-1.39-1.3-4.12,0.77-4.92l59.9-23.18c2.06-0.8,4.22,0.94,3.88,3.12 l-9.87,63.47C334.73,466.65,332.15,467.65,330.43,466.26z"></path> <path className="st8" d="M98.13,87.32l13.32,62.83c0.46,2.16,3.09,3.02,4.73,1.54l47.76-42.95c1.64-1.48,1.07-4.18-1.03-4.87 l-61.08-19.88C99.73,83.31,97.67,85.16,98.13,87.32z"></path> <path className="st8" d="M25.7,223.42l50.03,40.29c1.72,1.39,4.3,0.39,4.64-1.8l9.87-63.47c0.34-2.19-1.81-3.92-3.88-3.12l-59.9,23.18 C24.41,219.3,23.98,222.03,25.7,223.42z"></path> <path className="st8" d="M58.45,375.79l64.17-2.81c2.21-0.1,3.49-2.55,2.3-4.42L90.4,314.39c-1.19-1.87-3.95-1.74-4.97,0.22 l-29.65,56.98C54.75,373.55,56.23,375.88,58.45,375.79z"></path> <path className="st8" d="M179.88,469.99l-13.32-62.83c-0.46-2.16,1.6-4.01,3.7-3.33l61.08,19.88c2.1,0.68,2.68,3.39,1.03,4.87 l-47.76,42.95C182.97,473.01,180.34,472.16,179.88,469.99z"></path> </g> </g> </g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:#F26E91;} .st1{fill:#00A779;} .st2{fill:#C4FFC9;} .st3{fill:#AB630A;} .st4{fill:#C98C40;} .st5{fill:#15AA78;} .st6{fill:#FF9000;} .st7{fill:#FCEECF;} .st8{fill:#FFE940;} .st9{fill:#F0E3CE;} .st10{fill:#FFB5C5;} .st11{fill:#91EDFF;} .st12{fill:#7191F0;} .st13{fill:#363636;} .st14{fill:#565656;} .st15{fill:#F3DF4D;} .st16{fill:#CD4A77;} .st17{fill:#577AE6;} .st18{fill:#F4D100;} </style> <g id="sun"> <circle className="st8" cx="249.83" cy="255.63" r="142.54"></circle> <g> <path className="st8" d="M252.32,29.09l32.12,55.63c1.11,1.92-0.28,4.31-2.49,4.31l-64.23,0c-2.21,0-3.6-2.39-2.49-4.31l32.12-55.63 C248.45,27.17,251.21,27.17,252.32,29.09z"></path> <path className="st8" d="M399.68,86.23l-13.32,62.83c-0.46,2.16-3.09,3.02-4.73,1.54l-47.76-42.95c-1.64-1.48-1.07-4.18,1.03-4.87 l61.08-19.88C398.08,82.21,400.14,84.06,399.68,86.23z"></path> <path className="st8" d="M474.27,222.89l-50.62,39.54c-1.74,1.36-4.31,0.33-4.62-1.87l-8.93-63.61c-0.31-2.19,1.87-3.89,3.92-3.06 l59.55,24.07C475.62,218.79,476.01,221.52,474.27,222.89z"></path> <path className="st8" d="M439.63,378.98l-64.12-3.7c-2.21-0.13-3.45-2.6-2.24-4.45l35.27-53.68c1.21-1.85,3.98-1.69,4.97,0.29 l28.86,57.38C443.36,376.79,441.84,379.11,439.63,378.98z"></path> <path className="st8" d="M330.43,466.26l-50.03-40.29c-1.72-1.39-1.3-4.12,0.77-4.92l59.9-23.18c2.06-0.8,4.22,0.94,3.88,3.12 l-9.87,63.47C334.73,466.65,332.15,467.65,330.43,466.26z"></path> <path className="st8" d="M98.13,87.32l13.32,62.83c0.46,2.16,3.09,3.02,4.73,1.54l47.76-42.95c1.64-1.48,1.07-4.18-1.03-4.87 l-61.08-19.88C99.73,83.31,97.67,85.16,98.13,87.32z"></path> <path className="st8" d="M25.7,223.42l50.03,40.29c1.72,1.39,4.3,0.39,4.64-1.8l9.87-63.47c0.34-2.19-1.81-3.92-3.88-3.12l-59.9,23.18 C24.41,219.3,23.98,222.03,25.7,223.42z"></path> <path className="st8" d="M58.45,375.79l64.17-2.81c2.21-0.1,3.49-2.55,2.3-4.42L90.4,314.39c-1.19-1.87-3.95-1.74-4.97,0.22 l-29.65,56.98C54.75,373.55,56.23,375.88,58.45,375.79z"></path> <path className="st8" d="M179.88,469.99l-13.32-62.83c-0.46-2.16,1.6-4.01,3.7-3.33l61.08,19.88c2.1,0.68,2.68,3.39,1.03,4.87 l-47.76,42.95C182.97,473.01,180.34,472.16,179.88,469.99z"></path> </g> </g> </g></svg>`;

    // Create a new div to hold the SVG
    let svgDiv = document.createElement("div");
    svgDiv.innerHTML = svgString;

    cont.innerHTML = `<h3>Temperture: ${(co[0] - 273).toFixed(1)}°C</h3>
    <p>Humidity: ${co[1]}</p>`;

    // Append the SVG to the div
    cont.appendChild(svgDiv);

    let sho = document.getElementById("local");
    sho.appendChild(cont);
  }
  function handle() {
    console.log("sdvjbsfv");
  }

  return (
    <div>
      <div className="d-flex" role="search" id="colour">
        <input
          className="form-control me-2"
          placeholder="Enter your city name"
          id="cityInput"
          type="search"
          aria-label="Search"
        />
        <button
          className="btn btn-outline-primary enter"
          onClick={GetInfo}
          id="myBtn"
          type="submit"
        >
          Search
        </button>
      </div>
      <button onClick={getLocation} id="location">
        <img
          id="locate"
          src="images/—Pngtree—red location icon sign_7886920.png"
        />
      </button>

      <h2 id="cityName"></h2>

      <div
        id="weatherContainer"
        className="containerweather"
        style={{ display: aqiContainerVisible ? "" : "none" }}
      >
        <div id="aqicontainer">
          <h2>Air Quality Index (AQI)</h2>
          <div id="aqicircle">Loading...</div>
          <Link to="/News" onClick={handle} className="read-more-button">
            Read More
          </Link>
        </div>

        <div id="iconsContainer" className="bl">
          <div className="icons">
            <p id="time1">Loading...</p>
            <p className="weather" id="day1"></p>
            <div className="image">
              <img src="images/night.jpg" className="imgclassName" id="img1" />
            </div>
            <p className="minValues" id="day1Min">
              Loading...
            </p>
            <p className="maxValues" id="day1Max">
              Loading...
            </p>
          </div>
          <div className="icons">
            <p id="time2">Loading...</p>
            <p className="weather" id="day2"></p>
            <div className="image">
              <img src="dots.png" className="imgclassName" id="img2" />
            </div>
            <p className="minValues" id="day2Min">
              Loading...
            </p>
            <p className="maxValues" id="day2Max">
              Loading...
            </p>
          </div>
          <div className="icons">
            <p id="time3">Loading...</p>
            <p className="weather" id="day3"></p>
            <div className="image">
              <img src="dots.png" className="imgclassName" id="img3" />
            </div>
            <p className="minValues" id="day3Min">
              Loading...
            </p>
            <p className="maxValues" id="day3Max">
              Loading...
            </p>
          </div>
          <div className="icons">
            <p id="time4">Loading...</p>
            <p className="weather" id="day4"></p>
            <div className="image">
              <img src="dots.png" className="imgclassName" id="img4" />
            </div>
            <p className="minValues" id="day4Min">
              Loading...
            </p>
            <p className="maxValues" id="day4Max">
              Loading...
            </p>
          </div>
          <div className="icons">
            <p id="time5">Loading...</p>
            <p className="weather" id="day5"></p>
            <div className="image">
              <img src="dots.png" className="imgclassName" id="img5" />
            </div>
            <p className="minValues" id="day5Min">
              Loading...
            </p>
            <p className="maxValues" id="day5Max">
              Loading...
            </p>
          </div>
        </div>
      </div>

      <div id="local" className="block"></div>
    </div>
  );
}
