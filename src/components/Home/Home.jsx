import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import MapGallery from "./components/MapGallery/MapGallery"
import { Link } from "react-router-dom"

const Home = ({eventos}) => {
  return (
    <>
    <div>
      Este es el componete de home
    </div>
    <div>
      <MapGallery eventos={eventos}/>
    </div>
    
    <div className="mapContainer">
    <MapContainer center={[-27.298, -55.858]} zoom={10} style={{ height: '500px', width: '500px' }}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

    {
      eventos.map((evento,index)=>{
        return (
        
        <Marker key={index}  position={[evento.location.lat, evento.location.lng]}>
          <Popup>
            {evento.name}<br /> {evento.description} <br/> <Link>Ir al evento</Link>
          </Popup>
        </Marker>

        )
      })
    }
    
  </MapContainer>

    </div>

    </>
  )
}

export default Home
