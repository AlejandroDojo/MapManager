import { Routes } from 'react-router-dom'
import EventForm from '../EventForm/EventForm'
import './App.css'
import { Route } from 'react-router-dom'
import { useState } from 'react'
import {BrowserRouter} from 'react-router-dom';

import Header from '../Header/Header'
import Register from '../Register/Register'
import Home from '../Home/Home'
import { eventosPrueba } from '../../assets/eventosPrueba'



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
            <Route path='/register' element={<Register/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
