import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import Waves from './Waves';
import round100 from '../hooks/round100';

const MapIL = () => {
    const citiesGeolocation= [
        {city: 'Tel Aviv', lat: 32.0853, lng: 34.7818},
        { city: 'Haifa', lat:32.7940, lng: 34.9896},
        { city: 'Ashdod', lat:31.8014, lng: 34.6433},
        { city: 'Netanya', lat:32.3329, lng: 34.8599},
        { city: 'Ashkelon', lat:31.6700, lng: 34.5715},
        { city: 'Herzliya', lat:32.1631, lng: 34.8447},
        { city: 'Bat Yam', lat:32.0238, lng: 34.7509},
        { city: 'Caesarea', lat:32.5149, lng: 34.9044},
        { city: 'Jaffa (part of Tel Aviv)', lat:32.0528, lng: 34.7556},
        { city: 'Akko (Acre)', lat:32.9273, lng: 35.0766},
        { city: 'Hadera', lat:32.4366, lng: 34.9172},
        { city: 'Eilat', lat:29.5569, lng: 34.9519}
    ]
    
    const position = [31.0461, 34.8516]
    
    function LocationMarker() {
        const [position, setPosition] = useState(null)
        const [latitude, setLatitude] = useState(null)
        const [longitude, setLongitude] = useState(null)
        const map = useMapEvents({
        click(e) {
            console.log("[", e.latlng.lat, ",", e.latlng.lng, ']');
                setLatitude((e.latlng.lat))
                setLongitude((e.latlng.lng))
                setPosition([e.latlng.lat, e.latlng.lng])
            },
        })

        return position === null ? null : (
            // <Marker position={position}>
            <Popup position={position}><Waves latitude={latitude} longitude={longitude}/></Popup>
            // </Marker> 
        )
    }
    return(
      <MapContainer center={position} zoom={8} scrollWheelZoom={false} 
            style={{width: '100%', height: "100vh"}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
            citiesGeolocation.map((city) => 
                <Marker position={[city.lat, city.lng]} >
                    <Popup ><Waves latitude={city.lat} longitude={city.lng}/></Popup>                   
                </Marker>
            )
        }
        

        <LocationMarker/>
      </MapContainer>
    )
}

export default MapIL
