import imagenEjemplo from "../../assets/ejemploimg.jpg";
import styles from "./MapCard.module.css";
const MapCard = ({ name, description, imageUrl }) => {
  return (
    <div>
      <div className={styles.container}>
        <img src={imageUrl} alt={name} />
      </div>
      <div>
        <h3 className="sinMargen">{name}</h3>
        <p className="sinMargen">{description}</p>
        <p className="sinMargen">Empeza: 20:00 hs</p>
      </div>
    </div>
  );
};

export default MapCard;
