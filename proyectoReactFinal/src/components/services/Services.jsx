
const services = [
  { id: 1, nombre: "Peeling mecánico", img: "/img/servicio1.jpg" },
  { id: 2, nombre: "Peeling mecánico", img: "/img/servicio1.jpg" },
  { id: 3, nombre: "Peeling mecánico", img: "/img/servicio1.jpg" },
  { id: 4, nombre: "Peeling mecánico", img: "/img/servicio1.jpg" },
  { id: 5, nombre: "Peeling mecánico", img: "/img/servicio1.jpg" },
  { id: 6, nombre: "Peeling mecánico", img: "/img/servicio1.jpg" },
];

export default function Services() {
  return (
    <section className="servicios">
      <h2>Servicios</h2>
      <div className="contenedor-servicios">

        {/* CARDS (LO QUE SE VE)*/}
        <div className="filter">
          <button>Cuidados faciales</button>
          <button>Pestañas y cejas</button>
          <button>Tratamientos corporales</button>
          <button>Masajes</button>
          <button>Depilación definitiva</button>
          <button>Combos</button>
        </div>

        {/* Cards (MAPEO DE LAS CARDS PARA ACORTAR CODIGO Y NO HACER UNA X UNA ESTO) */}
        <div className="grid-servicios">
          {services.map((servicio) => (
            <div className="card" key={servicio.id}>
              <img src={servicio.img} alt={servicio.nombre} />
              <p>{servicio.nombre}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}