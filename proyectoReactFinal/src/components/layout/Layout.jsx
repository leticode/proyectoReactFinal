import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../services/auth/authContextProvider";
import '../../index.css';

const Layout = ({ children }) => {

  const [menuOpen, setMenuOpen] = useState(false);
  const { handleUserLogout, user } = useContext(AuthenticationContext);
  const [open, setOpen] = useState(false);
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

  const profile = () => {
    setOpen(false);
    navigate("/myprofile");
  };
  const linkClass = ({ isActive }) =>
    isActive ? "link active" : "link";

  return (
    <>
      <header className="header">
        <NavLink to="/home" className="logo">
          PURE SKIN
        </NavLink>

        <nav className="nav navbar">
          {(user?.role === "admin" || user?.role === "superadmin") && (
            <>
              <NavLink to="/admin" className={linkClass}>Admin</NavLink>
            </>
          )}

          {user?.role === "superadmin" && (
            <>
              <NavLink to="/management" className={linkClass}>Gestion Usuarios</NavLink>
            </>
          )}

          <NavLink to="/home" className={linkClass}>
            Inicio
          </NavLink>

          {(user?.role === "admin" || user?.role === "professional" || user?.role === "superadmin" || user?.role === "customer") && (
            <NavLink to="/myappointments" className={linkClass}>
              {user?.role !== "customer" ? "Turnos" : "Mis Turnos"}
            </NavLink>
          )}

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
            <div className="user-info" onClick={() => setOpen(!open)}>
              <img
                src="/img/navbarImg/user-icon.webp"
                alt="Usuario"
                className="imgLogin"
              />

              {user && (
                <span className="user-name">
                  Hola, {user.firstName}
                </span>
              )}
            </div>

            {open && (
              <div className="dropdown">
                {user ? (
                  <>
                    <button onClick={profile}>
                      Mi perfil
                    </button>

                    <button onClick={logout}>
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <button onClick={login}>
                    Iniciar sesión
                  </button>
                )}
              </div>
            )}
          </div>

        </nav>

        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`menu-line ${menuOpen ? "open" : ""}`}></span>
          <span className={`menu-line ${menuOpen ? "open" : ""}`}></span>
          <span className={`menu-line ${menuOpen ? "open" : ""}`}></span>
        </button>

      </header>

      {menuOpen && (
        <div className="mobile-menu">

          {(user?.role === "admin" || user?.role === "superadmin") && (
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

          {(user?.role === "admin" || user?.role === "professional" || user?.role === "superadmin" || user?.role === "customer") && (
            <NavLink to="/myappointments" className={linkClass}>
              {user?.role !== "customer" ? "Turnos" : "Mis Turnos"}
            </NavLink>
          )}

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
            <>
              <NavLink
                to="/myprofile"
                onClick={() => setMenuOpen(false)}
                className={linkClass}
              >
                Mi perfil
              </NavLink>

              <button
                className="mobile-menu-btn"
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              onClick={() => setMenuOpen(false)}
              className={linkClass}
            >
              Iniciar sesión
            </NavLink>
          )}
        </div>
      )}

      <main>{children}</main>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-top">

            <div className="column-footer">
              <h3 className="title-footer-PS">PURE SKIN</h3>
              <p className="text-footer">
                Comprometidos con resaltar tu armonía natural.
              </p>
              <a href="https://www.instagram.com/utnrosarioseu/" target="_blank">
                <img className="instagram-icon" src="/img/footerImg/instagram-icon.webp" alt="logo-instagram" />
              </a>
            </div>

            <div className="column-footer">
              <h3 className="title-footer">EXPLORAR</h3>
              <NavLink to="/home" className="link-footer">Inicio</NavLink>
              {(user?.role === "admin" || user?.role === "professional" || user?.role === "superadmin" || user?.role === "customer") && (
                <NavLink to="/myappointments" className="link-footer">
                  {user?.role !== "customer" ? "Turnos" : "Mis Turnos"}
                </NavLink>
              )}
              <NavLink to="/servicios" className="link-footer">Servicios</NavLink>
              <NavLink to="/aboutUs" className="link-footer">Nosotros</NavLink>
              <NavLink to="/contact" className="link-footer">Contacto</NavLink>
            </div>

            <div className="column-footer">
              <h3 className="title-footer">HORARIOS</h3>
              <p className="subtitle-footer">Lunes a Sábados</p>
              <p className="text-footer">09:00 a 20:00</p>
              <p className="subtitle-footer">Domingos</p>
              <p className="text-footer">CERRADO</p>
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