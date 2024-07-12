import React from 'react'
import styles from "./Header.module.css"
import Logo from '../../assets/LogoBlanco.png'
import UserLogo from '../../assets/User icon.png'
import { Link } from 'react-router-dom'

const Header = ({logged}) => {

  return (
    <>
      {logged
      ? <>
          <header className={styles.header}>
            <div className={styles.homeNav}>
              <Link className={styles.linkHedear} to={'/'}>Home</Link>
            </div>
            <nav className={styles.headerNav}>
            <Link className={styles.link} to={'/nearbyevents'}>Eventos cercanos</Link>
            <Link className={styles.link} to={'/myCalendar'}>Mi Calendario</Link>
            <Link className={styles.link} to={'/myevents'}>Mis eventos</Link>
            <Link className={styles.link} to={'/eventform'}>Crear Evento</Link>
            </nav>
          </header>
        </>
      : <header className={styles.header}>
          <a  href="/" >
          <img src={Logo} alt="logoEvent" className={styles.headerLogo} />
          </a>
          <nav className={styles.headerNav}>
          <a href="/login" className={styles.headerNavInicio}>Iniciar Sesion</a>
          <a href="/register" className={styles.headerNavRegistrarse}>Registrarse</a>
          <img src={UserLogo} alt="userLogo"  className={styles.userLogo}/>
          </nav>
        </header>
          }
    </>


  )
}


export default Header