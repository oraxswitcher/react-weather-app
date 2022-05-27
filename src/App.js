import {useState} from 'react'





const API = {
  key: "6db0e956f4f34370a9e164000222605",
  base: "http://api.weatherapi.com/v1/current.json?",
};

function App() {
  const [time,setTime]= useState('')
  const [query,setQuery] = useState('')
  const [weather, setWeather] = useState({});

  
  const search = (evt) =>{
    if(evt.key === 'Enter'){
      fetch(`${API.base}key=${API.key}&q=${query}&aqi=no}`)
      .then(res => res.json())
      .then(data => {
        setWeather(data)
        setQuery('')
        console.log(data)
      })
    }
  }


  const showDay = (d)=>{
    const months = ['January','February','Mars','April','May','Juin','july','August','September','Octobre','November','December'];
    const days = ['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday'];

    let date = d.getDate();
    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  setInterval(() => {

      let t = new Date ()
    
      let seconds = t.getSeconds()
      let minute = t.getMinutes();
      let hour = t.getHours();

      setTime(`${hour}:${(minute.toString().length===1 ? `0${minute.toString()}`: minute)}:${(seconds.toString().length ===1 ? `0${seconds.toString()}`:seconds)}`) 
    

    }, 10);
    


  
  return (
    <>
      <div className="back-img"></div>
      <div className="app">
        <div className={(typeof weather.current)=== "undefined"? "container container0":(weather.current.condition.text).includes('sunny')?'container container0':(weather.current.condition.text).includes('cloud' || 'Overcast')? 'container container1':(weather.current.condition.text).includes('rain')?'container container2':'container container0'}>
          <input type="search" name="search" id="haha" placeholder="Search for location" onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}/>
          {(typeof weather.current) !== 'undefined' ? (
            <>
              <div className="info">
                <h2>{weather.location.name},{weather.location.country}</h2>
                <h3>{showDay(new Date())}</h3>
                <h3>{time}</h3>
              </div>
              <div className="temp">
                <h2>{weather.current.temp_c}°C</h2>
              </div>
              <h2 className="cl">{weather.current.condition.text}</h2>
              <div className="humwin">
                <h4>humidity: <span>{weather.current.humidity}</span>%</h4>
                <h4>wind speed: <span>{weather.current.wind_kph}</span>kph</h4>
              </div>
            </>
          ):(<>
              <div className="info">
                <h2>No location</h2>
              </div>
            </>)}
          
        </div>
      </div>
    </>
  );
}

export default App;
