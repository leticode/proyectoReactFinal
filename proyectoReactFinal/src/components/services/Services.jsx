import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  SERVICE_CATEGORY_DICTIONARY,
  SERVICE_CATEGORIES_ARRAY,
} from "../../constants/serviceCategories";

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
      <h2>{filtro=="Todos"?"Todos":SERVICE_CATEGORY_DICTIONARY[filtro].name}</h2>

      <div className="contenedor-servicios">
        <div className="filter">

          <button onClick={() => setFiltro("Todos")}>Todos</button>

          {/* Crear los botones de todas las categorias */}
          {SERVICE_CATEGORIES_ARRAY.map((category) => (
            <button
              key={category.value}
              onClick={() => setFiltro(category.value)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid-servicios">
          {services
            .filter(
              (service) =>
                filtro === "Todos" || service.category == filtro
            )
            .map((service) => (
              <Link
                key={service.id}
                to={`/services/${service.id}`}
                className="card"
              >
                <div className="img-container">
                  <img src={service.img} alt={service.name} />
                  <p className="titulo">{service.name}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
