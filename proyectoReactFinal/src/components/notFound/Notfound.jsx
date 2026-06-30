import React from "react";
import { useNavigate } from 'react-router-dom'

const NotFound = () => {

    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate("/home");
    }
    const handleToServices = () => {
        navigate("/servicios");
    }

    return (
        <div className="notFound-container">
            <div className="notFound-box">
                <h2 className="notFound-title">Ha ocurrido un error: página no encontrada</h2>
                <div className="notFound-box-btns">
                    <button className="notFound-btn" onClick={handleBackToHome}>Volver al inicio</button>
                    <button className="notFound-btn-services" onClick={handleToServices}>Nuestros servicios</button>
                </div>

            </div>
        </div>
    )
}

export default NotFound