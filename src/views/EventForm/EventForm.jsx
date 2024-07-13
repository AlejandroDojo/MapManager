import React, { useState } from "react";
import MapPicker from "../../components/MapPicker/MapPicker";
import axios from "axios";
import styles from "./EventForm.module.css";
import imageIcon from "../../assets/imageIcon.png";
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";

const EventForm = ({ customIcon }) => {
  const {
    location, setLocation,
    name, setName,
    type, setType,
    description, setDescription,
    startDate, setStartDate,
    endDate, setEndDate,
    imagen, setImagen,
    price, setPrice,
    fileName, setFileName
  } = useForm();
  const navigate = useNavigate();
  

  const handleLocationSelect = (latlng) => {
    setLocation([latlng.lat, latlng.lng]);
  };

  const handleTypeSelect = (e) => {
    if (!type.includes(e.target.value)) {
      setType([...type, e.target.value]);
    } else {
      const filterType = type.filter((type) => type !== e.target.value);
      setType(filterType);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImagen(file);
    setFileName(file ? file.name : "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(location!==null){
      axios
      .post(
        "http://localhost:8080/api/upload",
        {
          name,
          type,
          description,
          price,
          startDate,
          endDate,
          location,
          imagen,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(() => {
        
        navigate(`/`)
      })
      .catch((err) => console.log(err));
        

    } 
  
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.primerFormContainer}>
          <div className={styles.tituloPrincipalContainer}>
            <h1 className={styles.tituloPrincipal}>Crear Evento</h1>
          </div>
          <div className={styles.displayFlex}>
            <h3 className={styles.inputTitle}>Nombre del evento: </h3>
            <input
              className={styles.inputFormStyle}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.checkboxContainer}>
            <div>
              <h3 className={styles.inputTitle}>Tipo:</h3>
            </div>
            <div>
              <input
                type="checkbox"
                id="festivo"
                value="Festivo"
                onChange={handleTypeSelect}
              />
              <label htmlFor="festivo" className={styles.labelStyle}>
                Festivo
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="caridad"
                value="Caridad"
                onChange={handleTypeSelect}
              />
              <label htmlFor="caridad" className={styles.labelStyle}>
                Caridad
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="competitivo"
                value="Competitivo"
                onChange={handleTypeSelect}
              />
              <label htmlFor="competitivo" className={styles.labelStyle}>
                Competitivo
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="turistico"
                value="Turistico"
                onChange={handleTypeSelect}
              />
              <label htmlFor="turistico" className={styles.labelStyle}>
                Turistico
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="social"
                value="Social"
                onChange={handleTypeSelect}
              />
              <label htmlFor="social" className={styles.labelStyle}>
                Social
              </label>
            </div>
          </div>
          <div className={styles.descriptionContainer}>
            <h3 className={styles.inputTitle}>Descripcion:</h3>
            <textarea
              className={styles.textAreaStyle}
              rows="5"
              cols="50"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className={styles.displayFlex}>
            <h3 className={styles.inputTitle}>Precio en guaranies:</h3>
            <input
              className={styles.inputFormStyle}
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <span className={styles.optional}>(opcional)</span>
          </div>
          <div className={styles.inputContainer}>
            <h3 className={styles.inputTitle}>Subir imagen: </h3>
            <div className={styles.customFileInput}>
              <input
                type="file"
                id="subirImg"
                onChange={(e) => handleFileChange(e)}
                required
              />
              <div className={styles.customFileInputLabel}>
                <img
                  className={styles.imageIcon}
                  src={imageIcon}
                  alt={imageIcon}
                  width={32}
                />
                <label htmlFor="subirImg">Seleccionar archivo</label>
              </div>
            </div>
            {fileName && <span className={styles.fileName}>{fileName}</span>}
          </div>
        </div>
        <div className={styles.secondFormContainer}>
          <div className={styles.datesContainer}>
            <div className={styles.dateContainer}>
              <h3 className={styles.inputTitle}>Fecha y hora de inicio:</h3>
              <input
                className={styles.dateInput}
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className={styles.dateContainer}>
              <h3 className={styles.inputTitle}>
                Fecha y hora de finalizacion:
              </h3>
              <input
                className={styles.dateInput}
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.mapContainer}>
            <h3 className={styles.inputTitle}>Ubicacion:</h3>
            <MapPicker
              onLocationSelect={handleLocationSelect}
              customIcon={customIcon}
              inicialPosition={null}
              noRedirect={false}
            />
            {location===null?<p className={styles.locationError}>La ubicacion es necesaria</p>:""}
            
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.button}>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                  fill="currentColor"
                  d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
                ></path>
              </svg>{" "}
              Crear
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
