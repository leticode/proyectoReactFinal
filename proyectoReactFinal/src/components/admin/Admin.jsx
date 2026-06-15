import React, { useEffect, useState } from "react";
import { SERVICE_CATEGORIES_ARRAY } from "../../constants/serviceCategories";

const Admin = () => {
    const [serverMessage, setServerMessage] = useState("");
    const [services, setServices] = useState([]);
    const [modal, setModal] = useState(false);
    const emptyService = {
        name: "",
        img: "",
        price: 0,
        description: "",
        professional: "",
        duration: 0,
        category: "",
    };
    const [newService, setNewService] = useState(emptyService);

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
    useEffect(() => {
        loadServices();
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

    const response = await fetch(
        "http://localhost:3000/api/services",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newService),
        }
    );

    const data = await response.json();

    setModal(false);
    setNewService(emptyService);

    // Hay dos posibilidades para actualizar el array:
    // 1. lo actrualizamos manualmente
    // 2. lo volvemos a cargar desde el server (loadServices)
    // setServices((prev) => [...prev, data]);
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
                                    <input
                                        type="text"
                                        name="professional"
                                        value={newService.professional}
                                        onChange={handleChange}
                                        placeholder="Profesional encargado del servicio"
                                    />
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
                <button className="modal-title">
                    Actualizar
                </button>

                <button className="modal-title" onClick={()=>handleDelete(service.id)}>
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
