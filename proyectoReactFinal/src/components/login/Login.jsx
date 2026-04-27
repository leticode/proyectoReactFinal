import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Login = ((onLogin)=>{
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event)=> {
        setPassword(event.target.value);
    }

    const handleSubmit = (event)=> {

    }

    return(
        <section className="login">
            <form>
                <h1>Inicia Sesión</h1>
                <h2>Email Address</h2>
                <input
                type="email"
                required
                placeholder="Ingresar email"
                onChange={handleEmailChange}
                />
                <h2>Password</h2>
                <input
                    type="text"
                    required
                    placeholder="Ingresar Contraseña"
                    onChange={handlePasswordChange}
                />
                <button type="submit">Iniciar</button>
            </form>
        </section>
    )
})

export default Login;