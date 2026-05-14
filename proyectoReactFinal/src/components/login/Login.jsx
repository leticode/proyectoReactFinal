import { useState, useRef } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Login = ({onLogin})=>{
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({email: false, password: false});

    //el useRef sirve para obtener referencia directa a un elemento HTML real
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setError({ ...error, email: false });
	
    }

    const handlePasswordChange = (event)=> {
        setPassword(event.target.value);
        setError({ ...error, password: false });
	
    }

    const handleSubmit = async (event) => {
		event.preventDefault();

		if (!email.length) {
			setError({ email: true, password: false });
            //focus() mueve automáticamente el cursor al input
            //si el usuario no puso el email por ej
			emailRef.current.focus();
			return;
		}

		if (!password.length || password.length < 7) {
			setError({ email: false, password: true });
			passwordRef.current.focus();
			return;
		}
        navigate("/home");
    }

    return(
        <section className="login">
            <form onSubmit = {handleSubmit}>
                <h1>Inicia Sesión</h1>

                <h2>Email Address</h2>

                <input
                    ref={emailRef}
                    type="email"
                    placeholder="Ingresar Email"
                    value={email}
                    onChange={handleEmailChange}
                />
                {error.email && <p className="errors" >Debes ingresar un email valido.</p>}
                
                <h2>Password</h2>
                <input
                    ref={passwordRef}
                    type="password"
                    placeholder="Ingresar Contraseña"
                    value={password}
                    //onchange se ejecuta cada vez que el usuario cambiar el input 
                    onChange={handlePasswordChange}
                />
                {error.password && <p className="errors" >La contraseña debe tener al menos 7 caracteres.</p>}

                <button type="submit">Iniciar</button>

                {/*si no tenes cuenta te redirige a la pagina del register*/}
                <p className="register-text" onClick={() => navigate("/register")}>
                    ¿No tenes cuenta? Registrate
                </p>
            </form>
        </section>
    )
}

export default Login;