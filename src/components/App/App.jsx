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
import MyEvents from '../../views/MyEvents/MyEvents'
import EditEventForm from '../../views/EditEventForm/EditEventForm'
import FCallendar from '../../views/Calendar/Calendar'


function App() {
  
  const [eventos, setEventos] = useState(eventosPrueba);
  const [logged, setLogged]= useState(true)
  //creando el icono del mapa
  const customIcon = new Icon({
    iconUrl:markerIcon,
    iconSize:[44,44],
    popupAnchor: [1, -20],
  })



  return (
    <div>
      
      <BrowserRouter>
          <Header   logged={logged} />
          <Routes>
            <Route path='/' element={<Home eventos={eventos} customIcon={customIcon}/>}/>
            <Route path='/eventform' element={<EventForm customIcon={customIcon}/>}/>
            <Route path='/evento/:id' element={<EventDetail eventos={eventos} customIcon={customIcon}/>}/>
            <Route path='//nearbyevents' element={<NearbyEvents/>}/>
            <Route path='/myevents' element={<MyEvents/>}/>
            <Route path='/editevent/:id' element={<EditEventForm customIcon={customIcon}/>}/>
            <Route path='/myprofile' element={<MyProfile/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/myCalendar' element={<FCallendar/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
