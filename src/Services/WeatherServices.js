import axios from 'axios';

let api_key = "GNS7QpDrQDYGYxXcBXANeWzySp8pLzlP";

const GetLocationWeather = async (city) => {
    try {

        let cityCodeResponse = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${api_key}&q=${city}`);

        if (cityCodeResponse.data && cityCodeResponse.data.length > 0) {
            let cityCode = cityCodeResponse.data[0].Key;

            let weatherResponse = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityCode}?apikey=${api_key}`);
            console.log(weatherResponse.data)
            return weatherResponse.data;
        } else {
            throw new Error('City not found');
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
};
const GetLocationWeatherHour = async (city) => {
    try {
        let cityCodeResponse = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${api_key}&q=${city}`);

        if (cityCodeResponse.data && cityCodeResponse.data.length > 0) {
            let cityCode = cityCodeResponse.data[0].Key;

            let weatherResponse = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${cityCode}?apikey=${api_key}`);

            return weatherResponse.data;
        } else {
            throw new Error('City not found');
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export { GetLocationWeather, GetLocationWeatherHour }