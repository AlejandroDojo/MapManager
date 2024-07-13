import {  Routes } from 'react-router-dom'
import EventForm from '../../views/EventForm/EventForm'
import './App.css'
import { Route } from 'react-router-dom'
import { useState } from 'react'
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
import MyEvents from '../../views/MyEvents/MyEvents'
import EditEventForm from '../../views/EditEventForm/EditEventForm'
import FCallendar from '../../views/Calendar/Calendar'
import dayjs from 'dayjs'
import axios from 'axios'


function App() {
  const token = localStorage.getItem('token');
  const [eventos, setEventos] = useState(eventosPrueba);
  const [logged, setLogged] = useState(false);
  const [misEventosAsisitir, setMisEventosAsistir] = useState([]);
  const[email, setEmail]= useState("")

  //cargando eventos


  
  //creando el icono del mapa
  const customIcon = new Icon({
    iconUrl:markerIcon,
    iconSize:[44,44],
    popupAnchor: [1, -20],
  })

  const guardarInformacion=(email)=>{
    setEmail(email);
  }
  const actualizarEventosAsistir=(idEvento)=>{
    axios
    .get(`http://localhost:8080/api/getEvent/${idEvento}`)
    .then(({data})=>{
        console.log(data)
        if(data.startDate && data.endDate){
        let nuevoEvento={
          start: dayjs(data.startDate).toDate(),
          end: dayjs(data.endDate).toDate(),
          title: data.name,
          data: {
            descripcion: data.description
          }
        }
        let eventos=[...misEventosAsisitir, nuevoEvento]
        
        setMisEventosAsistir(eventos)
      }
      else if(data.startDate && !data.endDate){
        let nuevoEvento={
          start: dayjs(data.startDate).toDate(),
          end: dayjs(data.startDate).add(24, 'hours').toDate(),
          title: data.name,
          data: {
            descripcion: data.description
          }
        }
        let eventos=[...misEventosAsisitir, nuevoEvento]
        
        setMisEventosAsistir(eventos)
      }
      else{
        console.log("El evento no tiene fecha de inicio")
      }
      })
    .catch((err)=>{console.log(err)})

  }
  

  const actualizarAsistirDb=(evento)=>{
    axios
    .put(
      `http://localhost:8080/api/user/agregarEvent/${evento._id}`,
      {
        email
      },
      {
        headers: {
          'Content-type': 'application/json',
          'token_usuario': localStorage.getItem('token')
        },
      }
    )
    .then(({data}) => {
      actualizarEventosAsistir(data.assignedEvents)

    })
    .catch((err) => console.log(err));

  }
  return (
    <div>
      
      <BrowserRouter>
          {(logged) 
          ? <Header logged={logged} /> 
          : "" }
          <Routes>
            <Route path='/' element={<Home eventos={eventos} customIcon={customIcon} logged={logged} setLogged={setLogged}/>}/>
            <Route path='/eventform' element={<EventForm customIcon={customIcon}/>}/>
            <Route path='/evento/:id' element={<EventDetail eventos={eventos} customIcon={customIcon} añadirAsistencia={actualizarAsistirDb}     />}/>
            <Route path='//nearbyevents' element={<NearbyEvents/>}/>
            <Route path='/myevents' element={<MyEvents/>}/>
            <Route path='/editevent/:id' element={<EditEventForm customIcon={customIcon}/>}/>
            <Route path='/myprofile' element={<MyProfile/>}/>
            <Route path='/register' element={<Register setLogged={setLogged}/>}/>
            <Route path='/login' element={<Login setLogged={setLogged} logged={logged}  guardarInformacion={guardarInformacion} />}/>
            <Route path='/myCalendar' element={<FCallendar  eventos={misEventosAsisitir}  email={email} />}/>
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
