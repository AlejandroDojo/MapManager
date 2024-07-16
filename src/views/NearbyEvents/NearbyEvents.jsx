import axios from "axios";
import React, { useEffect, useState } from "react";

import MapGallery from "../../components/MapGallery/MapGallery";
import styles from "./NearbyEvents.module.css";
import Loader from "../../components/Loader/Loader";
import useGetNearbyEvents from "../../hooks/useGetNearbyEvents";

const NearbyEvents = ({ customIcon }) => {
  const { loading, nearbyEvents, setMaxDistance,coordActu } = useGetNearbyEvents();

  const selectKlm = (e) => {
    setMaxDistance(e.target.value);
  };

  if (coordActu === "") {
    return <div>No hay acceso a la ubicacion</div>;
  }

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
        <MapGallery eventos={nearbyEvents} />
      </div>
    </>
  );
};

export default NearbyEvents;
