import "./App.css";
import CurrentWeather from "./components/current-weather";
import Search from "./components/search";
import { THE_WEATHER_API_URL, WEATHER_API_KEY } from "./components/api";
import { useState } from "react";
import ForeCast from "./components/forecast";

const App = () => {
  const [CurrentWeathe, setCurrentWeathe] = useState(null);
  const [ForecastWeathe, setForecastWeathe] = useState(null);

  const OnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${THE_WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${THE_WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (Response) => {
        const CurrentWeather = await Response[0].json();
        const ForecastWeather = await Response[1].json();

        setCurrentWeathe({ city: searchData.label, ...CurrentWeather });
        setForecastWeathe({ city: searchData.label, ...ForecastWeather });
      })
      .catch((error) => console.log(error));

    console.log(CurrentWeathe);
    console.log(ForecastWeathe);
  };

  return (
    <div className="container">
      <Search OnSearchChange={OnSearchChange}></Search>
      {CurrentWeathe && <CurrentWeather data={CurrentWeathe} />}
      {ForecastWeathe && <ForeCast data={ForecastWeathe} />}
    </div>
  );
};

export default App;
