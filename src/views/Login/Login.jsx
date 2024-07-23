import Logo from "../../assets/LogoBlanco.png";
import React, { useState } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navegar = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();

    axios
      .post(
        "https://mapmanager-backend.onrender.com/api/user/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then(({ data }) => {
        localStorage.setItem("token", data.token);
        props.setLogged(true);
        navegar("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <form onSubmit={loginHandler}>
          <div className={styles.logoBox}>
            <img className={styles.logoIcon} src={Logo} alt="logoEvent" />
          </div>
          <div className={styles.inputBox}>
            <h3>INICIAR SESIÓN</h3>
            <div className={styles.inputGroup}>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo Electrónico"
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                required
              />
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.button} type="submit">
              Iniciar Sesión
            </button>
          </div>
          <p className={styles.register}>
              No tienes una cuenta? <a href="/register">Registrate</a>
            </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
