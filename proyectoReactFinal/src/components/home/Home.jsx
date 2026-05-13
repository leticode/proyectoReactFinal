import { useState } from "react";
import React from "react";

const Home = () =>{
    return(
        <>
            <body className="home-body">
                <section className="home-section">
                    <div className="home-presentation">
                        <h2 className="home-title">Belleza, equilibrio y bienestar en un solo lugar</h2>
                        <p className="home-text">Trabajamos con estándares profesionales, equipamiento moderno y un enfoque personalizado para garantizar seguridad, eficacia y resultados que potencian tu belleza natural.</p>
                    </div>
                    <div className="home-buttons">
                        <button className="button-services">Servicios</button>
                        <button className="button-us">Nosotros</button>
                    </div>
                </section>
            </body>
        </>
    )
};

export default Home;