import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Services() {
  const [filtro, setFiltro] = useState("Todos");
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="servicios">
      <h2>{filtro === "Todos" ? "Servicios" : filtro}</h2>

      <div className="contenedor-servicios">
        <div className="filter">
          <button onClick={() => setFiltro("Todos")}>Todos</button>

          <button onClick={() => setFiltro("Cuidados faciales")}>
            Cuidados faciales
          </button>

          <button onClick={() => setFiltro("Pestañas y cejas")}>
            Pestañas y cejas
          </button>

          <button onClick={() => setFiltro("Tratamientos corporales")}>
            Tratamientos corporales
          </button>

          <button onClick={() => setFiltro("Masajes")}>
            Masajes
          </button>

          <button onClick={() => setFiltro("Depilación definitiva")}>
            Depilación definitiva
          </button>

          <button onClick={() => setFiltro("Combos")}>
            Combos
          </button>
        </div>

        <div className="grid-servicios">
          {services
            .filter(
              (service) =>
                filtro === "Todos" ||
                service.tags.includes(filtro)
            )
            .map((service) => (
              <Link
                key={service.id}
                to={`/services/${service.id}`}
                className="card"
              >
                <div className="img-container">
                  <img
                    src={service.img}
                    alt={service.name}
                  />
                  <p className="titulo">
                    {service.name}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}