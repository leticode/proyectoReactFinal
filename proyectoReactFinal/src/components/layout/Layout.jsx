import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../services/auth/authContextProvider";
import '../../index.css';

const Layout = ({ children }) => {

  const [menuOpen, setMenuOpen] = useState(false);
  const { handleUserLogout, user } = useContext(AuthenticationContext);
  const [open, setOpen]= useState(false);

  const navigate = useNavigate();

  const logout = () => {
    handleUserLogout()
    setOpen(false)
    navigate("/home")
  };
  const login = () => {
    setOpen(false)
    navigate("/login")
  };

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
          {(user?.role === "admin" || user?.role === "professional" || user?.role === "superadmin") && (
            <>
              <NavLink to="/admin" className={linkClass}>Admin</NavLink>
            </>
          )}

          {user?.role === "superadmin" && (
            <>
              <NavLink to="/management" className={linkClass}>Gestion Usuarios</NavLink>
            </>
          )}
          
          <NavLink to="/myappointments" className={linkClass}>Mis Turnos</NavLink>

          <NavLink to="/home" className={linkClass}>
            Inicio
          </NavLink>

          <NavLink to="/servicios" className={linkClass}>
            Servicios
          </NavLink>

          <NavLink to="/aboutUs" className={linkClass}>
            Nosotros
          </NavLink>

          <NavLink to="/contact" className={linkClass}>
            Contacto
          </NavLink>

          <div className="user-menu">
              <img src="/img/navbarImg/user-icon.webp" alt="Img navbar" className = "imgLogin" onClick={() => setOpen(!open)}/>
                
                {open && (
                <div className="dropdown">
                  {user ? (
                    <button onClick={logout}>
                          Cerrar sesion
                      </button>
                  ) : (
                    <button onClick={login}>
                          Iniciar Sesion
                      </button>
                  )}
                </div>
                )}
          </div>

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

          {(user?.role === "admin" || user?.role === "professional" || user?.role === "superadmin") && (
            <>
              <NavLink to="/admin" className={linkClass}>Admin</NavLink>
            </>
          )}

          {user?.role === "superadmin" && (
            <>
              <NavLink to="/management" className={linkClass}>Gestion Usuarios</NavLink>
            </>
          )}

          <NavLink to="/home" onClick={() => setMenuOpen(false)} className={linkClass}>
            Inicio
          </NavLink>

          <NavLink to="/servicios" onClick={() => setMenuOpen(false)} className={linkClass}>
            Servicios
          </NavLink>

          <NavLink to="/aboutUs" onClick={() => setMenuOpen(false)} className={linkClass}>
            Nosotros
          </NavLink>

          <NavLink to="/contact" onClick={() => setMenuOpen(false)} className={linkClass}>
            Contacto
          </NavLink>

          {user ? (
            <button
              className="mobile-menu-btn"
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
            >
              Cerrar sesion
            </button>
          ) : (
            <NavLink
              to="/login"
              onClick={() => setMenuOpen(false)}
              className={linkClass}
            >
              Iniciar sesion
            </NavLink>
          )}

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
              <NavLink to="/myappointments" className="link-footer">Mis turnos</NavLink>
              <NavLink to="/servicios" className="link-footer">Servicios</NavLink>
              <NavLink to="/aboutUs" className="link-footer">Nosotros</NavLink>
              <NavLink to="/contact" className="link-footer">Contacto</NavLink>
            </div>

            <div className="column-footer">
              <h3 className="title-footer">HORARIOS</h3>
              <p className="subtitle-footer">Lunes a Viernes</p>
              <p className="text-footer">09:00 a 20:00</p>
              <p className="subtitle-footer">Sábados</p>
              <p className="text-footer">09:00 a 14:00</p>
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