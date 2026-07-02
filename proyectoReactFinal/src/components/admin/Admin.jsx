import React, { useEffect, useState, useContext } from "react";
import { AuthenticationContext } from "../services/auth/authContextProvider";
import { toast } from "react-toastify";

const Admin = () => {
    const { token, handleUserLogout, user } = useContext(AuthenticationContext);
    const [serverMessage, setServerMessage] = useState("");
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [modal, setModal] = useState(false);
    const [modifyID, setModifyID] = useState(0);
    const [validationErrors, setValidationErrors] = useState({});

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [serviceIdToDelete, setServiceIdToDelete] = useState(null);

    const emptyService = {
        name: "",
        img: "",
        price: 0,
        description: "",
        duration: 0,
        categoryId: 0,
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

    const loadCategories = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/categories", {
                method: "GET"
            });
            const data = await response.json();

            if (!response.ok) {
                setServerMessage(data.message || "error al traer categorias");
                return;
            }

            setCategories(data);
        } catch (error) {
            console.error(error);
            setServerMessage("Error al conectar con el servidor");
        }
    };

    useEffect(() => {
        loadServices();
        loadCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setNewService((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const fieldsHaveErrors = () => {
        const newErrors = {};

        if (newService.categoryId == 0) {
            newErrors.categoryId = "Elija una categoria";
        } 
        if (newService.name.trim().length == 0) {
            newErrors.name = "El nombre no puede estar vacio";
        }
        if (newService.description.trim().length == 0) {
            newErrors.description = "La descripcion no puede estar vacio";
        }
        if (newService.img.trim().length == 0) {
            newErrors.img = "La url de la imagen no puede estar vacia";
        }
        if (newService.duration <= 0) {
            newErrors.duration = "La duracion no puede ser 0 ni negativa";
        }
        if (newService.price <= 0) {
            newErrors.price = "El precio no puede ser 0 ni negativo";
        }

        setValidationErrors(newErrors);
        const hasErrors = Object.keys(newErrors).length > 0; 
        return hasErrors;        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (fieldsHaveErrors()) {
            return;
        }

        if (modifyID == 0) {
            console.log(newService);
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
        loadServices();

    };

    const handleOpenDeleteModal = (id) => {
        setShowDeleteModal(true);
        setServiceIdToDelete(id);
    }

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setServiceIdToDelete(null);
    }

    const handleDelete = async (id) => {
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

            loadServices();
            handleCloseDeleteModal();
        } catch (error) {
            console.error(error);
            setServerMessage("Error al conectar con el servidor");
        }
    };

    const addService = () => {
        setNewService(emptyService);
        setModifyID(0);
        setValidationErrors({});
        setModal(true);
    }

    const modifyService = (id) => {
        const service = services.filter((s) => s.id == id)[0];

        setNewService(service);
        setModifyID(id);
        setValidationErrors({});
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


                {showDeleteModal && (
                    <div className="modal-container">
                        <div className="modal">
                            <h3>Confirmar eliminacion</h3>
                            <p>
                                ¿Seguro que deseas eliminar este servicio?
                            </p>

                            <div className="modal-buttons">
                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={handleCloseDeleteModal}
                                >Cancelar
                                </button>
                                <button
                                    type="button"
                                    className="delete-btn"
                                    onClick={() => handleDelete(serviceIdToDelete)}
                                >Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

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
                                        name="categoryId"
                                        value={newService.categoryId}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value={0} disabled>
                                            Selecciona una categoria
                                        </option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.category}
                                            </option>
                                        ))}
                                    </select>
                                    {validationErrors.categoryId && <p className="validationError">{validationErrors.categoryId}</p>}
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
                                    {validationErrors.name && <p className="validationError">{validationErrors.name}</p>}
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
                                    {validationErrors.img && <p className="validationError">{validationErrors.img}</p>}
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
                                    {validationErrors.price && <p className="validationError">{validationErrors.price}</p>}
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
                                    {validationErrors.description && <p className="validationError">{validationErrors.description}</p>}
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
                                    {validationErrors.duration && <p className="validationError">{validationErrors.duration}</p>}
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
                                <button type="button" onClick={() => modifyService(service.id)}>
                                    Actualizar
                                </button>

                                <button type="button" onClick={() => handleOpenDeleteModal(service.id)}>
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
