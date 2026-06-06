import React from "react";
import {useNavigate } from 'react-router-dom'

const Admin = () => {

    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate("/home"); 
    }

    return (
        <div className="notFound-container">
            <div className="notFound-box">
                <h2 className="notFound-title">Admin</h2>
                <button className="notFound-btn" onClick={handleBackToHome}>
                    Volver al inicio
                </button>
            </div>
        </div>
    )
}

export default Admin;