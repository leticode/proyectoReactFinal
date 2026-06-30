import { createContext, useContext, useState } from "react";

export const AuthenticationContext = createContext();

const tokenValue = localStorage.getItem('pureSkin-token');
const storedUser = localStorage.getItem("pureSkin-user");

const userValue = storedUser ? JSON.parse(storedUser) : null;

const AuthContextProvider = ({children}) => {
    const [token, setToken] = useState(tokenValue);
    const [user, setUser] = useState(userValue);

    const handleUserLogin = (userData) => {
        localStorage.setItem('pureSkin-token', userData.token);
        localStorage.setItem('pureSkin-user', JSON.stringify(userData.user));

        setToken(userData.token);
        setUser(userData.user);
    }

    const handleUserLogout = (userData) => {
        localStorage.removeItem('pureSkin-token');
        localStorage.removeItem('pureSkin-user');
        setToken(null);
        setUser(null);
    }

    return (
        <AuthenticationContext.Provider 
            value = {{token, user, setUser, handleUserLogin, handleUserLogout}}
        >
            {children}
        </AuthenticationContext.Provider>
    )

};

export default AuthContextProvider;