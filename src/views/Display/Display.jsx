import React from 'react'
import Header from "../../components/Header/Header";
import HomePage from '../HomePage/HomePage';

const Display = () => {
    return (
        <>
            <Header logged={false} />
            <HomePage title='LOS MEJORES EVENTOS AL ALCANCE DE TU MANO' subtitle='Encuentra tus eventos favoritos aquí'/>
        </>
    )
}

export default Display;