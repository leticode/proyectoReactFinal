//con este contexto podemos acceder al token del usuario sin tener que pasarlo por props oki
import { createContext, useContext, useState } from "react";

//creamos el contexto
export const AuthenticationContext = createContext();

//pureSkin-token es el nombre del localstorange donde va aestar guardado el token 
//lo escribo orq yo no lo entendia :0
const tokenValue = localStorage.getItem('pureSkin-token');
const storedUser = localStorage.getItem("pureSkin-user");

//operador ternaro que diice si en storevalue hay un valor convertilo en objeto
//asi los datos del user se guardan en objetos si no exste devolve null 
const userValue = storedUser ? JSON.parse(storedUser) : null;

const AuthContextProvider = ({children}) => {
    //inicializamos el estado con el token encontrado en el localstorange
    const [token, setToken] = useState(tokenValue);
    const [user, setUser] = useState(userValue);

    const handleUserLogin = (userData) => {
        //guardamos el token en uno y el objeto del usuario en el otro
        localStorage.setItem('pureSkin-token', userData.token);
        localStorage.setItem('pureSkin-user', JSON.stringify(userData.user));
        //aca guardamos solo el objeto del token
        setToken(userData.token);
        //y aca solo el objeto del usuario asi cuando hacemos la verificacion 
        // nos devuelve el objeto donde va a estar el rol
        setUser(userData.user);
    }

    const handleUserLogout = (userData) => {
        //elimina el token y el usuario si se desloguea
        localStorage.removeItem('pureSkin-token');
        localStorage.removeItem('pureSkin-user');
        setToken(null);
        setUser(null);
    }

    return (
        //aca le damos todos los valores a los que pueden acceder los componentes si usan el contexto
        <AuthenticationContext.Provider 
            value = {{token, user, handleUserLogin, handleUserLogout}}
        >
            {children}
        </AuthenticationContext.Provider>
    )

};

export default AuthContextProvider;