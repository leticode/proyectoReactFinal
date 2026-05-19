import React from "react";
import {useNavigate } from 'react-router-dom'

const NotFound = () => {

    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate("/home"); 
    }

    return (
        <div>
            <h2>Ha ocurrido un error: página no encontrada</h2>
            <button onClick={handleBackToHome}>
                Volver al inicio
            </button>
        </div>
    )
}

export default NotFound