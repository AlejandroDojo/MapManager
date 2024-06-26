import { useState } from 'react';

const Register = (props) => {
    return (
        <> 
            <div>
                <h2>Registrar usuario</h2>
                <label>Nombre</label>
                <input type='text'/>
                <label>Apellido</label>
                <input type='text'/>
            </div>
        </>
        );
};

export default Register;