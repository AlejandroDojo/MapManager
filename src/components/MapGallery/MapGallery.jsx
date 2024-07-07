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
                        <section>
                            <img src={Pesca} alt="pesca" />
                            <img src={Asado} alt="asado" />
                            <img src={Artesania} alt="artesania" />
                            <img src={Cine} alt="cine" />
                            <img src={Yoga} alt="yoga" />
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
