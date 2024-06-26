import React from 'react'
import styles from "./Header.module.css"
import Logo from '../../assets/Logo Blanco.png'
import UserLogo from '../../assets/User icon.png'

const Header = () => {
  return (
    <header className={styles.header}>
      <a  href="" >
        <img src={Logo} alt="logoEvent" className={styles.headerLogo} />
      </a>
      <nav className={styles.headerNav}>
        <a href="" className={styles.headerNavInicio}>Iniciar Sesion</a>
        <a href="" className={styles.headerNavRegistrarse}>Registrarse</a>
        <img src={UserLogo} alt="userLogo"  className={styles.headerLogo}/>
      </nav>

    </header>
  )
}


export default Header