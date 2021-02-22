import React,{useState} from 'react';
import './weather.css';



const Weather=() => {

  const Api_Key="75ced55da7174c4764fbb1897da6af5b";
  //const[search,setSearch]=useState("");
  const[weather,setWeather]=useState({});
  const[query,setQuery]=useState('');
//----------------------------------------------

const weatherInfo=(d)=>{
const months=["January", "February","March", "April", "May", "June", "July",
  "August", "September","October", "November", "December"];

const days=["Sunday", "Monday", "Tuesday","Wednesday","Thursday",
"Friday","Saturday"]

const day=days[d.getDay()];
const date=d.getDate();
const month=months[d.getMonth()];
const year=d.getFullYear();
return `${day} ${date} ${month} ${year}`

}

//---------------
const searching = event => {
    if(event.key==="Enter") {
 fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${Api_Key}`)
 .then(res=> res.json())
 .then(result=>{
  setWeather(result);
  setQuery("");
 
 });
  }

};

//---------------------------------------------

  return(

<div className={(typeof weather.main!="undefined") && (weather.main.temp-273<20) ? "apps": "app"}>

  <main>
    <div className="search-box">
     <input 
      type="text"
      className="search-bar"
       placeholder="Enter the name of city..."
       onChange={(e)=>setQuery(e.target.value)}
       value={query}
       onKeyPress={searching}
       />
      
    </div>
  {(typeof weather.main !="undefined"  ) && (typeof weather.sys!="undefined" )?(

    <div className="location">
      <div className="location-name">{weather.name}, {weather.sys.country}</div>
       <div className="location-time">{weatherInfo(new Date())}</div>
       <div className="location-gradus">{Math.round(weather.main.temp-273)}°c</div>
       <div className="location-infos">{weather.main.temp-273<10? "Cold": weather.main.temp-273<25? "Warm":"Hot"}</div>


    </div>): ("") }
  </main>

 </div>

    )
}



export default Weather;
