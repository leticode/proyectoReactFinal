import React, { useEffect, useState } from "react";

const Admin = () => {
    const [serverMessage, setServerMessage] = useState("");
    const [services, setServices] = useState([]);

    useEffect(() => {
        const loadServices = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/services", {
                    method: "GET",
                });
                if (!response.ok) {
                    setServerMessage(data.message || "error al traer servicios");
                    return;
                }

                const data = await response.json();
                setServices(data);
            } catch (error) {
                console.error(error);
                setServerMessage("Error al conectar con el servidor");
            }
        };

        loadServices();
    }, []);


    return (
        <div className="notFound-container">
            <div className="notFound-box">
                <h2 className="notFound-title">Admin</h2>
                {serverMessage && (<p className="server-message">{serverMessage}</p>)}
                {services.map(service => (
                <div className="card" key={service.id}>
                    <div className="img-container">
                    <img src={service.img} alt={service.name} />
                    <p className="titulo">{service.name}</p>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default Admin;
