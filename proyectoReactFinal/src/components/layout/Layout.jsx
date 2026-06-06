import { useState } from "react";
import { NavLink } from "react-router-dom";
import '../../index.css';

const Layout = ({ children }) => {

  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive ? "link active" : "link";

  return (
    <>
      {/* HEADER */}
      <header className="header">

        {/* LOGO */}
        <NavLink to="/home" className="logo">
          PURE SKIN
        </NavLink>

        {/* NAV DESKTOP */}
        <nav className="nav navbar">
          
          <NavLink to="/home" className={linkClass}>
            Inicio
          </NavLink>

          <NavLink to="/servicios" className={linkClass}>
            Servicios
          </NavLink>

          <NavLink to="/contacto" className={linkClass}>
            Contacto
          </NavLink>
          <NavLink to="/login" className={linkClass}>
            <img src="/img/navbarImg/user-icon.webp" alt="Img navbar" className = "imgLogin"/>
          </NavLink>

        </nav>

        {/* HAMBURGUESA */}
        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`menu-line ${menuOpen ? "open" : ""}`}></span>
          <span className={`menu-line ${menuOpen ? "open" : ""}`}></span>
          <span className={`menu-line ${menuOpen ? "open" : ""}`}></span>
        </button>

      </header>

      {/* MENU MOBILE */}
      {menuOpen && (
        <div className="mobile-menu">

          <NavLink to="/home" onClick={() => setMenuOpen(false)} className={linkClass}>
            Inicio
          </NavLink>

          <NavLink to="/servicios" onClick={() => setMenuOpen(false)} className={linkClass}>
            Servicios
          </NavLink>

          <NavLink to="/contacto" onClick={() => setMenuOpen(false)} className={linkClass}>
            Contacto
          </NavLink>

          <NavLink to="/login" onClick={() => setMenuOpen(false)} className={linkClass}>
            Login
          </NavLink>

        </div>
      )}

      {/* CONTENIDO */}
      <main>{children}</main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-top">

            <div className="column-footer">
              <h3 className="title-footer-PS">PURE SKIN</h3>
              <p className="text-footer">
                Comprometidos con resaltar tu armonía natural.
              </p>
            </div>

            <div className="column-footer">
              <h3 className="title-footer">EXPLORAR</h3>
              <NavLink to="/home" className="link-footer">Inicio</NavLink>
              <NavLink to="/servicios" className="link-footer">Servicios</NavLink>
            </div>

            <div className="column-footer">
              <h3 className="title-footer">HORARIOS</h3>
              <p className="text-footer">09:00 a 20:00</p>
              <p className="text-footer">Sábados 09:00 a 14:00</p>
            </div>

          </div>

          <div className="footer-bottom">
            <p className="text-footer">© 2026 PURE SKIN Rosario</p>
          </div>
        </div>
      </footer>

    </>
  );
};

export default Layout;