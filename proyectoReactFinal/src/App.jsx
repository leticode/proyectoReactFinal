import { useState, useContext } from 'react';
import { NavLink } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from './components/layout/Layout';
import Home from "./components/home/Home";
import Services from "./components/services/Services";
import Login from "./components/login/Login";
import Register from "./components/Register/Register"; 
import NotFound from './components/notFound/Notfound';
import Admin from './components/admin/Admin';
import Professionals from './components/professionals/Professionals';
import ServiceDetails from './components/serviceDetails/ServiceDetails';
import Nosotros from './components/nosotros/Nosotros';
import Contacto from './components/contacto/Contacto';
import UserManagement from './components/userManagement/UserManagement';
import { AuthenticationContext } from './components/services/auth/authContextProvider';
import tokenValid from './components/services/auth/auth.token';

import './App.css';
import './index.css';


function App() {
  //traemos el objeto user y el token del contexto para usarlo en los permsos
  const { user, token } = useContext(AuthenticationContext);

  //en realidad deberiamos usar BrowserRouter pero x el momento lo dejamos asi(HashRouter) pq no tiene complejidad el proyecto (sirve para poder navegar entre paginas sin recargar)
  return (<>
    <HashRouter> 
      <Layout>
        <Routes>
          <Route path='/' element={<Navigate to='home' />} /> {/*redirige*/}
          <Route path="/home" element={<Home />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/professionals" element={<Professionals/>}/>

          {/*si el token es valido y el user role es admin puede ir a usermanagemnet si no redirige a home*/}
          {tokenValid(token) && user?.role === "admin" && 
            (<Route path="/users" element={<UserManagement />}/>)
          }
          <Route path="/*" element={<NotFound/>}/>
        </Routes>
      </Layout>
    </HashRouter>
  </>);
}

export default App
