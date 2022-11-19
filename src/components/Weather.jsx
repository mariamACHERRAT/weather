
import React,{ useState,useEffect } from 'react';



const Weather = () => {
    const[search,setSearch]=useState("london");
    const[data,setData]=useState([]);
    const[input,setInput]=useState("");
    let componentMounted=true;

    useEffect(()=>{
        const fetchW=async ()=>{
          
            const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=dc0a0b23b2f84832abb9aa23e75bf7b5`)
   
            if(componentMounted){
            setData(await response.json())
        }
        return ()=>{
            componentMounted=false;
        }
        }
        fetchW();
    },[search]);
    let em=null;
    if(typeof data.main!= "undefined"){
        if(data.weather[0].main=="Clouds"){em="fa-cloud"}
        else if(data.weather[0].main=="Thunderstrom"){em="fa-bolt"}
        else if(data.weather[0].main=="Drizzle"){em="fa-cloud-rain"}
        else if(data.weather[0].main=="Rain"){em="fa-cloud-shower-heavy"}
        else if(data.weather[0].main=="Snow"){em="fa-snow-flake"}
        else{em="fa-smog"}

    }else{
        return(
            <div>....Loading</div>
        )
    }
    let temp = (data?.main?.temp - 273.15).toFixed(2);
    let temp_min = (data?.main?.temp_min - 273.15).toFixed(2);
    let temp_max = (data?.main?.temp_max - 273.15).toFixed(2);


    let d=new Date();
    let date=d.getDate();
    let year=d.getFullYear();
    let month=d.toLocaleString("default",{month:'long'});
    let day=d.toLocaleString("default",{weekday:'long'});


    let time=d.toLocaleString([],{hour:'2-digit',minute:'2-digit',second:'2-digit'});

    const hadleSubmit=(event)=>{
        event.preventDefault();
        setSearch(input);
    }

    
    return (
        <div>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div class="card text-white text-center border-0">
                            
                            <div class="card-img-overlay">
                                <form onSubmit={hadleSubmit}>
                                    <div class="input-group mb-4 w-75 mx-auto">
                                        <input type="search" class="form-control" placeholder="Search City" aria-label="Search City" aria-describedby="button-addon2" name="search" value={input} onChange={(e)=>setInput(e.target.value)}/>
                                            <button class="inut-group-text" type="submit" id="button-addon2"><i className='fas fa-search'></i></button>
                                    </div>
                               
                                </form>
                                <div className="bg-dark bg-opacity-50 py-3">
                                <h2 class="card-title">{data.name}</h2>
                                <p class="card-text lead">
                                    {day},{month} {date},{year} <br/> {time}

                                </p>
                                <hr/>
                                <i className={`fas ${em} fa 4x`}></i>
                                <h1>{temp} &deg;c</h1>
                                <p className="lead fw-border mb-0" > {data.weather && data.weather !== 'undefined' && data.weather.length ? data.weather[0].main : ''}</p>
                                <p className="lead">{temp_min}&deg;c - {temp_max}&deg;c</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
export default Weather;