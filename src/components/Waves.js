import { useEffect, useState } from 'react';
import round100 from '../hooks/round100';
import { control } from 'leaflet';

const Waves = ({ latitude, longitude }) => {
  const [waveHeight, setWaveHeight] = useState('Loading...')
  console.log(latitude, longitude)
  const getWavesHeight = (data) => {
    console.log("in getWavesHeight")
    console.log(data)
    const hours = data.hourly.time;
    const currentDateJSON = new Date().toJSON() // "2023-05-25T23:00"
    const currentHour =   currentDateJSON.substring(0, 13) + ":00"
    console.log(currentHour)
    const index = hours.indexOf(currentHour)
    console.log (index)
    const currentWaves = data.hourly.wave_height[index]
    setWaveHeight(currentWaves)
  }
  useEffect(() => {
    fetch(`https://marine-api.open-meteo.com/v1/marine?latitude=${round100(latitude) }&longitude=${round100(longitude)}&hourly=wave_height&length_unit=metric&timezone=auto&past_days=1`)
      .then((response) => {
        if(response.ok) return response.json()
        console.log(response)
        throw new Error (response.reason)
      })
      .then((actualData) => getWavesHeight(actualData))
      .catch((error) => {
        console.log("in fetch catcing an error")
        setWaveHeight('No waves')
      });
      // .then((actualData) => {
      //   console.log(actualData)
      // });
  });

  const getColor =  (waveHeight) => {
    if (waveHeight <= .5) {
      return "#517395"
    }
    if (waveHeight <= 1) {
      return "#6667f6"
    }
    if (waveHeight <= 1.5) {
      return "#67adc3"
    }
    if (waveHeight <= 2) {
      return "#a3cbcb"
    }
    if (waveHeight <= 3) {
      return "#ccccfb"
    }
    if (waveHeight <= 4) {
      return "#f29e9b"
    }
    if (waveHeight <= 4.9) {
      return "#ec70f8"
    }
    if (waveHeight <= 6) {
      return "#b672c3"
    }
    if (waveHeight <= 7) {
      return "#b672c3"
    }
    if (waveHeight <= 7.9) {
      return "#cb4d47"
    }
    if (waveHeight <= 9) {
      return "#aa5a58"
    }
    return "black"
  }
return (
    <div style={{backgroundImage:`url(/wave-height-legend.png)`,
        backgroundSize: '100%',
        width:"300px", height:"135px",
        textAlign: 'right',
        fontWeight: 'bold',
        fontSize: '20px',
        color: getColor(waveHeight)}}>
      {waveHeight}{waveHeight !== 'Loading...' && waveHeight !== 'No waves' ? 'm' : null} 
    </div>
  )
}

export default Waves
