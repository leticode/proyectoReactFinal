import React from "react";
import { useState } from "react";

const ProfessionalsModal = ({ onClose, onSelect }) => {
    const [professionals, setProfessionals] = useState([]);
    //esto es para traer a los profesionales y asi poder mostrarlos
    useEffect(() => {
        fetch("http://localhost:3000/api/professionals")
            .then((res) => res.json())
            .then((data) => setProfessionals(data));
    }, []);

    return (
        <>
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2>Selecciona un profesional</h2>

                    {professionals.map((professional) => (
                        <button
                            key={professional.id}
                            onClick={() => onSelect(professional)} //guarda un solo profesional
                        >
                            {professional.name}
                        </button>
                    ))}

                    <button onClick={onClose}>
                        Cerrar
                    </button>
                </div>
            </div>
        </>
    )
}

export default ProfessionalsModal