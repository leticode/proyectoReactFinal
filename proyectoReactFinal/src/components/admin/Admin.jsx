import React, { useEffect, useState, useContext } from "react";
import { SERVICE_CATEGORIES_ARRAY } from "../../constants/serviceCategories";
import { AuthenticationContext } from "../services/auth/authContextProvider";

const Admin = () => {
    const { token, handleUserLogout, user } = useContext(AuthenticationContext);
    const [serverMessage, setServerMessage] = useState("");
    const [services, setServices] = useState([]);
    const [professionals, setProfessionals] = useState([]);
    const [modal, setModal] = useState(false);
    const [modifyID, setModifyID] = useState(0);

    const emptyService = {
        name: "",
        img: "",
        price: 0,
        description: "",
        professionalId: "",
        duration: 0,
        category: "",
    };
    const [newService, setNewService] = useState(emptyService);

    const loadServices = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/services", {
                method: "GET"
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

    const loadProfessionals = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/professionals", {
                method: "GET"
            });
            const data = await response.json();

            if (!response.ok) {
                setServerMessage(data.message || "error al traer profesionales");
                return;
            }

            setProfessionals(data);
        } catch (error) {
            console.error(error);
            setServerMessage("Error al conectar con el servidor");
        }
    };

    useEffect(() => {
        loadServices();
        loadProfessionals();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setNewService((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (modifyID == 0) {
            const response = await fetch(
                "http://localhost:3000/api/services",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(newService),
                }
            );
            const data = await response.json();
        } else {
            const response = await fetch(
                `http://localhost:3000/api/services/${modifyID}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(newService),
                }
            );
            const data = await response.json();
        }
        setModal(false);
        setNewService(emptyService);
        loadServices();

    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "¿Estás seguro de que quieres borrar este servicio?"
        );

        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:3000/api/services/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                setServerMessage(data.message || "Error al borrar servicio");
                return;
            }

            // Hay dos posibilidades para actualizar el array:
            // 1. lo actrualizamos manualmente (Elimino el servicio borrado del array que estamos mostrando para que desaparezca del front)
            // 2. lo volvemos a cargar desde el server (loadServices)

            // setServices((prev) => prev.filter((service) => service.id !== id));
            loadServices();
        } catch (error) {
            console.error(error);
            setServerMessage("Error al conectar con el servidor");
        }
    };

    const addService = () => {
        setModifyID(0);
        setModal(true);
    }

    const modifyService = (id) => {
        const service = services.filter((s) => s.id == id)[0];

        // let service=null;
        // for (let i=0;i<services.length;i++) {
        //     if (services[i].id == id) {
        //         service=services[i];
        //         break;
        //     }
        // }

        setNewService(service);
        setModifyID(id);
        setModal(true);
    }

    return (
        <div className="notFound-container">
            <div className="notFound-box">
                <h2 className="notFound-title">Admin</h2>
                {serverMessage && <p className="server-message">{serverMessage}</p>}

                <button className="notFound-btn" onClick={() => addService()}>
                    Agregar servicio
                </button>

                {modal && (
                    <div className="modal-overlay" onClick={() => setModal(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h3 className="modal-title">{modifyID == 0 ? "Agregar servicio" : "Modificar servicio"}</h3>
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
                                    Categoría
                                    <select
                                        name="category"
                                        value={newService.category}
                                        onChange={handleChange}
                                    >
                                        {SERVICE_CATEGORIES_ARRAY.map((category) => (
                                            <option key={category.value} value={category.value}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </label>

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

                                <label>
                                    Precio
                                    <input
                                        type="number"
                                        name="price"
                                        value={newService.price}
                                        onChange={handleChange}
                                        placeholder="Precio del servicio"
                                    />
                                </label>

                                <label>
                                    Descripción
                                    <input
                                        type="text"
                                        name="description"
                                        value={newService.description}
                                        onChange={handleChange}
                                        placeholder="Descripcion del servicio"
                                    />
                                </label>

                                <label>
                                    Profesional
                                    <select
                                        name="professionalId"
                                        value={newService.professionalId}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled>
                                            Selecciona un profesional
                                        </option>
                                        {professionals.map((professional) => (
                                            <option key={professional.id} value={professional.id}>
                                                {professional.firstName + ' ' + professional.lastName}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label>
                                    Duración
                                    <input
                                        type="number"
                                        name="duration"
                                        value={newService.duration}
                                        onChange={handleChange}
                                        placeholder="Duracion del servicio"
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

                <div className="services-grid">
                    {services.map((service) => (
                        <div className="card" key={service.id}>
                            <div className="img-container">
                                <img src={service.img} alt={service.name} />

                                <p className="titulo">{service.name}</p>
                            </div>

                            <div className="card-actions">
                                <button className="modal-title" onClick={() => modifyService(service.id)}>
                                    Actualizar
                                </button>

                                <button className="modal-title" onClick={() => handleDelete(service.id)}>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Admin;
