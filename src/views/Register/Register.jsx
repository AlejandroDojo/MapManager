import Logo from "../../assets/LogoBlanco.png";
import React, { useState } from "react";
import styles from "./Register.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navegar = useNavigate();
  const registerHandler = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:8080/api/register/user",
        {
          firstName,
          lastName,
          email,
          password,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", data.token);
        props.setLogged(true);
        navegar("/");
      })
      .catch((err) => console.log(err));
  };
  const login = () => {
    navegar("/login");
  };
  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerBox}>
        <form onSubmit={registerHandler}>
          <div className={styles.logoBox}>
            <img src={Logo} alt="logoEvent" />
          </div>
          <div className={styles.inputBox}>
            <h3>REGISTRAR CUENTA</h3>
            <div className={styles.inputGroup}>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Nombre"
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Apellido"
                required
              />
            </div>
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
              Registrar
            </button>
          </div>
          <p className={styles.login}>
              ¿Ya creaste una cuenta? <a href="/login">Inicia Sesión</a>
            </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
