import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import  { validateLogin } from "../../utils/validateForms.js"
import { AuthenticationContext } from "../services/auth/authContextProvider.jsx";
import { toast } from "react-toastify";

const Login = () =>{
    const { handleUserLogin } = useContext(AuthenticationContext)
    const navigate = useNavigate();

    const [formLogin, setFormLogin] = useState({
        email: "", 
        password: ""
    });
    const [error, setError] = useState({
        email: "", 
        password: ""
    });

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormLogin({
            ...formLogin,
            [name]: value
        });
    }

    const handleSubmit = async (event) => {
		event.preventDefault();

        const validationErrors = validateLogin(formLogin);
        if (Object.keys(validationErrors).length > 0) {
            setError({
                email: validationErrors.email || "",
                password: validationErrors.password || "",
            })

            return;
        }

        try {
			const response = await fetch('http://localhost:3000/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formLogin),
			});

            const data = await response.json().catch(() => ({})); 

            if (!response.ok) {
                toast.error(data.message || "error al iniciar sesion");
                return;
            }

            handleUserLogin(data)

            setFormLogin({
                email: "",
                password: ""
            });

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
                            name="email"
                            ref={emailRef}
                            type="email"
                            placeholder="Ingresar Email"
                            value={formLogin.email}
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
                            value={formLogin.password}
                            onChange={handleChange}
                        />
                        {error.password && <p className="errors" >{error.password}</p>}
                    </div>
                    <button type="submit">Iniciar</button>
                    <p className="register-text" onClick={() => navigate("/register")}>
                        ¿No tenes cuenta? Registrate
                    </p>
                </form>
            </div>
        </section>
    )
}

export default Login;