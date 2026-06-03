import "./Header.css";

function Header() {
  return (
    <section className="hero">

      <header className="header">

        <div className="logo">
          PURE SKIN
        </div>

        <nav className="nav">
          <a href="#">Servicios</a>
          <a href="#">Nosotros</a>
          <a href="#">Contacto</a>
        </nav>

        <div className="user-icon">
          👤
        </div>

      </header>

      <div className="hero-content">

        <div className="text-content">

          <h1>
            Belleza, equilibrio y bienestar
            en un solo lugar
          </h1>

          <p>
            Trabajamos con estándares profesionales,
            equipamiento moderno y un enfoque personalizado
            para garantizar seguridad, eficacia y resultados.
          </p>

          <div className="buttons">

            <button className="btn-primary">
              Nuestros servicios
            </button>

            <button className="btn-secondary">
              Nuestra ubicación
            </button>

          </div>

        </div>

        <div className="image-content">
          <img
            src="/img/homeImg/woman-home.webp"
            alt="modelo"
          />
        </div>

      </div>

    </section>
  );
}

export default Header;