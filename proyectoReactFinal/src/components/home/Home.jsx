import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

    const handleToServices = () => {
        navigate("/servicios");
    }

    const handleToAboutUs = () => {
        navigate("/aboutUs"); 
    }

    return (
        <>
            <main className="home-main">
                <section className="home-section">
                    <div className="home-content">
                        <div className="home-presentation">
                            <h2 className="home-title">Belleza, equilibrio y bienestar en un solo lugar</h2>
                            <p className="home-text">
                                Trabajamos con estándares profesionales,
                                equipamiento moderno y un enfoque personalizado
                                para garantizar seguridad, eficacia y resultados
                                que potencian tu belleza natural.
                            </p>
                        </div>
                        <div className="home-buttons">
                            <button className="btn-services" onClick={handleToServices}>Nuestros servicios</button>
                            <button className="btn-us" onClick={handleToAboutUs}>Sobre nosotros</button>
                        </div>
                    </div>

                </section>
            </main>
        </>
    )
};

export default Home;