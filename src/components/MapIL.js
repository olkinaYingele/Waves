import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import Waves from './Waves';
import round100 from '../hooks/round100';

const MapIL = () => {
    const position = [31.0461, 34.8516]
    
    function LocationMarker() {
        const [position, setPosition] = useState(null)
        const [latitude, setLatitude] = useState(null)
        const [longitude, setLongitude] = useState(null)
        const map = useMapEvents({
        click(e) {
            console.log("[", e.latlng.lat, ",", e.latlng.lng, ']');
                setLatitude(round100(e.latlng.lat))
                setLongitude(round100(e.latlng.lng))
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
        <LocationMarker/>
      </MapContainer>
    )
}

export default MapIL
