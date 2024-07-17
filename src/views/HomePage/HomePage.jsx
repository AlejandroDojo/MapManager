import ArrowIcon from '../../assets/flechaIcon.png'
import React, { useState } from 'react';
import styles from './HomePage.module.css';

const HomePage = ({title, subtitle}) => {
    console.log(title)
    return (
        <div className={styles.homePageContainer}>
            <div className={styles.homeText}>
                <h1 className={styles.titleHomePage}>{title}</h1>
                <h3 className={styles.subTitleHomePage}>{subtitle}</h3>
                <div className={styles.lineText}></div>
            <img className={styles.arrowIcon} src={ArrowIcon} alt="arrowIcon" />
            </div>
        </div>
    );
};

export default HomePage;
