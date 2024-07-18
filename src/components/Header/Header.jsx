import React, { useState } from "react";
import styles from "./Header.module.css";
import Logo from "../../assets/LogoBlanco.png";
import UserLogo from "../../assets/User icon.png";
import Logout from '../../assets/logout.png'
import { Link, useNavigate } from "react-router-dom";

const Header = ({ logged, setLogged}) => {
  
  const [localLogged, setLocalLogged] = useState(logged);
  const [activeLink, setActiveLink] = useState(0);
  const logout = () => {
    localStorage.removeItem("token");
    setLocalLogged(false);
    setLogged(false);
    location.reload();
  };

  const current = (index) => {
    setActiveLink(index)
  }
  return (
    <>
      {localLogged ? (
        <>
          <header className={styles.header}>
            <div className={styles.homeNav}>
              <a href="/">
                <img src={Logo} alt="logoEvent" className={styles.headerLogo} />
              </a>
            </div>
            <nav className={styles.headerNav}>
              <Link className={ (activeLink === 0) ? styles['active'] : ""} to={"/"} onClick={() => {current(0)}}>
                Home
              </Link>
              <Link className={ (activeLink === 1) ? styles['active'] : ""} to={"/myCalendar"} onClick={() => {current(1)}}>
                Mi Calendario
              </Link>
              <Link className={ (activeLink === 2) ? styles['active'] : ""} to={"/myevents"} onClick={() => {current(2)}}>
                Mis eventos
              </Link>
              <Link className={ (activeLink === 3) ? styles['active'] : ""} to={"/eventform"} onClick={() => {current(3)}}>
                Crear Evento
              </Link>
              <button onClick={logout} className={styles.button}>
                <Link className={ (activeLink === 4) ? styles['active'] : ""} to={"/"} onClick={() => {current(4)}}>
                  <img src={Logout} alt="Logout" className={styles.logout}/>
                </Link>
              </button>
            </nav>
          </header>
        </>
      ) : (
        <header className={styles.header}>
          <a href="/">
            <img src={Logo} alt="logoEvent" className={styles.headerLogo} />
          </a>
          <nav className={styles.headerNav}>
            <a href="/login" className={styles.headerNavInicio}>
              Iniciar Sesion
            </a>
            <a href="/register" className={styles.headerNavRegistrarse}>
              Registrarse
            </a>
          </nav>
        </header>
      )}
    </>
  );
};

export default Header;
