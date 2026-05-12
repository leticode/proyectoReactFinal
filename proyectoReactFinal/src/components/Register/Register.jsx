import { useState, useRef } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

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

		if (!email.length) {
			setError({email: true, password: false, confirmPassword: false});
			emailRef.current.focus();
			return;
		}

		if (!password.length || password.length < 7) {
			setError({email: false, password: true, confirmPassword: false});
			passwordRef.current.focus();
			return;
		}

        if (password !== confirmPassword) {

            setError({email: false, password: false, confirmPassword: true});
            confirmPasswordRef.current.focus();
            return;
        }

        //cree objeto para ver si se registraba bien
        const usuario = {email, password};

        console.log("Usuario registrado:", usuario);
        navigate("/login");
    }

    return(
        <section className="login">
            <form onSubmit = {handleSubmit}>
                <h1>Registrate</h1>

                <h2>Email Address</h2>

                <input
                    ref={emailRef}
                    type="email"
                    placeholder="Ingresar email"
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
                    onChange={handlePasswordChange}
                />
                {error.password && <p className="errors" >La contraseña debe tener al menos 7 caracteres.</p>}
                
                <h2>Confirm Password</h2>
                <input
                    ref={confirmPasswordRef}
                    type="password"
                    placeholder="Ingresar Contraseña"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                />
                {error.confirmPassword && <p className="errors" >La contraseña debe ser igual</p>}

                <button type="submit">Registrase</button>

                <p className="register-text" onClick={() => navigate("/login")}>
                    ¿Ya tenes cuenta? Inicia sesion
                </p>

            </form>
        </section>
    )
}

export default Register;