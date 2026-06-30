import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useContext, useState, useEffect } from "react";
import { AuthenticationContext } from "../services/auth/authContextProvider";
import { toast } from "react-toastify";

function ServiceCalendar({ service, professionalId, onClose }) {
    const { user, token } = useContext(AuthenticationContext);
    const [fecha, setFecha] = useState(new Date());
    const [selectedHour, setSelectedHour] = useState(null);
    const [slots, setSlots] = useState([]);
    const serviceDuration = service.duration;

    useEffect(() => {
        const fetchSlots = async () => {
            const res = await fetch(
                `http://localhost:3000/api/appointments/${professionalId}/available-slots?date=${fecha.toISOString().split("T")[0]}&serviceDuration=${service.duration}`
            );

            const data = await res.json();

            setSlots(data);
            setSelectedHour(null);
        };

        if (professionalId) {
            fetchSlots();
        }
    }, [fecha, professionalId]);

    const handleConfirmAppointment = async () => {
        try {
            if (!user) {
                toast.error("Debes iniciar sesión para reservar");
                return;
            }

            if (!selectedHour) {
                toast.error("Seleccione un horario");
                return;
            }
            const response = await fetch(
                "http://localhost:3000/api/appointments",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        date: fecha.toISOString().split("T")[0],
                        hour: selectedHour,
                        userId: user?.id,
                        professionalId,
                        serviceId: service.id
                    })
                }
            );
            
            const data = await response.json();
            console.log(data);

            if (!response.ok) {
                toast.error(data.message || "No se pudo reservar el turno");
                return;
            }

            toast.success("Turno creado correctamente");
            onClose();

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="modal-overlay">
                <div className="modal-calendar">

                    <button
                        className="cerrar"
                        onClick={onClose}
                    >
                        X
                    </button>

                    <h2 className="calendar-title">Seleccionar Turno</h2>

                    <div className="calendar-container">
                        <Calendar
                            onChange={setFecha}
                            value={fecha}
                            tileDisabled={({ date }) => date.getDay() === 0}
                        />
                    </div>

                    <div className="hours">
                        {slots?.map((slot) => (
                            <button
                                key={slot}
                                className={selectedHour === slot ? "selected" : ""}
                                onClick={() => setSelectedHour(slot)}
                            >
                                {slot}
                            </button>
                        ))}
                    </div>
                    <button
                        className="btn-confirmar"
                        onClick={handleConfirmAppointment}
                    >
                        Confirmar Reserva
                    </button>

                </div>
            </div>
        </>
    );
}

export default ServiceCalendar;