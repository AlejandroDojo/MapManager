import React from 'react'
import Header from "../../components/Header/Header";
import HomePage from '../HomePage/HomePage';

const Display = () => {
    return (
        <>
            <Header logged={false} />
            <HomePage />
        </>
    )
}

export default Display;