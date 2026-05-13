import { useState, useEffect } from "react";

export default function Services() {
  const [filtro, setFiltro] = useState("Todos");
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/services")
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="servicios">
      <h2>{filtro === "Todos" ? "Servicios" : filtro}</h2>

      <div className="contenedor-servicios">
      {/* CARDS (LO QUE SE VE)*/}
        <div className="filter">
          <button onClick={() => setFiltro("Todos")}>Todos</button>
          <button onClick={() => setFiltro("Cuidados faciales")}>Cuidados faciales</button>
          <button onClick={() => setFiltro("Pestañas y cejas")}>Pestañas y cejas</button>
          <button onClick={() => setFiltro("Tratamientos corporales")}>Tratamientos corporales</button>
          <button onClick={() => setFiltro("Masajes")}>Masajes</button>
          <button onClick={() => setFiltro("Depilación definitiva")}>Depilación definitiva</button>
          <button onClick={() => setFiltro("Combos")}>Combos</button>
        </div>
        {/* Cards (MAPEO DE LAS CARDS PARA ACORTAR CODIGO Y NO HACER UNA X UNA ESTO) */}
        <div className="grid-servicios">
          {services
            .filter(service =>
              filtro === "Todos" || service.tags.includes(filtro)
            )
            .map(service => (
              <div className="card" key={service.id}>
                <div className="img-container">
                  <img src={service.img} alt={service.name} />
                  <p className="titulo">{service.name}</p>
                </div>
              </div>
            ))}
        </div>

      </div>
    </section>
  );
}