import { Routes } from 'react-router-dom'
import EventForm from '../EventForm/EventForm'
import './App.css'
import { Route } from 'react-router-dom'
import { useState } from 'react'
import {BrowserRouter} from 'react-router-dom';

import Header from '../Header/Header'

function App() {
  
  const [eventos, setEventos] = useState([
    {
      _id: 1,
      name: "San Juan",
      type: ["festival"],
      description: "Fiesta Patronal",
      startDate: "2024/20/8",
      endDate: "2024/22/8",
      price: 0,
      location: {
        lat: "-27.348860009198418",
        lng: "-55.85442781406063"
      }
    },
    {
      _id: 2,
      name: "Camping",
      type: ["social", "naturaleza"],
      description: "Fiesta Patronal",
      startDate: "2024/20/8",
      endDate: "2024/23/8",
      price: 0,
      location: {
        lat: "-27.319538552180447",
        lng: "-55.86065053913495"
      }
    }
  ])
  return (
    <div>
      <Header/>
      <h3>Pagina principal</h3>
      <BrowserRouter>
          <Routes>
            <Route path='/eventform' element={<EventForm/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
