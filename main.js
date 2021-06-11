const api = {
  key: 'abc549dccf06be02a7ff843d8c3cd6cc',
  url: `https://api.openweathermap.org/data/2.5/weather`
}


const card = document.getElementById('card')

const city = document.getElementById('city');
const date = document.getElementById('date');
const hour = document.getElementById('hour');
const temp = document.getElementById('temp');
const weather = document.getElementById('weather');
const wind = document.getElementById('wind');
const humidity = document.getElementById('humidity');


async function search(query) {
  try {
    const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`);
    const data = await response.json();
    card.style.display = 'block';
    city.innerHTML = `${data.name}, ${data.sys.country}`;
    date.innerHTML = (new Date()).toLocaleDateString();

    setInterval(function(){
      var hora = new Date();
      var hora_actual = hora.getHours()+":"+hora.getMinutes()+":"+hora.getSeconds();
      hour.innerHTML = hora_actual;
    },1000);

    temp.innerHTML = `${toCelsius(data.main.temp)}°c`;
    wind.innerHTML = `${data.wind.speed} m/s`;
    humidity.innerHTML = `${data.main.humidity}%`;
    weather.innerHTML = data.weather[0].description;
  } catch (err) {
    console.log(err);
    alert('Error');
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
