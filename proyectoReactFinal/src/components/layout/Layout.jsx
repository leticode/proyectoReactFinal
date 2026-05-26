import { NavLink } from "react-router-dom";
import '../../index.css';

const Layout = ({ children }) => {
  return (
    /*antes del main colocar todo el header de la pag*/
    <>

      <main>
        {children}
      </main>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-top">
            <div className="column-footer">
              <h3 className="title-footer-PS">PURE SKIN</h3>
              <p className="text-footer">Comprometidos con resaltar tu armonía natural a través de ciencia y tecnología.</p>
              <a href="https://www.instagram.com/utnrosarioseu/" target="_blank">
                <img className="instagram-icon" src="/img/footerImg/instagram-icon.webp" alt="logo-instagram" />
              </a>
            </div>

            <div className="column-footer">
              <h3 className="title-footer">EXPLORAR</h3>
              <NavLink to="/Home" className="link-footer">Inicio</NavLink>
              <NavLink to="/Servicios" className="link-footer">Servicios</NavLink>
            </div>

            <div className="column-footer">
              <h3 className="title-footer">HORARIOS</h3>
              <p className="subtitle-footer">LUNES A VIERNES</p>
              <p className="text-footer">09:00 a 20:00</p>
              <p className="subtitle-footer">SÁBADOS</p>
              <p className="text-footer">09:00 a 14:00</p>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="section-terminos">
              <p className="text-footer">© 2026 PURE SKIN Rosario.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Layout