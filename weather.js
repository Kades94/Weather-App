window.addEventListener('load', () =>{
  let long;
  let lat;
  let city = document.getElementById('city');
  let summary = document.getElementById('summary');
  let temp = document.getElementById('temp');
  let today = document.getElementById('today');
  let date = new Date();
  var day = date.getDay();
  var hour = date.getHours();
  let text = document.getElementById('text');
  let rain = document.getElementById('rain');
  let wind = document.getElementById('wind');
  let visibility= document.getElementById('visibility');
  let humidity= document.getElementById('humidity');
  let feelsLike= document.getElementById('feels');
  let pressure= document.getElementById('pressure');

  

//Get the days of the week  and push into array
  let days = [];
  for (i = 0; i < 7; i++) {
    day++;
    let r = day%7;
    switch(r){
      case 0:
        days.push('Sunday');
        break;
      case 1:
        days.push('Monday');
        break;
      case 2:
        days.push('Tuesday');
        break;
      case 3:
        days.push('Wednesday');
        break;
      case 4:
        days.push('Thursday');
        break;
      case 5:
        days.push('Friday');
        break;
      case 6:
        days.push('Saturday');
        break;
    }
  //Insert days of the week into container
    let weekDay = document.querySelectorAll('.dayN');
    weekDay.forEach(()=>{
      weekDay[i].textContent = days[i];
  });
  }
  //Get hours of the current day and push into array
  let hours = [];
  for (i = 0; i < 24; i++) {
    let r = hour%24;
    switch(r){
      case 0:
        hours.push('12AM');
        break;
      case 1:
        hours.push('1AM');
        break;
      case 2:
        hours.push('2AM');
        break;
      case 3:
        hours.push('3AM');
        break;
      case 4:
        hours.push('4AM');
        break;
      case 5:
        hours.push('5AM');
        break;
      case 6:
        hours.push('6AM');
        break;
      case 7:
        hours.push('7AM');
        break;
      case 8:
        hours.push('8AM');
        break;
      case 9:
        hours.push('9AM');
        break;
      case 10:
        hours.push('10AM');
        break;
      case 11:
        hours.push('11AM');
        break;
      case 12:
        hours.push('12PM');
        break;
      case 13:
        hours.push('1PM');
        break;
      case 14:
        hours.push('2PM');
        break;
      case 15:
        hours.push('3PM');
        break;
      case 16:
        hours.push('4PM');
        break;
      case 17:
        hours.push('5PM');
        break;
      case 18:
        hours.push('6PM');
        break;
      case 19:
        hours.push('7PM');
        break;
      case 20:
        hours.push('8PM');
        break;
      case 21:
        hours.push('9PM');
        break;
      case 22:
        hours.push('10PM');
        break;
      case 23:
        hours.push('11PM');
        break;
      default:
        break;
    }
    hour++;

    //Put hours into container
    let dayHour = document.querySelectorAll('.hourN');
    dayHour.forEach(()=>{
      dayHour[i].textContent = hours[i];
    });
  }
  
  //Get the location for weather app
if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    
    const proxy ="https://corsanywhere.herokuapp.com/";

    //Fetch weather information from darksky api
    const api = `${proxy}https://api.darksky.net/forecast/ea1b7a85223b0df3d308b1541c08046b/${lat},${long}`;
    fetch(api).then(response =>{
      return response.json()
    }).then(data =>{
      let container = document.querySelector('.container');
      container.classList.remove("invisible");
      city.textContent=data.timezone.split('/')[1].replace(/_/g,' ');
      summary.textContent = data.currently.summary;
      temp.textContent = data.currently.temperature.toFixed()+ 'º';
      wind.textContent = data.currently.windSpeed.toFixed()+'mph';
      rain.textContent = (data.daily.data[0].precipProbability * 100).toFixed()+'%';
      humidity.textContent = (data.currently.humidity* 100).toFixed()+'%';
      feelsLike.textContent = data.currently.apparentTemperature.toFixed();
      pressure.textContent = (data.currently.pressure/33.86).toFixed()+' in Hg';
      visibility.textContent = data.currently.visibility.toFixed()+'mi';
      console.log(data);

      //Get the temperature for 24 hours from the current time
      let hourTemp = [];
      let degree = document.querySelectorAll('.degree');
      let hourWeather = document.querySelectorAll('.hour');
      for(let i = 0; i < 24; i++){
        hourTemp[i] = data.hourly.data[i].temperature.toFixed()+'º';
        degree[i].textContent = data.hourly.data[i].temperature.toFixed()+'º';
        
      //Add an icon depending on the weather for each hour
        let hourIcon = document.createElement('i');
        hourWeather.forEach(()=>{
          if(data.hourly.data[i].icon.includes('cloud')){
            hourIcon.setAttribute('class', 'fas fa-cloud');
            hourWeather[i].appendChild(hourIcon);
          }
          else if(data.hourly.data[i].icon.includes('rain')){
            hourIcon.setAttribute('class', 'fas fa-cloud-rain');
            hourWeather[i].appendChild(hourIcon);
          }
          else if(data.hourly.data[i].icon.includes('snow')){
            hourIcon.setAttribute('class', 'fas fa-snowflake');
            hourWeather[i].appendChild(hourIcon);
          }
          else if(data.hourly.data[i].icon.includes('fog')){
            hourIcon.setAttribute('class', 'fas fa-smog');
            hourWeather[i].appendChild(hourIcon);
          }
          else if(data.hourly.data[i].icon.includes('wind')){
            hourIcon.setAttribute('class', 'fas fa-wind');
            hourWeather[i].appendChild(hourIcon);
          }
          else if(data.hourly.data[i].icon.includes('day')){
            hourIcon.setAttribute('class', 'fas fa-sun');
            hourWeather[i].appendChild(hourIcon);
          }
          else if(data.hourly.data[i].icon.includes('night')){
            hourIcon.setAttribute('class', 'fas fa-moon');
            hourWeather[i].appendChild(hourIcon);
          }
          else{
            hourIcon.setAttribute('class', 'fas fa-cloud');
            hourWeather[i].appendChild(hourIcon);
          }
        });

      }
      
      //Get the temperature highs and lows for the rest of the week
      let highs = document.querySelectorAll('.high');
      let lows = document.querySelectorAll('.low');
      for(i = 0; i<highs.length; ++i){
        highs[i].textContent = data.daily.data[i].temperatureHigh.toFixed();
        lows[i].textContent = data.daily.data[i].temperatureLow.toFixed();
      }
      
      //Summary for the current day
      text.textContent = `Today: ${summary.textContent}. Its high is ${highs[0].textContent};
      and its low is ${lows[0].textContent} `

      //Place icon for each day depending on the weather
      let weather = document.querySelectorAll('.day')
      for(let i =0; i < 7; i++){
        let dayIcon = document.createElement('i');
        weather.forEach(()=>{
          if(data.daily.data[i].icon.includes('cloud')){
            dayIcon.setAttribute('class', 'fas fa-cloud');
            weather[i].appendChild(dayIcon);
          }
          else if(data.daily.data[i].icon.includes('rain')){
            dayIcon.setAttribute('class', 'fas fa-cloud-rain');
            weather[i].appendChild(dayIcon);
          }
          else if(data.daily.data[i].icon.includes('snow')){
            dayIcon.setAttribute('class', 'fas fa-snowflake');
            weather[i].appendChild(dayIcon);
          }
          else if(data.daily.data[i].icon.includes('day')){
            dayIcon.setAttribute('class', 'fas fa-sun');
            weather[i].appendChild(dayIcon);
          }
        });
      }

    }).catch(function(error){console.log(error)})
  });
 }
});