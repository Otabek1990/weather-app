import React,{useState,useRef} from 'react';
import './weather.css';
import axios from 'axios'



const Weather=() => {

  const Api_Key="75ced55da7174c4764fbb1897da6af5b";
  const[weather,setWeather]=useState({});
  const[query,setQuery]=useState('');
  const [errorMessage, setErrorMessage] = useState("")
  const inputRef = useRef(null)
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
const searching = ()=> {
  
 axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${Api_Key}`)

 .then(responce=>{

  setWeather(responce.data);
  console.log(responce.data);
  console.log(query)
  setQuery('');

 })
 .catch(error=>{
  console.log(error.message)
  setErrorMessage(" Sorry not found such name.Please write the name correctly")
 })
 console.log(query)



};
 console.log(errorMessage)

const submitInput=(e)=>{
  inputRef.current.focus()
  e.preventDefault()
  setQuery("")
  setErrorMessage("")
  searching();
 
}


//---------------------------------------------

  return(

<div className={(typeof weather.main!="undefined") && (weather.main.temp-273<20) ? "apps": "app"}>

  <main>
    <div className="search-box">
    <form 
         onSubmit={submitInput}
        >
     <input 
      ref={inputRef}
      type="text"
      className="search-bar"
       placeholder="Enter the name of city..."
       onChange={(e)=>setQuery(e.target.value)}
       value={query}
       />
       </form>
      
    </div>
  { errorMessage ? (
 <h1 className="error_msg">{errorMessage}</h1>
 ):(typeof weather.main !="undefined"  ) && (typeof weather.sys!="undefined" )  && errorMessage==="" ? (

    <div className="location">
      <div className="location-name">{weather.name}, {weather.sys.country}</div>
       <div className="location-time">{weatherInfo(new Date())}</div>
       <div className="location-gradus">{Math.round(weather.main.temp-273)}°c</div>
       <div className="location-infos">{weather.main.temp-273<10? "Cold": weather.main.temp-273<25? "Warm":"Hot"}</div>


    </div>
):null
 }
  </main>

 </div>

    )
}



export default Weather;
