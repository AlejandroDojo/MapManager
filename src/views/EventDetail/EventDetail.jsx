import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import imagenEjemplo from '../../assets/ejemploimg.jpg'
import styles from './EventDetail.module.css'

const EventDetail = ({eventos}) => {
  const [evento, setEvento] = useState({})
  const [loaded, setLoaded] = useState(false)
  const {id} = useParams();

  
  
  useEffect(() => {
    const eventoFiltrado = eventos.filter((evento)=>evento._id === Number(id))
    setEvento(eventoFiltrado[0]);
    setLoaded(true);
  
    
  }, [])

  console.log(evento)
  if(!loaded){
    return (
      <div>Cargando...</div>
    )
  }



  return (


    <div className={styles.containerDetail}>
      <div className={styles.containerDetailImg}>
        <img className={styles.imgEjemplo} src={imagenEjemplo} alt="imagen de ejemplo" />
      </div>
      <div className={styles.containerDetailInfo}>
        <h3>{evento.name}</h3>
        <div>
          <h4>Tipo</h4>
          <ul>
            {evento.type.map((type,index)=>{
              return <li key={index}>{type}</li>
            })}
          </ul>
        </div>
        <p>{evento.description}</p>
        <p>Fecha de inicio: {evento.startDate || ""}</p>
        <p>Fecha de fin: {evento.endDate || ""}</p>
        <p>Precio: {evento.price || ""}</p>

      </div>
      

    </div>


  )
}

export default EventDetail