import React, { useEffect, useState } from "react";
import MapPicker from "../../components/MapPicker/MapPicker";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "../EventForm/EventForm.module.css";
import { format } from "date-fns";
import imageIcon from "../../assets/imageIcon.png";
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";

const EditEventForm = ({ customIcon }) => {
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
  const [evento, setEvento] = useState({});
  const [loaded, setLoaded] = useState(false);
  const { id } = useParams();
  
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://mapmanager-backend.onrender.com/api/getEvent/${id}`)
      .then((res) => {
        setEvento(res.data);
        setLoaded(true);
        setLocation(res.data.location);
        setName(res.data.name);
        setType(res.data.type);
        setDescription(res.data.description);
        setStartDate(res.data.startDate);
        setEndDate(res.data.endDate);
        setPrice(res.data.price);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLocationSelect = (latlng) => {
    setLocation([latlng.lat, latlng.lng]);
  };

  const handleTypeSelect = (e) => {
    const value = e.target.value;
    if (!type.includes(value)) {
      setType([...type, value]);
    } else {
      const filterType = type.filter((type) => type !== value);
      setType(filterType);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImagen(file);
    setFileName(file ? file.name : "");
  };

  const handleEditEventForm = (e) => {
    e.preventDefault();
    axios.put(
      `https://mapmanager-backend.onrender.com/api/update/${id}`,
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
    );
    navigate(`/myevents`)
  };

  if (!loaded) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleEditEventForm} className={styles.formContainer}>
        <div className={styles.primerFormContainer}>
          <div className={styles.tituloPrincipalContainer}>
            <h3 className={styles.tituloPrincipal}>Editar Evento</h3>
          </div>
          <div className={styles.displayFlex}>
            <label className={styles.inputTitle}>Nombre</label>
            <input
              className={styles.inputFormStyle}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.checkboxContainer}>
            <label className={styles.inputTitle}>Tipo</label>
            <div>
              <input
                type="checkbox"
                id="festivo"
                value="Festivo"
                onChange={handleTypeSelect}
                checked={type.includes("Festivo")}
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
                checked={type.includes("Caridad")}
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
                checked={type.includes("Competitivo")}
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
                checked={type.includes("Turistico")}
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
                checked={type.includes("Social")}
              />
              <label htmlFor="social" className={styles.labelStyle}>
                Social
              </label>
            </div>
          </div>
          <div className={styles.descriptionContainer}>
            <label className={styles.inputTitle}>Descripcion</label>
            <textarea
              className={styles.textAreaStyle}
              rows="5"
              cols="33"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className={styles.displayFlex}>
            <label className={styles.inputTitle}>Precio en guaranies</label>
            <input
              className={styles.inputFormStyle}
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <span className={styles.optional}>(opcional)</span>
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.inputTitle}>Imagen seleccionada</label>
            <img
              className={styles.imagePicked}
              src={evento.imageUrl}
              alt={evento.name}
            />
          <div className={styles.customFileInput}>
              <input
                type="file"
                id="subirImg"
                onChange={(e) => handleFileChange(e)}
                
                />
              <div className={styles.customFileInputLabelEdit}>
                <label style={{marginRight: 100}} htmlFor="subirImg">Seleccionar archivo</label>
              </div>
            </div>
          {fileName && <span className={styles.fileName}>{fileName}</span>}
          </div>
        </div>
        <div className={styles.secondFormContainer}>
          <div className={styles.datesContainer}>
            <div className={styles.dateContainer}>
              <label className={styles.inputTitle}>
                Fecha y hora de inicio
              </label>
              <p className={styles.datePicked}>
                {format(evento.startDate, "HH:mm | dd MMM yyyy")} fecha anterior
              </p>
              <input
                className={styles.dateInput}
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className={styles.dateContainer}>
              <label className={styles.inputTitle}>
                Fecha y hora de finalizacion
              </label>
              <p className={styles.datePicked}>
                {format(evento.endDate, "HH:mm | dd MMM yyyy")} fecha anterior
              </p>
              <input
                className={styles.dateInput}
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.mapContainer}>
            <label className={styles.inputTitle}>
              Seleccionar ubicacion del evento
            </label>
            <MapPicker
              onLocationSelect={handleLocationSelect}
              customIcon={customIcon}
              inicialPosition={location}
              noRedirect={true}
            />
            {location===null?<p className={styles.locationError}>La ubicacion es necesaria</p>:""}
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.button}>
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEventForm;
