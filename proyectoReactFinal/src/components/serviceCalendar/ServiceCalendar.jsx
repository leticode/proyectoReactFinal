//use la libreria react-calendar para hacer todo el visual del calendario
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";

function ServiceCalendar({serviceId, professionalId, onClose}) {
    const [fecha, setFecha] = useState(new Date());

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

                    <p>
                        Fecha seleccionada: {fecha.toLocaleDateString()}
                    </p>

                    <div className="hours">
                        <button>09:00</button>
                        <button>10:00</button>
                        <button>11:00</button>
                        <button>12:00</button>
                    </div>

                    <button className="btn-confirmar">
                        Confirmar Reserva
                    </button>

                </div>
            </div>
        </>
    );
}

export default ServiceCalendar;