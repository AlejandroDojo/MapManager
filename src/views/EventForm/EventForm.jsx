import React, { useState } from 'react';
import MapPicker from '../../components/MapPicker/MapPicker';
import axios from 'axios'

const EventForm = ({customIcon}) => {
  const [location, setLocation] = useState(null);
  const [name, setName] = useState("");
  const [type, setType] = useState([]);
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState(Date.now)
  const [endDate, setEndDate] = useState(Date.now)
  const [imagen, setImagen] = useState(null);
  const [price, setPrice] = useState("")
  
  
  
  
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
  


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/upload', {
      name,
      type,
      description,
      price,
      startDate,
      endDate,
      location,
      imagen
    }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  ).then((data)=>{
    console.log(data)

  })
  .catch((err)=> console.log(err))
  
    
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <MapPicker onLocationSelect={handleLocationSelect} customIcon={customIcon} inicialPosition={null} noRedirect={false}/>
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
  );
};

export default EventForm;