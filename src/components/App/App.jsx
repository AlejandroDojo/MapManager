import { Link, Routes } from 'react-router-dom'
import EventForm from '../EventForm/EventForm'
import './App.css'
import { Route } from 'react-router-dom'
import { useState } from 'react'
import {BrowserRouter} from 'react-router-dom';

import Header from '../Header/Header'
import Register from '../Register/Register'
import Home from '../Home/Home'
import { eventosPrueba } from '../../assets/eventosPrueba'
import EventDetail from '../EventDetail/EventDetail'
import MyProfile from '../MyProfile/MyProfile'
import NearbyEvents from '../NearbyEvents/NearbyEvents'



function App() {
  
  const [eventos, setEventos] = useState(eventosPrueba)
  return (
    <div>
      <Header/>
      <h3>Pagina principal</h3>
      
      
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home eventos={eventos}/>}/>
            <Route path='/eventform' element={<EventForm/>}/>
            <Route path='/evento/:id' element={<EventDetail eventos={eventos}/>}/>
            <Route path='//nearbyevents' element={<NearbyEvents/>}/>
            <Route path='/myprofile' element={<MyProfile/>}/>
            <Route path='/register' element={<Register/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
