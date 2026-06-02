import { useState, useRef } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
//prueba untaria
import verifyEmail from "../../utils/verifyEmail.js";

const Login = () =>{
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({email: false, password: false});
    const [serverMessage, setServerMessage] = useState("");

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

		if (!verifyEmail(email)) {
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

        try {
            //hacemos una peticion HTTP al backend
			const response = await fetch('http://localhost:3000/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
					password,
				}),
			});

            //aca en data guardamos lo del backend que viene en formato JSON y lo trasforma en objeto
            const data = await response.json();

            //si devolvio error cortamos la funcion
            if (!response.ok) {
                setServerMessage(data.message || "error al iniciar sesion");
                return;
            }

            setServerMessage("login exitoso");
            navigate("/home");

        } catch (error) {
            console.error(error);
            setServerMessage("Error al conectar con el servidor");
        }
    }

    return(
        <section className="login">
            <div className="login-container">
                <img src="./public/img/loginImg/pureskin.logo.png" alt="login" className="login-img"></img>

                <form noValidate onSubmit = {handleSubmit}>
                    <h1>Inicia Sesión</h1>

                    <div className="input-container">
                        <label>Email</label>
                        <input
                            ref={emailRef}
                            type="email"
                            placeholder="Ingresar Email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        {error.email && <p className="errors" >El email ingresado debe ser válido.</p>}
                    </div>

                    <div className="input-container">
                        <label>Contraseña</label>
                        <input
                            ref={passwordRef}
                            type="password"
                            placeholder="Ingresar Contraseña"
                            value={password}
                            //onchange se ejecuta cada vez que el usuario cambiar el input 
                            onChange={handlePasswordChange}
                        />
                        {error.password && <p className="errors" >La contraseña debe tener al menos 7 caracteres.</p>}
                    </div>
                    <button type="submit">Iniciar</button>

                    {/*para mostrar el error al usuario*/}
                    {serverMessage && (<p className="server-message">{serverMessage}</p>)}

                    {/*si no tenes cuenta te redirige a la pagina del register*/}
                    <p className="register-text" onClick={() => navigate("/register")}>
                        ¿No tenes cuenta? Registrate
                    </p>
                </form>
            </div>
        </section>
    )
}

export default Login;