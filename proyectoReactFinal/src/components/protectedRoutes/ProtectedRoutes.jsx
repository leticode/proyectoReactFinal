import { Navigate, Outlet } from "react-router-dom";
import tokenValid from "../services/auth/auth.token";
import { useContext } from "react";
import { AuthenticationContext } from "../services/auth/authContextProvider";

const ProtectedRoutes = ({allowedRoles = []}) => {
    const { token, user } = useContext(AuthenticationContext);

    if(!tokenValid(token)){
        return <Navigate to="/login" replace />;
    }

    if(!allowedRoles.includes(user?.role)){
        return <Navigate to="/" replace />;
    }

    return <Outlet/>
}

export default ProtectedRoutes;