
const services = [
  { 
    id: 1, 
    name: "Peeling mecánico",
    description: "El peeling mecánico elimina las celulas muertas y mejora la textura cutanea. La esencia de la manipulación consiste en limpiar la superficie de la piel mediante un pelado o la eliminación de la capa córnea de la epidermis utilizando productos cosméticos. Si el profesional recurre a una exfoliación, se puede esperar una acción más profunda. Tras la eliminación de las células envejecidas, se inicia la regeneración del tejido cutáneo. El peeling con dispositivo se realiza mediante cepillos rotativos especiales. Es una manipulación indolora, recomendada una vez al mes para pieles secas y una vez a la semana para pieles grasas.",
    price: 90000,
    img: "/img/servicesImg/peeling-mecanico.webp",
    professional: "Bide Lucia",
    tags: "Cuidados faciales"
  },
  { 
    id: 2, 
    name: "Depilación definitiva en axila",
    description: "Incluye una sola sesión. Consiste en destruir mediante calor las raíces de los pelos para que éstos no vuelvan a crecer.",
    price: 5000,
    img: "/img/servicesImg/depilacion-axila.webp",
    professional: "Soulos Leticia",
    tags: "Depilacion definitiva" 
  },
  { 
    id: 3, 
    name: "Láser CO2",
    description: "Este tratamiento buscar eliminar imperfecciones faciales mediante el uso del fraccionado de luz capa por capa de la piel, que estimula la obtención de colágeno, dando como resultado la posibilidad de rectificar las imperfecciones y contrarrestar los efectos que se producen en la piel con el paso del tiempo.",
    price: 250000,
    img: "/img/servicesImg/laser-CO2.webp",
    professional: "Romero Lucia",
    tags: "Cuidados faciales" 
  },
  { 
    id: 4, 
    name: "Depilación tren inferior",
    description: "Este combo, de una sola sesión, incluye cavado extendido o genitales, pierna entera, gluteos y tira de cola.",
    price: 58000,
    img: "/img/servicesImg/tren-inferior.webp",
    professional: "Bide Lucia",
    tags: "Depilacion definitiva | Combos" 
  },
  { 
    id: 5, 
    name: "Lifting facial",
    description: "Es un procedimiento que busca reposicionar los tejidos caídos y reducir los pliegues o las arrugas.",
    price: 2000000,
    img: "/img/servicesImg/lifting-facial.webp",
    professional: "Bide Lucia",
    tags: "Cuidados faciales" 
  },
  { 
    id: 6, 
    name: "Micropigmentación de cejas",
    description: "Es un proceso en el cual se introducen pigmentos en la dermis con una variedad de agujas descartables y motores que permiten regular la velocidad y la penetración de la tinta.",
    price: 42000,
    img: "/img/servicesImg/micropigmentacion-cejas.webp",
    professional: "Romero Lucia",
    tags: "Pestañas y cejas" 
  },
  { 
    id: 7, 
    name: "Lifting de pestañas",
    description: "Levanta las pestañas desde la raíz para una curvatura perfecta logrando una mayor longitud y volumen con una duración prolongada de semanas.",
    price: 25000,
    img: "/img/servicesImg/lifting-pestañas.webp",
    professional: "Romero Lucia",
    tags: "Pestañas y cejas" 
  },
  { 
    id: 8, 
    name: "Masaje relajante",
    description: "Con una sesión de 60 minutos disfrutaras de una relajación muscular que alivia el estrés y la tensión.",
    price: 15000,
    img: "/img/servicesImg/masaje-relajante.webp",
    professional: "Calderone Valentina",
    tags: "Masajes" 
  },
  { 
    id: 9, 
    name: "Drenaje linfático",
    description: "A través de movimientos suaves, lentos y repetitivos, se favorece la circulación elimina la retención de liquidos. Además, produce un efecto relajante y calmante.",
    price: 16000,
    img: "/img/servicesImg/drenaje-linfatico.webp",
    professional: "Calderone Valentina",
    tags: "Masajes" 
  },
  { 
    id: 10, 
    name: "Tratamiento para el acné",
    description: "Este procedimiento incluye una limpieza profunda, exfoliación, y la aplicación de productos específicos que regulan la producción de grasa y eliminan las bacterias causantes del acné. Ideal para quienes buscan una piel más clara y uniforme.",
    price: 15000,
    img: "/img/servicesImg/tratamiento-acne.webp",
    professional: "Calderone Valentina",
    tags: "Cuidados faciales" 
  },
  { 
    id: 11, 
    name: "Depilación definitiva del rostro",
    description: "La sesión incluye frente, entrecejo, nariz, pómulos, patillas, bozo, mentón y submentón. La sesión no suele superar los 15 minutos en consultorio.",
    price: 12000,
    img: "/img/servicesImg/depilacion-rostro.webp",
    professional: "Romero Lucia",
    tags: "Depilación definitiva | Combos" 
  },
  { 
    id: 12, 
    name: "Exfoliación corporal",
    description: "La exfolación corporal es un tratamiento de belleza que ayuda a remover las células muertas de la piel, dejándola suave y revitalizada. Este proceso es ideal para mejorar la textura de la piel y estimular la regeneración celular.",
    price: 27000,
    img: "/img/servicesImg/exfoliacion-corporal.webp",
    professional: "Soulos Leticia",
    tags: "Tratamientos corporales" 
  },
  { 
    id: 13, 
    name: "Tratamiento piel de porcelana",
    description: "Mejora la calidad de tu piel con una limpieza de piel profunda, acompañado de un peeling revitalizante y una sesion nanopore que ayuda a mejorar las manchas de la piel.",
    price: 42000,
    img: "/img/servicesImg/tratamiento-piel-porcelana.webp",
    professional: "Bide Lucia",
    tags: "Tratamientos faciales" 
  },
  { 
    id: 14, 
    name: "Depilación de espalda",
    description: "Precio por una sesión de 20 minutos. De acuerdo a características individuales del paciente, tipo de pelo y color de piel, las sesiones rondan entre 8 y 10 como mínimo.",
    price: 7000,
    img: "/img/servicesImg/depilacion-espalda.webp",
    professional: "Romero Lucia",
    tags: "Depilación definitiva" 
  },
  { 
    id: 15, 
    name: "Depilación de brazos",
    description: "Precio por una sesión de 15 minutos que incluye desde los hombros hasta las muñecas. De acuerdo a características individuales del paciente, tipo de pelo y color de piel, las sesiones rondan entre 8 y 10 como mínimo.",
    price: 16000,
    img: "/img/servicesImg/depilacion-brazos.webp",
    professional: "Bide Lucia",
    tags: "Depilación definitiva" 
  },
  { 
    id: 16, 
    name: "Masajes relajantes y reflexología",
    description: "Masajes acompañados de una sesion de reflexología que ayuda a reducir el estrés, mejorar la circulación y equilibrar funciones del organismo.",
    price: 22000,
    img: "/img/servicesImg/masaje-reflexologia.webp",
    professional: "Bide Lucia",
    tags: "Masajes | Combos" 
  },
  { 
    id: 17, 
    name: "Extensión de pestañas",
    description: "Se realiza el trabajo de colocación de pestañas de seda con productos totalmente avalados para tu salud, que promueven el relleno de las pestañas y su extensión, realzando y profundizando tu mirada.",
    price: 11500,
    img: "/img/servicesImg/pestañas-extension.webp",
    professional: "Bide Lucia",
    tags: "Pestañas y cejas" 
  },
  { 
    id: 18, 
    name: "Tatamiento para estrías",
    description: "Este tratamiento combina láser fraccionado con terapias tópicas para estimular el colágeno y elastina, mejorando textura, tono y elasticidad de la piel.",
    price: 220000,
    img: "/img/servicesImg/tratamiento-estrias.webp",
    professional: "Soulos Leticia",
    tags: "Tratamientos corporales" 
  },
  { 
    id: 19, 
    name: "Tatamiento para la flacidez y celulitis",
    description: "Utilizamos tecnología de radiofrecuencia fraccionada intradérmica, que combina una potente radiofrecuencia con un sistema de microagujas, para mejorar la textura y firmeza de la piel, sin necesidad de cirugía.",
    price: 1700000,
    img: "/img/servicesImg/tratamiento-flacidez-celulitis.webp",
    professional: "Soulos Leticia",
    tags: "Tratamientos corporales" 
  },
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
          {services.map((service) => (
            <div className="card" key={service.id}>
              <img src={service.img} alt={service.name} />
              <p>{service.name}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}