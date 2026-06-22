import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../services/auth/authContextProvider";
import { toast } from "react-toastify";
import '../../index.css';

const MyAppointments = () => {
    const { user, token } = useContext(AuthenticationContext);
    const [appointments, setAppointments] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [services, setServices] = useState([]);
    const [professionals, setProfessionals] = useState([]);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [appointmentForm, setAppointmentForm] = useState({
        userId: "",
        serviceId: "",
        professionalId: "",
        date: "",
        hour: ""
    });

    const isSuperadmin = user?.role === "superadmin";
    const isAdmin = user?.role === "admin";
    const isProfessional = user?.role === "professional";
    const isCustomer = user?.role === "customer";

    const canCreate = isAdmin || isProfessional;
    const canDelete = isAdmin || isProfessional;
    const today = new Date().toISOString().split("T")[0];

    const statusOptions = [
        { value: "pendiente", label: "pendiente" },
        { value: "en curso", label: "en curso" },
        { value: "terminado", label: "terminado" },
        { value: "cancelado", label: "cancelado" }
    ];

    const formatStatus = (status) => (
        status === "terminado" ? "finalizado" : status
    );

    const handleLoadAppointments = () => {
        fetch("http://localhost:3000/api/appointments", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Error al cargar turnos");
                }

                return res.json();
            })
            .then((data) => setAppointments(data))
            .catch(() => toast.error("No se pudieron cargar los turnos"));
    };

    const handleLoadFormData = () => {
        fetch("http://localhost:3000/api/user", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((data) => setCustomers(data.filter((u) => u.role === "customer")))

        fetch("http://localhost:3000/api/services")
            .then((res) => res.json())
            .then((data) => setServices(data))

        fetch("http://localhost:3000/api/professionals")
            .then((res) => res.json())
            .then((data) => setProfessionals(data))
    };

    useEffect(() => {
        if (token) {
            handleLoadAppointments();
        }
    }, [token]);

    useEffect(() => {
        if (showCreateModal) {
            handleLoadFormData();
        }
    }, [showCreateModal]);

    useEffect(() => {
        const selectedService = services.find(
            (service) => service.id === Number(appointmentForm.serviceId)
        );

        if (appointmentForm.professionalId && appointmentForm.date && selectedService) {
            fetch(
                `http://localhost:3000/api/appointments/${appointmentForm.professionalId}/available-slots?date=${appointmentForm.date}&serviceDuration=${selectedService.duration}`
            )
                .then((res) => res.json())
                .then((data) => setAvailableSlots(data))
                .catch(() => toast.error("No se pudieron cargar los horarios"));
        } else {
            setAvailableSlots([]);
        }
    }, [appointmentForm.professionalId, appointmentForm.date, appointmentForm.serviceId, services]);

    const [showCancelModal, setShowCancelModal] = useState(false); //modal para el usuario al querer cancelqar turno
    const [appointmentToCancel, setAppointmentToCancel] = useState(null);
    const openCancelModal = (appointmentId) => {
        setAppointmentToCancel(appointmentId);
        setShowCancelModal(true);
    };
    const confirmCancelAppointment = () => {
        handleUpdateStatus(appointmentToCancel, "cancelado");
        setShowCancelModal(false);
        setAppointmentToCancel(null);
    };

    const [showDeleteModal, setShowDeleteModal] = useState(false); //modal para confirmar eliminacion de turno
    const [appointmentToDelete, setAppointmentToDelete] = useState(null);

    const handleOpenDeleteModal = (appointmentId) => {
        setAppointmentToDelete(appointmentId);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setAppointmentToDelete(null);
        setShowDeleteModal(false);
    };

    const handleChangeForm = (event) => {
        const { name, value } = event.target;

        setAppointmentForm((prev) => {
            const updated = {
                ...prev,
                [name]: value
            };

            if (
                name === "professionalId" ||
                name === "date" ||
                name === "serviceId"
            ) {
                updated.hour = "";
            }

            return updated;
        });
    };

    const handleCloseCreateModal = () => {
        setShowCreateModal(false);
        setAvailableSlots([]);
        setAppointmentForm({
            userId: "",
            serviceId: "",
            professionalId: "",
            date: "",
            hour: ""
        });
    };

    const handleCreateAppointment = (event) => {
        event.preventDefault();

        if (!appointmentForm.userId || !appointmentForm.serviceId || !appointmentForm.professionalId || !appointmentForm.date || !appointmentForm.hour) {
            toast.error("Completa todos los campos");
            return;
        }

        fetch("http://localhost:3000/api/appointments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                date: appointmentForm.date,
                hour: appointmentForm.hour,
                userId: Number(appointmentForm.userId),
                professionalId: Number(appointmentForm.professionalId),
                serviceId: Number(appointmentForm.serviceId)
            })
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("No se pudo crear el turno");
                }

                return res.json();
            })
            .then(() => {
                handleLoadAppointments();
                handleCloseCreateModal();
                toast.success("Turno creado correctamente");
            })
            .catch((error) => toast.error(error.message));
    };

    const handleUpdateStatus = (appointmentId, status) => {
        fetch(`http://localhost:3000/api/appointments/${appointmentId}/status`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ status })
        })
            .then(async (res) => {
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.message);
                }

                return data;
            })
            .then(() => {
                handleLoadAppointments();
                toast.success("Estado actualizado");
            })
            .catch((error) => toast.error(error.message));
    };

    const handleDeleteAppointment = (appointmentId) => {
        fetch(`http://localhost:3000/api/appointments/${appointmentId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(async (res) => {
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.message);
                }

                return data;
            })
            .then(() => {
                handleLoadAppointments();
                toast.success("Turno eliminado");
            })
            .catch((error) => toast.error(error.message));
    };

    return (
        <>
            <h1>
                {isCustomer ? "Mis Turnos" : "Turnos"}
            </h1>

            <div className="management">
                <div className="management-container">
                    {canCreate && (
                        <button onClick={() => setShowCreateModal(true)}>
                            Añadir turno
                        </button>
                    )}

                    <table>
                        <thead>
                            <tr>
                                <th className="th-fecha">Fecha</th>
                                <th>Hora</th>
                                <th>Email</th>
                                <th>Servicio</th>
                                <th>Profesional</th>
                                <th>Estado</th>
                                {canDelete && <th></th>}
                            </tr>
                        </thead>

                        <tbody>
                            {appointments.map((appointment) => (
                                <tr key={appointment.id}>
                                    <td>{appointment.date}</td>
                                    <td>{appointment.hour?.slice(0, 5)}</td>
                                    <td>{appointment.user?.email}</td>
                                    <td>{appointment.service?.name}</td>
                                    <td>
                                        {appointment.professional
                                            ? `${appointment.professional.firstName} ${appointment.professional.lastName}`
                                            : "-"}
                                    </td>
                                    <td>
                                        {isSuperadmin ? (
                                            formatStatus(appointment.status)
                                        ) : isCustomer ? (
                                            appointment.status === "cancelado" ? (
                                                "cancelado"
                                            ) : (
                                                <button
                                                    onClick={() => openCancelModal(appointment.id)}
                                                >
                                                    Cancelar
                                                </button>
                                            )
                                        ) : (
                                            <select
                                                value={appointment.status}
                                                onChange={(e) => handleUpdateStatus(appointment.id, e.target.value)}
                                            >
                                                {statusOptions.map((status) => (
                                                    <option key={status.value} value={status.value}>
                                                        {status.label}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    </td>
                                    {canDelete && (
                                        <td>
                                            <button
                                                className="delete-button"
                                                onClick={() => handleOpenDeleteModal(appointment.id)}
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                            {appointments.length === 0 && (
                                <tr>
                                    <td colSpan={canDelete ? "7" : "6"}>
                                        No hay turnos registrados
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {showCancelModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Confirmar cancelación</h3>
                        <p>
                            ¿Estás seguro de que deseas cancelar este turno?
                        </p>

                        <div className="modal-buttons">
                            <button onClick={confirmCancelAppointment}>
                                Si
                            </button>

                            <button
                                onClick={() => {
                                    setShowCancelModal(false);
                                    setAppointmentToCancel(null);
                                }}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showDeleteModal && (
                <div className="modal-container">
                    <div className="modal">
                        <h3>Eliminar turno</h3>

                        <p>
                            ¿Estás seguro de que deseas eliminar este turno?
                        </p>

                        <div className="modal-buttons">
                            <button
                                type="button"
                                onClick={handleCloseDeleteModal}
                            >
                                Cancelar
                            </button>

                            <button
                                type="button"
                                className="delete-button"
                                onClick={() => {
                                    handleDeleteAppointment(appointmentToDelete);
                                    handleCloseDeleteModal();
                                }}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showCreateModal && (
                <div className="modal-container">
                    <div className="modal">
                        <h3>Añadir turno</h3>

                        <form onSubmit={handleCreateAppointment}>
                            <div className="input-new-appointment">
                                <label>Cliente</label>
                                <select
                                    name="userId"
                                    value={appointmentForm.userId}
                                    onChange={handleChangeForm}
                                >
                                    <option value="">Seleccionar cliente</option>
                                    {customers.map((customer) => (
                                        <option key={customer.id} value={customer.id}>
                                            {customer.email}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="input-new-appointment">
                                <label>Servicio</label>
                                <select
                                    name="serviceId"
                                    value={appointmentForm.serviceId}
                                    onChange={handleChangeForm}
                                >
                                    <option value="">Seleccionar servicio</option>
                                    {services.map((service) => (
                                        <option key={service.id} value={service.id}>
                                            {service.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="input-new-appointment">
                                <label>Profesional</label>
                                <select
                                    name="professionalId"
                                    value={appointmentForm.professionalId}
                                    onChange={handleChangeForm}
                                >
                                    <option value="">Seleccionar profesional</option>
                                    {professionals.map((professional) => (
                                        <option key={professional.id} value={professional.id}>
                                            {professional.firstName} {professional.lastName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="input-new-appointment">
                                <label>Fecha</label>
                                <input
                                    className="update-input"
                                    type="date"
                                    name="date"
                                    min={today}
                                    value={appointmentForm.date}
                                    onChange={handleChangeForm}
                                />
                            </div>

                            <div className="input-new-appointment">
                                <label>Horario</label>
                                <select
                                    name="hour"
                                    value={appointmentForm.hour}
                                    onChange={handleChangeForm}
                                >
                                    <option value="">Seleccionar horario</option>
                                    {availableSlots.map((slot) => (
                                        <option key={slot} value={slot}>
                                            {slot}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="modal-buttons">
                                <button type="button" onClick={handleCloseCreateModal}>
                                    Cancelar
                                </button>
                                <button type="submit">
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default MyAppointments