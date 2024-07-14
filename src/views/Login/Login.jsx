import Logo from "../../assets/LogoBlanco.png";
import React, { useState } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localRemember, setLocalRemember] = useState(false);
  const navegar = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:8080/api/user/login",
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
        localStorage.setItem("remember", localRemember);
        
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
          <div className={styles.inputGroupRememberMe}>
            <input
              type="checkbox"
              id="remember"
              checked={localRemember}
              onChange={(e) => setLocalRemember(e.target.checked)}
            />
            <label htmlFor="remember">Recordar</label>
          </div>
          <button className={styles.button} type="submit">
            Iniciar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
