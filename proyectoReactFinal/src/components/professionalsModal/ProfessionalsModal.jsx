import React from "react";
import { useState, useEffect } from "react";

const ProfessionalsModal = ({ onClose, onSelect }) => {
    const [professionals, setProfessionals] = useState([]);
    const [showCalendar, setShowCalendar] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3000/api/professionals")
            .then((res) => res.json())
            .then((data) => setProfessionals(data));
    }, []);

    return (
        <>
            <div className="modal-professionals">
                <div className="modal-content">
                    <h2>Selecciona un profesional</h2>

                    <div className="professionals-list">
                        {professionals.map((professional) => (
                            <button
                                key={professional.id}
                                className="professional-card"
                                onClick={() => onSelect(professional)}
                                
                            >
                                <h4>
                                    {professional.firstName} {professional.lastName}
                                </h4>
                            </button>
                        ))}
                    </div>
                    <button onClick={onClose} className="close-professionals">
                        Cerrar
                    </button>
                </div>
            </div>
        </>
    )
}

export default ProfessionalsModal