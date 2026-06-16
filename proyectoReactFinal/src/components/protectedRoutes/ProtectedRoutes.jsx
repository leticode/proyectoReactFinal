import { Navigate, Outlet } from "react-router-dom";
import tokenValid from "../services/auth/auth.token";
import { useContext } from "react";
import { AuthenticationContext } from "../services/auth/authContextProvider";

const ProtectedRoutes = ({allowedRoles = []}) => {
    const { token, user } = useContext(AuthenticationContext);

    //si el token no es valido redirige a login
    if(!tokenValid(token)){
        return <Navigate to="/login" replace />;
    }

    //si el rol de usuario no es el indicado que lo redirija
    if(!allowedRoles.includes(user?.role)){
        return <Navigate to="/" replace />;
    }

    return <Outlet/>
}

export default ProtectedRoutes;