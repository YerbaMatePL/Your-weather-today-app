const input = document.querySelector('input');
const button = document.querySelector('button');
const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');
const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');
const speedWind = document.querySelector('.speed-wind');

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q=';

const API_KEY = '&appid=a15b6d17d7a3538457c669d6154db16a';

const API_UNITS = '&units=metric';

const getWeather = () => {
	const city = input.value;
	const URL = `${API_LINK}${city}${API_KEY}${API_UNITS}`;

	axios
		.get(URL)
		.then((res) => {
			const temp = res.data.main.temp;
			const hum = res.data.main.humidity;
			const wind = res.data.wind.speed

			cityName.textContent = res.data.name;
			temperature.textContent = Math.floor(temp) + '°C';
			humidity.textContent = hum + '%';
			speedWind.textContent = Math.floor(wind*3.6) + 'Km/h';
			const status = res.data.weather[0].main;
			weather.textContent = status;
			const statusId = res.data.weather[0].id;
			warning.textContent = '';
			input.value = '';

			switch (true) {
				case statusId >= 200 && statusId <= 232:
					photo.setAttribute('src', './img/thunderstorm.png');
					break;
				case statusId >= 300 && statusId <= 321:
					photo.setAttribute('src', './img/drizzle.png');
					break;
				case statusId >= 500 && statusId <= 531:
					photo.setAttribute('src', './img/rain.png');
					break;
				case statusId >= 600 && statusId <= 622:
					photo.setAttribute('src', './img/ice.png');
					break;
				case statusId >= 701 && statusId <= 781:
					photo.setAttribute('src', './img/fog.png');
					break;
				case statusId === 800:
					photo.setAttribute('src', './img/sun.png');
					break;
				case statusId >= 801 && statusId <= 804:
					photo.setAttribute('src', './img/cloud.png');
					break;
				default:
					photo.setAttribute('src', './img/unknown.png');
			}
		})
		.catch(() => (warning.textContent = 'Wpisz poprawną nazwę miasta'));
};

const enterKeyCheck = (e) => {
	if (e.key === 'Enter') {
		getWeather();
	}
};

input.addEventListener('keyup', enterKeyCheck);
button.addEventListener('click', getWeather);
