const api = {
  key: 'abc549dccf06be02a7ff843d8c3cd6cc',
  url: `https://api.openweathermap.org/data/2.5/weather`
}

const card = document.getElementById('card');
const video = document.getElementById('video');

const temp = document.getElementById('temp');
const city = document.getElementById('city');
const date = document.getElementById('date');
const hour = document.getElementById('hour');
const sky = document.getElementById('sky');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');


function uptadeVideo(data) {
  const temp = toCelsius(data.main.temp);
  let src = "img/beachvideo.mp4";

  if (temp > 27) {
    src = "img/summer.mp4"
  }else if (temp < 27 && temp > 16) {
    src = "img/spring.mp4"
  }else if (temp < 16) {
    src = "img/winter.mp4"
  }
  video.src = src
}

async function search(query) {
  try {
    const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`);
    const data = await response.json();

    temp.innerHTML = `${toCelsius(data.main.temp)}°c`;
    city.innerHTML = `${data.name}, ${data.sys.country}`;
    date.innerHTML = (new Date()).toLocaleDateString();
    setInterval(function(){
      var hora = new Date();
      var hora_actual = hora.getHours()+":"+hora.getMinutes()+":"+hora.getSeconds();
      hour.innerHTML = hora_actual;
    },1000);

    sky.innerHTML = data.weather[0].description;
    wind.innerHTML = `${data.wind.speed} m/s`;
    humidity.innerHTML = `${data.main.humidity}%`;

    uptadeVideo(data);
  } 
  catch (err) {
    console.log(err);
    alert('Este lugar no EXISTE');
  }
}

function toCelsius(kelvin) {
  return Math.round(kelvin - 273.15);
}

function onSubmit(event) {
  event.preventDefault();
  search(searchbox.value);
}

const searchform = document.getElementById('search-form');
const searchbox = document.getElementById('searchbox');
searchform.addEventListener('submit', onSubmit, true);