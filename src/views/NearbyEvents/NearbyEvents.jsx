
import MapGallery from "../../components/MapGallery/MapGallery";
import styles from "./NearbyEvents.module.css";
import Loader from "../../components/Loader/Loader";
import useGetNearbyEvents from "../../hooks/useGetNearbyEvents";
import Title from "../../components/Title/Title";


const NearbyEvents = ({ customIcon,handleClick, referencia }) => {


  const { loading, nearbyEvents, setMaxDistance,coordActu } = useGetNearbyEvents();

  const selectKlm = (e) => {
    setMaxDistance(e.target.value);
  };

  
  if (!loading) {
    return <Loader />;
  }
  

  return (
    <>
      <div className={styles.container}>
        <div className={styles.selectContainer}>
          <label className={styles.titleSelect}>Cercania en kilometros a la redonda: </label>
          <select onChange={selectKlm} className={styles.select}>
            <option value="10">10</option>
            <option value="30">30</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        {nearbyEvents.length<1 ?<div className={styles.titleContainer}><Title text="No hay eventos para mostrar"/></div>:""}
        <MapGallery eventos={nearbyEvents} handleClick={handleClick} referencia={referencia}/>
      </div>
    </>
  );
};

export default NearbyEvents;
