import ArrowIcon from '../../assets/flechaIcon.png'
import React, { useState } from 'react';
import styles from './HomePage.module.css';

const HomePage = () => {

    return (
        <div className={styles.homePageContainer}>
            <div className={styles.homeText}>
                <h1 className={styles.titleHomePage}>LOS MEJORES EVENTOS AL ALCANCE DE TU MANO</h1>
                <h3 className={styles.subTitleHomePage}>Encuentra tus eventos favoritos aquí</h3>
                <div className={styles.lineText}></div>
            <img className={styles.arrowIcon} src={ArrowIcon} alt="arrowIcon" />
            </div>
        </div>
    );
};

export default HomePage;
