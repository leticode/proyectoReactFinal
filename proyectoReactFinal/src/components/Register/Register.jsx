import { useState, useRef } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ValidateRegister } from "../../utils/validateForms.js";
import { toast } from "react-toastify";

const Register = ()=>{
    const navigate = useNavigate();

    const [formRegister, setFormRegister] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const confirmPasswordRef = useRef(null)

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormRegister({
            ...formRegister,
            [name]: value
        });
    }
   
    const handleSubmit = async (event) => {
		event.preventDefault();

		const validationErrors = ValidateRegister(formRegister);
        if (Object.keys(validationErrors).length > 0) {
            setError({
                firstName: validationErrors.firstName || "",
                lastName: validationErrors.lastName || "",
                email: validationErrors.email || "",
                password: validationErrors.password || "",
                confirmPassword: validationErrors.confirmPassword || ""
            })

            return;
        }

        try {
			const response = await fetch('http://localhost:3000/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
                    ...formRegister,
                    role: "customer"
				}),
			});

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                toast.error(data.message || "error al registrarse");
                return;
            }

            setFormRegister({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: ""
            });

            toast.success("Usuario registrado con exito")
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
                        <label>Nombre</label>
                        <input 
                            name="firstName"
                            ref={firstNameRef}
                            type="text"
                            placeholder="Ingresar Nombre"
                            value={formRegister.firstName}
                            onChange={handleChange}
                        />
                        {error.firstName && <p className="errors" >{error.firstName}</p>}
                    </div>

                    <div className="input-container">
                        <label>Apellido</label>
                        <input 
                            name="lastName"
                            ref={lastNameRef}
                            type="text"
                            placeholder="Ingresar apellido"
                            value={formRegister.lastName}
                            onChange={handleChange}
                        />
                        {error.lastName && <p className="errors" >{error.lastName}</p>}
                    </div>

                    <div className="input-container">
                        <label>Email</label>
                        <input
                            name="email"
                            ref={emailRef}
                            type="email"
                            placeholder="Ingresar Email"
                            value={formRegister.email}
                            onChange={handleChange}
                        />
                        {error.email && <p className="errors" >{error.email}</p>}
                    </div>    

                    <div className="input-container">
                        <label>Contraseña</label>
                        <input
                            name="password"
                            ref={passwordRef}
                            type="password"
                            placeholder="Ingresar Contraseña"
                            value={formRegister.password}
                            onChange={handleChange}
                        />
                        {error.password && <p className="errors" >{error.password}</p>}
                    </div>

                    <div className="input-container">
                    <label>Confirmar Contraseña</label>
                        <input
                            name="confirmPassword"
                            ref={confirmPasswordRef}
                            type="password"
                            placeholder="Ingresar Contraseña"
                            value={formRegister.confirmPassword}
                            onChange={handleChange}
                        />
                        {error.confirmPassword && <p className="errors" >{error.confirmPassword}</p>}
                        
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