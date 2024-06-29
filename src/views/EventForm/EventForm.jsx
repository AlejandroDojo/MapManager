import React, { useState } from 'react';
import MapPicker from '../../components/MapPicker/MapPicker';

const EventForm = ({customIcon}) => {
  const [location, setLocation] = useState(null);

  const handleLocationSelect = (latlng) => {
    setLocation(latlng);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Location selected:', location);
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='containerLabel titulo'>
      <h3>Crear Evento</h3>
      </div>
      <div className='containerLabel'>
        <label>Nombre</label>
        <input type="text" />
      </div>
      <div className='containerLabel'>
        <label>tipo</label>
        <div className='checkboxContainer'>
          <label>Festivo</label><input type='checkbox' value="Festivo"/>
        </div>
        <div>
          <label>Caridad</label><input type='checkbox' value="Caridad"/>
        </div>
        <div>
          <label>Competitivo</label><input type='checkbox' value="Competitivo"/>
        </div>
        <div>
          <label>Turistico</label><input type='checkbox' value="Turistico"/> 
        </div>
        <div>
          <label>Social</label><input type='checkbox' value="Social"/>
        </div>
      </div>
      <div className='containerLabel'>
        <label>Descripcion</label>
        <textarea rows="5" cols="33">
        </textarea>
      </div>

      <div className='containerLabel'>
        <label>Fecha y hora de inicio </label>
        <input type="datetime-local" />
      </div>
      <div className='containerLabel'>
        <label>Fecha y hora de finalizacion </label>
        <input type="datetime-local" />
      </div>
      <div className='containerLabel '>
        <label>Seleccionar ubicacion del evento</label>
      <MapPicker onLocationSelect={handleLocationSelect} customIcon={customIcon}/>
      {location && (
        <div>
          <p>Selected location: {location.lat}, {location.lng}</p>
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