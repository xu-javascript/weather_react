import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { WEATHER_API_URL, getApiOptions } from "../api";

const Search = ({ OnSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(
      `${WEATHER_API_URL}/cities?minPopultion=1000000&namePrefix${inputValue}`,
      getApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name},${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    OnSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};
export default Search;
