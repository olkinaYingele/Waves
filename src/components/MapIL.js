import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import Waves from './Waves';
import round100 from '../hooks/round100';

const MapIL = () => {
    const citiesGeolocation= [
        {city: 'Tel Aviv', lat: 32.088392208449804, lng: 34.76966857910157},
        { city: 'Haifa', lat:32.82651912783954, lng: 34.95986938476563},
        { city: 'Ashdod', lat:31.800558330295235, lng: 34.62753295898438},
        { city: 'Netanya', lat:32.3329, lng: 34.8599},
        { city: 'Ashkelon', lat:31.680264464234185, lng: 34.55200195312501},
        { city: 'Herzliya', lat:32.17474068868919, lng: 34.79953765869141},
        { city: 'Bat Yam', lat:32.027579497298156, lng: 34.74048614501954},
        { city: 'Caesarea', lat:32.5149, lng: 34.9044},
        { city: 'Jaffa', lat:32.0528, lng: 34.7556},
        { city: 'Nahariya', lat:33.0121183038527, lng: 35.08346557617188},
        { city: 'Akko', lat:32.9273, lng: 35.0766},
        { city: 'Hadera', lat:32.4414081066761, lng: 34.88021850585938},
        { city: 'Eilat', lat:29.5569, lng: 34.9519}
    ]
    
    const position = [31.0461, 34.8516]
    
    function LocationMarker() {
        const [position, setPosition] = useState(null)
        const [latitude, setLatitude] = useState(null)
        const [longitude, setLongitude] = useState(null)
        const map = useMapEvents({
            click(e) {
                //console.log("[", e.latlng.lat, ",", e.latlng.lng, ']');
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
      <MapContainer center={position} zoom={8} 
    //   <MapContainer center={position} zoom={8} scrollWheelZoom={false} 
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
