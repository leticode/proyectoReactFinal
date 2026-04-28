import { useState } from 'react';
import { NavLink } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home/Home";
import Services from "./components/services/Services";
import Login from "./components/login/Login";
import './App.css';


function App() {
  // NAV LOGICA
  const [menuOpen, setMenuOpen] = useState(false); //Inicializo el menu en falso primero (por default cerrado)
  const linkClass = ({ isActive }) => isActive ? "link active" : "link"; //OPERADOR TERNARIO(? SIMBOLIZA TRUE Y : SIMBOLIZA FALSE ASI FUNCIONA EN REACT) si se cumple pone esta clase si no se cumple la otra
  const [LoggedIn, setLoggedIn] = useState(false); //inicializamos el login en falso

  //cambiamos el estado a verdadero para indicar que el usuario esta loggeado
  const handleLoggedIn = () => {
    setLoggedIn(true);
  }

  //en realidad deberiamos usar BrowserRouter pero x el momento lo dejamos asi(HashRouter) pq no tiene complejidad el proyecto (sirve para poder navegar entre paginas sin recargar)
  return (<>
    <HashRouter>
      {/* NAV DESKTOP */}
      <nav className="navbar">
        {/* Etiqueta NavLink => sirve para navgear entre cada pagina y saber cual esta activa(es como si fuera una etiqueta <a></a>) */}
        <NavLink to="/Servicios" className={linkClass}>
          Servicios
        </NavLink>

        <NavLink to="/Login" className={linkClass}>
          Login
        </NavLink>
      </nav>

      {/* BOTÓN HAMBURGUESA */}

      <button
        className="menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}  //Cuando haces click invierte el estado (de True A False o False A True) esto funciona a traves de la funcion se "setMenuOpen", pasandole el valor de menuOpen
      >
        <span className={`menu-line ${menuOpen ? "open" : ""}`}></span> {/*Si menuOpen es = true le agrego la clase "menu-line", sino no se agrega NADA*/}
        <span className={`menu-line ${menuOpen ? "open" : ""}`}></span>
        <span className={`menu-line ${menuOpen ? "open" : ""}`}></span>
      </button>

      {/* MENU MOBILE */}

      {/* mostrá esto SOLO si menuOpen es true (eso significa los && en react) */}
      {menuOpen && (
        <div className="mobile-menu">
          <NavLink to="/" onClick={() => setMenuOpen(false)} className={linkClass}> {/* Cierra el menu y lo pone en FALSO */}
            Servicios
          </NavLink>

          <NavLink
            to="/login"
            onClick={() => setMenuOpen(false)}
            className={linkClass}
          >
            Login
          </NavLink>
        </div>
      )}
      <Routes>
        <Route path='/' element={<Navigate to='home' />} /> {/*redirige*/}
        <Route path="/home" element={<Home />} />
        <Route path="/servicios" element={<Services />} />
        <Route path="/login" element={<Login onLogin={handleLoggedIn}/>}/>
      </Routes>
    </HashRouter>
  </>);
}

export default App
