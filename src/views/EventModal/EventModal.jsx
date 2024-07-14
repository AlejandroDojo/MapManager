import styles from "./EventModal.module.css"
const EventModal=({evento, onClose})=>{
    console.log(evento.start)
    return(
        <div className={styles.modal} >
            <div   className={styles.modalContent}> 
                <h2>{evento.title}</h2>
                <p>{evento.data.descripcion}</p>
                <p>Inicio:{evento.start.toLocaleString()} </p>
                <p>Fin:{evento.end.toLocaleString()} </p>
                <button className={styles.btn}  onClick={onClose}>Cerrar</button>
            </div>
        </div>
    )
}


export default EventModal
