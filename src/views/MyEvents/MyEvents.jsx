import { useEffect, useState } from "react"
import styles from "./MyEvents.module.css"
import { Link } from "react-router-dom";
import axios from "axios"
import editIcon from '../../assets/editIcon.png'
import deleteIcon from '../../assets/deleteIcon.png'
import Modal from "../../components/Modal/Modal";
import Loader from "../../components/Loader/Loader";


const MyEvents = () => {
  const [events, setEvents] = useState({})
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [eventIdToDelete, setEventIdToDelete] = useState(null);


  useEffect(() => {
    axios.get('http://localhost:8080/api/getEvents')
      .then((res)=> {
        setEvents(res.data)
        setLoading(true)}
      )
      .catch(err => console.log(err))
  
    
  }, [events])

  
  


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
    setEventIdToDelete(eventId);
    setIsOpen(true);
  };

  const confirmDelete = () => {
    if (eventIdToDelete) {
      deleteEvent(eventIdToDelete);
      setEventIdToDelete(null);
      setIsOpen(false);
    }
  };



  if(!loading){
    return <Loader/>
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
                <Link className={styles.editButton} to={`/editevent/${evento._id}`}>
                  <div className={styles.containerButton}>
                  <img className={styles.iconStyle} src={editIcon} alt={editIcon} />
                  <span>Editar</span>
                  </div>
                  </Link>
                <button className={styles.deleteButton} onClick={()=> handleDelete(evento._id)}>
                  <div className={styles.containerButton}>
                  <img className={styles.iconStyle} src={deleteIcon} alt={deleteIcon} />
                  <span>Eliminar</span>
                  
                  </div>
                  </button>
                  {isOpen && <Modal
                  setIsOpen={setIsOpen}
                  confirmDelete={confirmDelete}
                />}
              </div>
          
          </div>

        );
      })}
    </div>
  )
}

export default MyEvents