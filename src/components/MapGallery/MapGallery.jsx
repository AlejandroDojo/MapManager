

import styles from './MapGallery.module.css'
const MapGallery = ({eventos}) => {
    return (
        <div className={styles.container}> 
            {
                eventos.map((evento, index)=> {
                    return (<div key={index} className={styles.event}>
                    <p>{evento.name} / {evento.description}</p>
                    </div>)
                })
            }
        </div>
        );
};

export default MapGallery;