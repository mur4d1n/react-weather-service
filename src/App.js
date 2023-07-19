import React from "react";
import Info from "./components/info"
import Form from "./components/form"
import Weather from "./components/weather"

const API_KEY = "3700ef9d16973831e59a9ba3ead622b1";

class App extends React.Component {

  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    pressure: undefined,
    sunrise: undefined,
    sunset: undefined,
    error: undefined,
  }

  gettingWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;

    if(city) {
      const api_url = await
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await api_url.json();

      var sunrise = data.sys.sunrise;
      var date_sunr = new Date(sunrise * 1000);
      var sunrise_date = date_sunr.toTimeString();

      var sunset = data.sys.sunset;
      var date_suns = new Date(sunset * 1000);
      var sunset_date = date_suns.toTimeString();

      this.setState({
        temp: data.main.temp,
        city: data.name,
        country: data.sys.country,
        sunrise: sunrise_date,
        sunset: sunset_date,
        pressure: data.main.pressure,
        error: undefined
      });
    } else {
      this.setState({
          temp: undefined,
          city: undefined,
          country: undefined,
          pressure: undefined,
          sunrise: undefined,
          sunset: undefined,
          error: "Введите название города"
      });
    }
  }

  render(){
    return(
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-sm-5 info">
                <Info />
              </div>
              <div className="col-sm-7 form">
                <Form weatherMethod={this.gettingWeather} />
                <Weather
                  temp={this.state.temp}
                  city={this.state.city}
                  country={this.state.country}
                  sunrise={this.state.sunrise}
                  sunset={this.state.sunset}
                  pressure={this.state.pressure}
                  error={this.state.error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default App;
