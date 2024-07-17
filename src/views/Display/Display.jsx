import React from 'react'
import Header from "../../components/Header/Header";
import HomePage from '../HomePage/HomePage';

const Display = ({setLogged}) => {
    return (
        <>
            <Header logged={false} setLogged={setLogged}/>
            <HomePage title='LOS MEJORES EVENTOS AL ALCANCE DE TU MANO' subtitle='Encuentra tus eventos favoritos aquí'/>
        </>
    )
}

export default Display;