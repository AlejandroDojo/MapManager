import { useEffect, useState } from "react"
import styles from "./MyEvents.module.css"
import { Link } from "react-router-dom";
import axios from "axios"

const MyEvents = () => {
  const [events, setEvents] = useState({})
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    axios.get('http://localhost:8080/api/getEvents')
      .then((res)=> {
        setEvents(res.data)
        setLoading(true)}
      )
      .catch(err => console.log(err))
  
    
  }, [])


  const deleteEvent = (eventId) => {
    axios.delete(`http://localhost:8080/api/delete/${eventId}`)
      .then(()=> {
        console.log("Eliminado correctamente")
        const filterEvents = events.filter((evento)=>evento._id!==eventId)
        setEvents(filterEvents);
      }
      )
      .catch((err)=> console.log(err))
  };

  const handleDelete = (eventId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      deleteEvent(eventId);
    }
  };



  if(!loading){
    return <div>Cargando...</div>
  }




  return (

    <div className={styles.container}>
      {events.map((evento,ind)=>{
        return (
          <div key={ind} className={styles.eventsContainer} >
              <div className={styles.elementsContainer}>
                <div className={styles.imagesContainer}>
                  <img
                    className={styles.images}
                    src={evento.imageUrl}
                    alt={evento.name}
                  />

                </div>
                <div className={styles.infoContainer}>
                  <h3>{evento.name}</h3>
                  <p>{evento.description}</p>
                  
                </div>

              </div>
              <div className={styles.buttonsContainer}>
                <Link to={`/editevent/${evento._id}`}><button className={styles.editButton}>Editar</button></Link>
                <button className={styles.deleteButton} onClick={()=> handleDelete(evento._id)}>Eliminar</button>
              </div>
          
          </div>

        );
      })}
    </div>
  )
}

export default MyEvents