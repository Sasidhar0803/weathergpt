import { LightningElement, track } from 'lwc';
import getWeather from '@salesforce/apex/WeatherController.getWeather';

export default class Weather extends LightningElement {
    @track location = '';
    @track weatherData;
    @track error;

    handleLocationChange(event) {
        this.location = event.target.value;
    }

    handleSearch() {
        if (this.location) {
            getWeather({ location: this.location })
                .then((result) => {
                    const data = JSON.parse(result);
                    this.weatherData = {
                        name: data.location.name,
                        icon: data.current.condition.icon,
                        temp_c: data.current.temp_c,
                        humidity: data.current.humidity,
                        wind_kph: data.current.wind_kph
                    };
                    this.error = null;
                })
                .catch((error) => {
                    this.error = error.body.message;
                    this.weatherData = null;
                });
        } else {
            this.error = 'Please enter a location';
        }
    }
}
