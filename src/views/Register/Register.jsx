import Logo from '../../assets/LogoBlanco.png'
import React, { useState } from 'react';
import styles from './Register.module.css';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className={styles.registerContainer}>
            <div className={styles.registerBox}>
                <form>
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
                    <button className={styles.button} type="submit">Registrar</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
