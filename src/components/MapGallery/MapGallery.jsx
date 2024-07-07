import { Link } from "react-router-dom";
import styles from "./MapGallery.module.css";
const MapGallery = ({ eventos }) => {
  
  return (
    <div className={styles.container}>
      {eventos.map((evento, index) => {
        return (
          <div key={index} className={styles.event}>
            
            
            <h2>{evento.name}</h2>
            <p>{evento.description}</p>
            <hr />
            <Link className={styles.linkStyles} to={`/evento/${evento._id}`}>Ir al evento </Link>
          </div>
        );
      })}
    </div>
  );
};

export default MapGallery;
