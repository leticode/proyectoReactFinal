import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Services() {
  const [filtro, setFiltro] = useState("Todos");
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3000/api/services").then((res) => res.json()),
      fetch("http://localhost:3000/api/categories").then((res) => res.json()),
    ])
      .then(([servicesData, categoriesData]) => {
        setServices(servicesData);
        setCategories(categoriesData);
      })
      .catch((err) => console.error(err));
  }, []);

  const selectedCategory = categories.find((category) => category.id === filtro);

  return (
    <section className="servicios">
      <h2>{filtro === "Todos" ? "Todos" : selectedCategory?.category ?? "Categoría"}</h2>

      <div className="contenedor-servicios">
        <div className="filter">

          <button onClick={() => setFiltro("Todos")}>Todos</button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFiltro(category.id)}
            >
              {category.category}
            </button>
          ))}
        </div>

        <div className="grid-servicios">
          {services
            .filter(
              (service) =>
                filtro === "Todos" || service.categoryId === filtro
            )
            .map((service) => (
              <Link
                key={service.id}
                to={`/services/${service.id}`}
                className="card"
              >
                <div className="img-container">
                  <img src={service.img} alt={service.name} />
                  <p className="service-title">{service.name}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
