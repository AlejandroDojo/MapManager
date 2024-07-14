import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MapGallery from '../../components/MapGallery/MapGallery';

const NearbyEvents = () => {
  const [coordActu, setCoordActu] = useState("")
  const [nearbyEvents, setNearbyEvents] = useState([]);
  
  const [loading, setLoading] = useState(false)  

  useEffect(() => {
    const maxDistance = 30;
    navigator.geolocation.getCurrentPosition(position => {
      setCoordActu([position.coords.latitude,position.coords.longitude])
  }, e => {
      console.log(e);

    });
    axios.get('http://localhost:8080/api/getEvents')
    .then((res)=> {

      const filteredEvents = getNearbyEvents(coordActu, res.data, maxDistance);
      setNearbyEvents(filteredEvents);  
      setLoading(true)}
    )
    .catch(err => console.log(err))  
  

    

  }, [coordActu])


  function haversineDistance(coords1, coords2) {
    const [lat1, lon1] = coords1;
    const [lat2, lon2] = coords2;

    const R = 6371; 
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
}

function getNearbyEvents(userLocation, events, maxDistance) {
  return events.filter(event => {
      const distance = haversineDistance(userLocation, event.location);
      return distance <= maxDistance;
  });
}










  if(coordActu==="" || !loading){
    return <div>No hay acceso a la ubicacion</div>

  }


  

    

  return (
    <>
    <h1>Los eventos cercanos son los siguientes: </h1>
    <div>
        <MapGallery eventos={nearbyEvents} />
    </div>
    </>
  )
}


export default NearbyEvents