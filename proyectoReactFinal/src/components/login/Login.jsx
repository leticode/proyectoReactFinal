import { useState, useRef, useContext } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
//prueba untaria
import  verifyEmail  from "../../utils/verifyEmail.js";
import verifyPassword from "../../utils/verifyPassword.js";
import { AuthenticationContext } from "../services/auth/authContextProvider.jsx";
import { toast } from "react-toastify";

const Login = () =>{
    const { handleUserLogin } = useContext(AuthenticationContext)
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({email: false, password: false});

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
			emailRef.current.focus();
			return;
		}

		if (!verifyPassword(password)) {
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

            const data = await response.json(); 

            if (!response.ok) {
                toast.error(data.message || "error al registrarse");
                return;
            }

            handleUserLogin(data) //{token, user}

            setEmail('');
            setPassword('');

            toast.success("Sesion iniciada correctamente")
            navigate("/home");

        } catch (error) {
            console.error(error);
            toast.error("Error al conectar con el servidor");
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
                        {error.password && <p className="errors" >La contraseña debe tener al menos 7 caracteres y un caracter especial.</p>}
                    </div>
                    <button type="submit">Iniciar</button>

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