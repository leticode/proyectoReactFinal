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
import AboutUs from './components/aboutUs/AboutUs';
import Contact from './components/contact/Contact';
import UserManagement from './components/userManagement/UserManagement';
import { AuthenticationContext } from './components/services/auth/authContextProvider';
import tokenValid from './components/services/auth/auth.token';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoutes from './components/protectedRoutes/ProtectedRoutes';

import './App.css';
import './index.css';


function App() {
  //traemos el objeto user y el token del contexto para usarlo en los permsos
  const { token } = useContext(AuthenticationContext);

  //en realidad deberiamos usar BrowserRouter pero x el momento lo dejamos asi(HashRouter) pq no tiene complejidad el proyecto (sirve para poder navegar entre paginas sin recargar)
  return (<>
    <HashRouter> 
      <ToastContainer
        position="top-right"
        autoClose={4500}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss={false}
        limit={3}
      />
      <Layout>
        <Routes>
          <Route path='/' element={<Navigate to='home' />} /> {/*redirige*/}
          <Route path="/home" element={<Home />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          {/*para cuando el token es valido el usuario no vaya a login porq no es necesario*/}
          <Route 
            path="/login" 
            element={tokenValid(token) ? <Navigate to="/home" replace /> : <Login />} 
          />
          <Route path="/register" element={<Register/>}/>
          <Route path="/professionals" element={<Professionals/>}/>

          {/*misma validacion que en usermanagement pero incluyendo al professional*/}
          <Route element={<ProtectedRoutes allowedRoles={['superadmin','admin', 'professional']}/>}>
              <Route path="/admin" element={<Admin />}/>
          </Route>
    
          <Route element={<ProtectedRoutes allowedRoles={['superadmin']}/>}>
            <Route path="/management" element={<UserManagement />}/>
          </Route>

          <Route path="/*" element={<NotFound/>}/>
        </Routes>
      </Layout>
    </HashRouter>
  </>);
}

export default App
