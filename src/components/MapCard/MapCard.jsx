import { useNavigate } from "react-router-dom";
import imagenEjemplo from "../../assets/ejemploimg.jpg";
import styles from "./MapCard.module.css";
const MapCard = ({ name, description, imageUrl, _id, start}) => {

  let data = new Date(start).toLocaleString();
  console.log(data)
  const navegar = useNavigate()
  const clickhandler = () => { 
    navegar(`/evento/${_id}`)
  }
  return (
    <div onClick={clickhandler}>
      <div className={styles.container}>
        <img src={imageUrl} alt={name} />
      </div>
      <div className={styles.containertext}>
        <h3 className={styles.title}>{name}</h3>
        <p className="sinMargen">{description}</p>
        <hr />
        <p className="sinMargen">Empeza: {data}</p>
      </div>
    </div>
  );
};

export default MapCard;
