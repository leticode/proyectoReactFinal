import { useState, useRef } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import verifyEmail from "../../utils/verifyEmail.js";
import verifyPassword from "../../utils/verifyPassword.js";
import { toast } from "react-toastify";

const Register = ()=>{
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState({email: false, password: false, confirmPassword: false});

    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const confirmPasswordRef = useRef(null)

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setError({ ...error, email: false });
	
    }

    const handlePasswordChange = (event)=> {
        setPassword(event.target.value);
        setError({ ...error, password: false });
	
    }

    const handleConfirmPasswordChange = (event) =>{
        setConfirmPassword(event.target.value);
        setError({...error, confirmPassword: false});
    }
    const handleSubmit = async (event) => {
		event.preventDefault();

		if (!verifyEmail(email)) {
			setError({email: true, password: false, confirmPassword: false});
			emailRef.current.focus();
			return;
		}

		if (!verifyPassword(password)) {
			setError({email: false, password: true, confirmPassword: false});
			passwordRef.current.focus();
			return;
		}

        if (password !== confirmPassword) {

            setError({email: false, password: false, confirmPassword: true});
            confirmPasswordRef.current.focus();
            return;
        }

        try {
            //hacemos una peticion HTTP al backend
			const response = await fetch('http://localhost:3000/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
					password,
                    confirmPassword,
                    role: 'customer'
				}),
			});

            //aca en data guardamos lo del backend que viene en formato JSON y lo trasforma en objeto
            const data = await response.json();

            //si devolvio error cortamos la funcion
            if (!response.ok) {
                toast.error(data.message || "error al registrarse");
                return;
            }

            toast.success("Usuario registrado con exito")
            //si se registro bien lo mandamos al login
            navigate("/login");

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
                    <h1>Registrate</h1>

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
                            onChange={handlePasswordChange}
                        />
                        {error.password && <p className="errors" >La contraseña debe tener al menos 7 caracteres y un caracter especial.</p>}
                    </div>

                    <div className="input-container">
                    <label>Confirmar Contraseña</label>
                        <input
                            ref={confirmPasswordRef}
                            type="password"
                            placeholder="Ingresar Contraseña"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                        {error.confirmPassword && <p className="errors" >La contraseña debe ser igual</p>}
                        
                    </div>
                    
                    <button type="submit">Registrarse</button>

                    <p className="register-text" onClick={() => navigate("/login")}>
                        ¿Ya tenes cuenta? Inicia sesion
                    </p>

                </form>
            </div>
        </section>
    )
}

export default Register;