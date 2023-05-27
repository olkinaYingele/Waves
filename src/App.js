import React, { useState } from 'react';
import MapIL from './components/MapIL';

const cities = ['Tel Aviv', 'Haifa', 'Ashdod', 'Netanya', 'Ashkelon', 'Herzliya', 'Bat Yam', 'Caesarea', 'Jaffa', 'Akko', 'Eilat', 'Hadera']; // List of cities for which you want to get geolocation

const API_KEY = '6a2bd92464514d68b0354d782bd72b8b'; // Replace with your OpenCage Geocoder API key

const getGeolocation = async (city) => {
  try {
    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?key=${API_KEY}&q=${encodeURIComponent(city)}`);
    const data = await response.json();

    const { lat, lng } = data.results[0].geometry;
    console.log(`${city}: Latitude ${lat}, Longitude ${lng}`);
  } catch (error) {
    console.error(`Error fetching geolocation for ${city}: ${error.message}`);
  }
};

cities.forEach((city) => getGeolocation(city));
cities.forEach((city) => getGeolocation(city));





function App() {
  return (
      <MapIL />
   );
}

export default App;
