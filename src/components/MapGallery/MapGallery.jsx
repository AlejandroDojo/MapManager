import Pesca from '../../assets/pesca.jpg'
import Asado from '../../assets/asado.jpg'
import Artesania from '../../assets/artesania.jpg'
import Cine from '../../assets/cine.jpg'
import Yoga from '../../assets/yoga.jpg'
import { Link } from "react-router-dom";
import styles from "./MapGallery.module.css";

const MapGallery = ({ eventos }) => {
    return (
    <div className={styles.container}>
        {eventos.map((evento, index) => {
            return (
                <div key={index} className={styles.event}>
                    <div> 
                        <section className={styles.gallery}>
                            <img className={styles.imgGallery} src={Pesca} alt="pesca" />
                            <button className={styles.imageButton}>Ver</button>
                            <img className={styles.imgGallery} src={Asado} alt="asado" />
                            <button className={styles.imageButton}>Ver</button>
                            <img className={styles.imgGallery} src={Artesania} alt="artesania" />
                            <button className={styles.imageButton}>Ver</button>
                            <img className={styles.imgGallery} src={Cine} alt="cine" />
                            <button className={styles.imageButton}>Ver</button>
                            <img className={styles.imgGallery} src={Yoga} alt="yoga" />
                            <button className={styles.imageButton}>Ver</button>
                        </section>
                    </div>
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
