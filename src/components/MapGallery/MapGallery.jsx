import Pesca from "../../assets/pesca.jpg";
import Asado from "../../assets/asado.jpg";
import Artesania from "../../assets/artesania.jpg";
import Cine from "../../assets/cine.jpg";
import Yoga from "../../assets/yoga.jpg";
import { Link } from "react-router-dom";
import styles from "./MapGallery.module.css";

const MapGallery = ({ eventos }) => {
    return (
        <div className={styles.container}>
        <div className={styles.event}>
            <section className={styles.dad}>
            {eventos.map((evento, index) => {
                return (
                <div key={index} className={styles.gallery}>
                    <img
                    className={styles.imgGallery}
                    src={evento.imageUrl}
                    alt={evento.name}
                    />
                    <button className={styles.imageButton}>Ver</button>
                    <Link
                    className={styles.linkStyles}
                    to={`/evento/${evento._id}`}
                    >
                    Ir al evento{" "}
                    </Link>
                </div>
                );
            })}
            </section>
        </div>
        </div>
    );
};

export default MapGallery;
