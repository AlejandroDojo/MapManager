import Logo from '../../assets/LogoBlanco.png'
import React, { useState } from 'react';
import styles from './Login.module.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginBox}>
                <form>
                <div className={styles.logoBox}>
                <img src={Logo} alt="logoEvent" />
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
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                        />
                        <label htmlFor="remember">Recordar</label>
                    </div>
                    <button type="submit">Iniciar</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
