import React, { useEffect, useState } from 'react'

const NearbyEvents = () => {
  const [coordActu, setCoordActu] = useState([])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setCoordActu([position.coords.latitude,position.coords.longitude])
  }, e => {
      console.log(e);
  });
  }, [])
  console.log(coordActu);


  

    

  return (
    <h1>Tu ubicacion actual es : Lat <span style={{"color": "red"}}>{coordActu[0]}</span> Long <span style={{"color": "red"}}>{coordActu[1]}</span></h1>
  )
}


export default NearbyEvents