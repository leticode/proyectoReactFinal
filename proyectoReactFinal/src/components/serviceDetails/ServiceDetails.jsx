import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NotFound from "../notFound/Notfound";
import ServiceCalendar from "../serviceCalendar/ServiceCalendar";
import ProfessionalsModal from "../professionalsModal/ProfessionalsModal";

export default function ServiceDetails() {
  const { id } = useParams();

  const [service, setService] = useState(null);

  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [showProfessionalsModal, setShowProfessionalsModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/api/services/${id}`)
      .then((res) => res.json())
      .then((data) => setService(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!service) {
    return <NotFound />;
  }

  return (
    <section className="service-details">
      <Link to="/servicios" className="btn-volver">
        Volver
      </Link>

      <div className="service-card">
        <div className="service-image">
          <img src={service.img} alt={service.name} />
        </div>

        <div className="service-info">
          <h2>{service.name}</h2>

          <p className="description">
            {service.description}
          </p>

          <p>
            <strong>Profesional:</strong> {service.professional}
          </p>

          <p>
            <strong>Duración:</strong> {service.duration} min
          </p>

          <p className="price">
            PRECIO: ${service.price.toLocaleString("es-AR")}
          </p>

          <button
            className="btn-reservar"
            onClick={() => setShowProfessionalsModal(true)}
          >
            Reservar turno
          </button>

          {showProfessionalsModal && (
            <ProfessionalsModal
              onClose={() => setShowProfessionalsModal(false)}
              onSelect={(professional) => {
                setSelectedProfessional(professional);
                setShowProfessionalsModal(false);
                setShowCalendar(true);
              }}
            />
          )}{
            showCalendar && selectedProfessional && (
              <ServiceCalendar
                serviceId={service.id}
                professionalId={selectedProfessional.id}
                onClose={() => setShowCalendar(false)}
              />
            )
          }
        </div>
      </div>
    </section>
  );
  console.log("selectedProfessional:", selectedProfessional);
  console.log("showCalendar:", showCalendar);
}