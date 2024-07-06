import React, { useEffect, useState } from 'react';
import MapPicker from '../../components/MapPicker/MapPicker';
import axios from 'axios'
import { useParams } from 'react-router-dom';

const EditEventForm = ({customIcon}) => {
  const [location, setLocation] = useState(null);
  const [name, setName] = useState("");
  const [type, setType] = useState([]);
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState(Date.now)
  const [endDate, setEndDate] = useState(Date.now)
  const [imagen, setImagen] = useState(null);
  const [price, setPrice] = useState("")
  const [evento, setEvento] = useState({});
  const [loaded, setLoaded] = useState(false);
  const { id } = useParams();



  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/getEvent/${id}`)
      .then((res) => {
        setEvento(res.data);
        setLoaded(true);
        setLocation(res.data.location)
        setName(res.data.name)
        setType(res.data.type)
        setDescription(res.data.description)
        setStartDate(res.data.startDate)
        setEndDate(res.data.endDate)
        setPrice(res.data.price)

      })
      .catch((err) => console.log(err));
  }, []);




  const handleLocationSelect = (latlng) => {
    setLocation([latlng.lat,latlng.lng]);
  };


  const handleTypeSelect = (e)=>{
    if(!(type.includes(e.target.value))){
        setType([...type,e.target.value]);
    } else{
      const filterType = type.filter((type)=> type !==e.target.value)
      setType(filterType);

    }
  }


  if (!loaded) {
    return <div>Cargando...</div>;
  }


  return (
    <form >
      <div className='containerLabel titulo'>
      <h3>Crear Evento</h3>
      </div>
      <div className='containerLabel'>
        <label>Nombre</label>
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
      </div>
      <div className='containerLabel'>
        <label>tipo</label>
        <div className='checkboxContainer'>
          <label>Festivo</label><input type='checkbox' value="Festivo" onChange={handleTypeSelect}/>
        </div>
        <div>
          <label>Caridad</label><input type='checkbox' value="Caridad" onChange={handleTypeSelect}/>
        </div>
        <div>
          <label>Competitivo</label><input type='checkbox' value="Competitivo" onChange={handleTypeSelect}/>
        </div>
        <div>
          <label>Turistico</label><input type='checkbox' value="Turistico" onChange={handleTypeSelect}/> 
        </div>
        <div>
          <label>Social</label><input type='checkbox' value="Social" onChange={handleTypeSelect}/>
        </div>
      </div>
      <div className='containerLabel'>
        <label>Descripcion</label>
        <textarea rows="5" cols="33" value={description} onChange={(e)=>setDescription(e.target.value)}>
        </textarea>
      </div>
      <div className='containerLabel'>
        <label>Precio</label>
        <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)}/>
      </div>
      <div className='containerLabel'>
        <label htmlFor="subirImg">Subir imagen</label>
        <input type="file" id='subirImg'  onChange={(e) => setImagen(e.target.files[0])}
            required />
      </div>

      <div className='containerLabel'>
        <label>Fecha y hora de inicio </label>
        <input type="datetime-local" value={startDate} onChange={(e)=> setStartDate(e.target.value)} />
      </div>
      <div className='containerLabel'>
        <label>Fecha y hora de finalizacion </label>
        <input type="datetime-local" value={endDate} onChange={(e)=> setEndDate(e.target.value)} />
      </div>
      <div className='containerLabel '>
        <label>Seleccionar ubicacion del evento</label>
      <MapPicker onLocationSelect={handleLocationSelect} customIcon={customIcon} inicialPosition={location} noRedirect={true}/>
      {location && (
        <div>
          <p>Selected location: {location[0]}, {location[1]}</p>
        </div>
      )}

      </div>
      <div className='containerLabel'>
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}


export default EditEventForm