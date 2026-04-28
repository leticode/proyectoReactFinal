import { useState } from "react";

const services = [
  {
    id: 1,
    name: "Peeling mecánico",
    description: "El peeling mecánico elimina las celulas muertas...",
    price: 90000,
    img: "/img/servicesImg/peeling-mecanico.webp",
    professional: "Bide Lucia",
    tags: ["Cuidados faciales"]
  },
  {
    id: 2,
    name: "Depilación definitiva en axila",
    description: "Incluye una sola sesión...",
    price: 5000,
    img: "/img/servicesImg/depilacion-axila.webp",
    professional: "Soulos Leticia",
    tags: ["Depilación definitiva"]
  },
  {
    id: 3,
    name: "Láser CO2",
    description: "Este tratamiento busca eliminar imperfecciones...",
    price: 250000,
    img: "/img/servicesImg/laser-CO2.webp",
    professional: "Romero Lucia",
    tags: ["Cuidados faciales"]
  },
  {
    id: 4,
    name: "Depilación tren inferior",
    description: "Incluye cavado extendido...",
    price: 58000,
    img: "/img/servicesImg/tren-inferior.webp",
    professional: "Bide Lucia",
    tags: ["Depilación definitiva", "Combos"]
  },
  {
    id: 5,
    name: "Lifting facial",
    description: "Reposiciona tejidos...",
    price: 2000000,
    img: "/img/servicesImg/lifting-facial.webp",
    professional: "Bide Lucia",
    tags: ["Cuidados faciales"]
  },
  {
    id: 6,
    name: "Micropigmentación de cejas",
    description: "Proceso con pigmentos...",
    price: 42000,
    img: "/img/servicesImg/micropigmentacion-cejas.webp",
    professional: "Romero Lucia",
    tags: ["Pestañas y cejas"]
  },
  {
    id: 7,
    name: "Lifting de pestañas",
    description: "Curvatura perfecta...",
    price: 25000,
    img: "/img/servicesImg/lifting-pestañas.webp",
    professional: "Romero Lucia",
    tags: ["Pestañas y cejas"]
  },
  {
    id: 8,
    name: "Masaje relajante",
    description: "Relajación muscular...",
    price: 15000,
    img: "/img/servicesImg/masaje-relajante.webp",
    professional: "Calderone Valentina",
    tags: ["Masajes"]
  },
  {
    id: 9,
    name: "Drenaje linfático",
    description: "Movimientos suaves...",
    price: 16000,
    img: "/img/servicesImg/drenaje-linfatico.webp",
    professional: "Calderone Valentina",
    tags: ["Masajes"]
  },
  {
    id: 10,
    name: "Tratamiento para el acné",
    description: "Limpieza profunda...",
    price: 15000,
    img: "/img/servicesImg/tratamiento-acne.webp",
    professional: "Calderone Valentina",
    tags: ["Cuidados faciales"]
  },
  {
    id: 11,
    name: "Depilación definitiva del rostro",
    description: "Incluye frente, bozo...",
    price: 12000,
    img: "/img/servicesImg/depilacion-rostro.webp",
    professional: "Romero Lucia",
    tags: ["Depilación definitiva", "Combos"]
  },
  {
    id: 12,
    name: "Exfoliación corporal",
    description: "Remueve células muertas...",
    price: 27000,
    img: "/img/servicesImg/exfoliacion-corporal.webp",
    professional: "Soulos Leticia",
    tags: ["Tratamientos corporales"]
  },
  {
    id: 13,
    name: "Tratamiento piel de porcelana",
    description: "Limpieza profunda + nanopore...",
    price: 42000,
    img: "/img/servicesImg/tratamiento-piel-porcelana.webp",
    professional: "Bide Lucia",
    tags: ["Cuidados faciales"]
  },
  {
    id: 14,
    name: "Depilación de espalda",
    description: "Sesión de 20 minutos...",
    price: 7000,
    img: "/img/servicesImg/depilacion-espalda.webp",
    professional: "Romero Lucia",
    tags: ["Depilación definitiva"]
  },
  {
    id: 15,
    name: "Depilación de brazos",
    description: "Incluye hombros a muñecas...",
    price: 16000,
    img: "/img/servicesImg/depilacion-brazos.webp",
    professional: "Bide Lucia",
    tags: ["Depilación definitiva"]
  },
  {
    id: 16,
    name: "Masajes relajantes y reflexología",
    description: "Reduce estrés...",
    price: 22000,
    img: "/img/servicesImg/masaje-reflexologia.webp",
    professional: "Bide Lucia",
    tags: ["Masajes", "Combos"]
  },
  {
    id: 17,
    name: "Extensión de pestañas",
    description: "Pestañas de seda...",
    price: 11500,
    img: "/img/servicesImg/pestañas-extension.webp",
    professional: "Bide Lucia",
    tags: ["Pestañas y cejas"]
  },
  {
    id: 18,
    name: "Tratamiento para estrías",
    description: "Estimula colágeno...",
    price: 220000,
    img: "/img/servicesImg/tratamiento-estrias.webp",
    professional: "Soulos Leticia",
    tags: ["Tratamientos corporales"]
  },
  {
    id: 19,
    name: "Tratamiento flacidez y celulitis",
    description: "Radiofrecuencia...",
    price: 1700000,
    img: "/img/servicesImg/tratamiento-flacidez-celulitis.webp",
    professional: "Soulos Leticia",
    tags: ["Tratamientos corporales"]
  },
];

export default function Services() {
  const [filtro, setFiltro] = useState("Todos");

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