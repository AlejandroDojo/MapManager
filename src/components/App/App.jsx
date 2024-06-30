import { Routes } from 'react-router-dom'
import EventForm from '../../views/EventForm/EventForm'
import './App.css'
import { Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {BrowserRouter} from 'react-router-dom';
import Header from '../Header/Header'
import Register from '../../views/Register/Register'
import Home from '../../views/Home/Home'
import { eventosPrueba } from '../../utils/eventosPrueba'
import EventDetail from '../../views/EventDetail/EventDetail'
import MyProfile from '../../views/MyProfile/MyProfile'
import NearbyEvents from '../../views/NearbyEvents/NearbyEvents'
import { Icon } from 'leaflet'
import markerIcon from '../../assets/markerIcon.png'
import Login from '../../views/Login/Login'
import Chat from '../Chat/Chat'


function App() {
  
  const [eventos, setEventos] = useState(eventosPrueba);
  //creando el icono del mapa
  const customIcon = new Icon({
    iconUrl:markerIcon,
    iconSize:[44,44],
    popupAnchor: [1, -20],
  })



  return (
    <div>
      <Header/>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home eventos={eventos} customIcon={customIcon}/>}/>
            <Route path='/eventform' element={<EventForm customIcon={customIcon}/>}/>
            <Route path='/evento/:id' element={<EventDetail eventos={eventos}/>}/>
            <Route path='//nearbyevents' element={<NearbyEvents/>}/>
            <Route path='/myprofile' element={<MyProfile/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
