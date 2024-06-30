import imagenEjemplo from '../../assets/ejemploimg.jpg'
import styles from './MapCard.module.css'
const MapCard = ({name, description}) => {

    return (
        <div>
            <div className={styles.container}>
                <img src={imagenEjemplo} alt="Una imagen" />
            </div>
            <div>
                <h3>{name}</h3>
                <p>{description}</p>
                Empeza: 20:00 hs
            </div>
        </div>
    )
}

export default MapCard;