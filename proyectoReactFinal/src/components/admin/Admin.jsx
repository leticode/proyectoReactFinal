import React, { useEffect, useState } from "react";

const Admin = () => {
    const [serverMessage, setServerMessage] = useState("");
    const [services, setServices] = useState([]);
    const [modal, setModal] = useState(false);
    const [newService, setNewService] = useState({
        name: "",
        img: "",
    });

    useEffect(() => {
        const loadServices = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/services", {
                method: "GET",
            });
            const data = await response.json();

            if (!response.ok) {
                setServerMessage(data.message || "error al traer servicios");
                return;
            }

            setServices(data);
        } catch (error) {
            console.error(error);
            setServerMessage("Error al conectar con el servidor");
        }
        };

        loadServices();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setNewService((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Nuevo servicio:", newService);
        setModal(false);
    };

    return (
        <div className="notFound-container">
            <div className="notFound-box">
                <h2 className="notFound-title">Admin</h2>
                {serverMessage && <p className="server-message">{serverMessage}</p>}

                <button className="notFound-btn" onClick={() => setModal(true)}>
                Agregar servicio
                </button>

                {modal && (
                <div className="modal-overlay" onClick={() => setModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">Agregar servicio</h3>
                            <button
                            type="button"
                            className="modal-close"
                            onClick={() => setModal(false)}
                            >
                            x
                            </button>
                        </div>

                        <form className="modal-form" onSubmit={handleSubmit}>
                            <label>
                            Nombre
                            <input
                                type="text"
                                name="name"
                                value={newService.name}
                                onChange={handleChange}
                                placeholder="Nombre del servicio"
                            />
                            </label>

                            <label>
                            Imagen
                            <input
                                type="text"
                                name="img"
                                value={newService.img}
                                onChange={handleChange}
                                placeholder="URL de la imagen"
                            />
                            </label>

                            <div className="modal-actions">
                            <button
                                type="button"
                                className="modal-cancel-btn"
                                onClick={() => setModal(false)}
                            >
                                Cancelar
                            </button>
                            <button type="submit" className="notFound-btn">
                                Guardar
                            </button>
                            </div>
                        </form>
                    </div>
                </div>
                )}

                {services.map((service) => (
                <div className="card" key={service.id}>
                    <div className="img-container">
                    <img src={service.img} alt={service.name} />
                    <p className="titulo">{service.name}</p>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
};

export default Admin;
