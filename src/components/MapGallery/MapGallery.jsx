import React from 'react';
import Pesca from "../../assets/pesca.jpg";
import Asado from "../../assets/asado.jpg";
import Artesania from "../../assets/artesania.jpg";
import Cine from "../../assets/cine.jpg";
import Yoga from "../../assets/yoga.jpg";
import { Link } from "react-router-dom";
import styles from "./MapGallery.module.css";
import HomePage from '../../views/HomePage/HomePage';

const MapGallery = ({ eventos, handleClick, referencia}) => {

    const Todate = ({date}) => {
        let data = new Date(date).toLocaleString();
        console.log(data);
        return (
            <>
                <p> Horario {data}</p>
            </>
        );
    }
    return (
        <div className={styles.container}>
            <div className={styles.event}>
                <section className={styles.dad}>
                    {eventos.map((evento, index) => {
                        return (
                            <div key={index} className={styles.gallery}
                            >
                                <div className={styles.front}>
                                    <img
                                        className={styles.imgGallery}
                                        src={evento.imageUrl}
                                        alt={evento.name}
                                    />
                                    <h3>{evento.name}</h3>
                                </div>
                                <div className={styles.back}
                                onClick={()=>handleClick(referencia,evento.location[0],evento.location[1])}>
                                    <p>{evento.description}</p>
                                    <Todate date={evento.startDate}/>
                                    <div className={styles.link}>
                                        <Link
                                            className={styles.linkStyles}
                                            to={`/evento/${evento._id}`}
                                        >
                                            Ir al evento
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </section>
            </div>
        </div>
    );
};

export default MapGallery;
