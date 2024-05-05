const apiKey = 'c05288aa91b9404c8a1183309240505';
const search = document.querySelector('.search');
const iconBtn = document.querySelector('.icon');
const cityInfoDiv = document.getElementById('cityInfo');
const cityNameHeading = document.getElementById('cityName')
const iconImg = document.createElement('img');
const weatherIconDiv = document.getElementById('weatherIcon');
const audio = new Audio('./yagis.mp3'); 
const audio2 = new Audio('./gunesli.mp3'); 


async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
  
        cityNameHeading.innerText = `${data.location.name}, ${data.location.country}`;
        const iconUrl = data.current.condition.icon;
        iconImg.src = iconUrl;
        weatherIconDiv.appendChild(iconImg);
        cityInfoDiv.innerHTML += `
            <p> ${data.location.localtime}</p>
            <p>Temp: ${data.current.temp_c}°C</p>
            <p>Wind: ${data.current.wind_kph} km/h</p>
            <p>Humidity: ${data.current.humidity} %</p>
        `;

        const humidity = data.current.humidity;
        if (data.current.temp_c > 20) {
            await audio2.play(); 
        } else {
            await audio.play();
        }

        if (humidity <= 70) {
            await audio2.play();
        } else {
            await audio.play();
        }
        cityInfoDiv.style.display = 'block';
    } catch (error) {
        console.error('Data yoxdur');
    }
}



function searchWeather(query) {
    const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}`;
    fetchData(weatherUrl);
}
iconBtn.addEventListener('click', function () {
    const searchValue = search.value.trim();
    if (searchValue !== '') {
        searchWeather(searchValue);   
    } else {
        alert('Seher adi yazin!!');
    }
});
const deleteBtn = document.querySelector('.delete');
deleteBtn.addEventListener('click', function () {
    cityInfoDiv.style.display = 'none'; 
});








