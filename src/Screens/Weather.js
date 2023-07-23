import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text } from 'react-native';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Replace 'YOUR_API_KEY' with your Weatherstack API key
    // const apiKey = 'b5de8ae893fb73d2148875970c556fa3';
    // const apiUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=Dombiwali,Thane,Maharastra`;

    // axios.get(apiUrl)
    //   .then(response => {
    //     setWeatherData(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching weather data:', error);
    //   });
  }, []);

  return (
    <View>
      {weatherData ? (
        <View>
          <Text>Location: {weatherData.location.name}</Text>
          <Text>Temperature: {weatherData.current.temperature} °C</Text>
          <Text>Weather Description: {weatherData.current.weather_descriptions[0]}</Text>

          <Text>JSON.stringify({weatherData})</Text>
          {/* Add more weather data as needed */}
        </View>
      ) : (
        <Text>Loading weather data...</Text>
      )}
    </View>
  );
};

export default Weather;
