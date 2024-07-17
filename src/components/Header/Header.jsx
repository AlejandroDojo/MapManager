import React, { useState } from "react";
import styles from "./Header.module.css";
import Logo from "../../assets/LogoBlanco.png";
import UserLogo from "../../assets/User icon.png";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ logged, setLogged}) => {
  
  const [localLogged, setLocalLogged] = useState(logged);
  const logout = () => {
    localStorage.removeItem("token");
    setLocalLogged(false);
    setLogged(false);
    location.reload();
  };
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
              <Link className={styles.link} to={"/"}>
                Home
              </Link>
              <Link className={styles.link} to={"/myCalendar"}>
                Mi Calendario
              </Link>
              <Link className={styles.link} to={"/myevents"}>
                Mis eventos
              </Link>
              <Link className={styles.link} to={"/eventform"}>
                Crear Evento
              </Link>
              <button onClick={logout} className={styles.button}>
                <Link className={styles.link} to={"/"}>
                  Desconectarse
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
