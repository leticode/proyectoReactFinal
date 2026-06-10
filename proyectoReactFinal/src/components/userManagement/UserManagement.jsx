import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../services/auth/authContextProvider";
import ValidateUserManagement from "../../utils/validateUserManagement";
import tokenValid from "../services/auth/auth.token";

const UserManagement = () => {
    const { token, handleUserLogout } = useContext(AuthenticationContext);

    const [users, setUsers] = useState([]);
    const [formUser, setformUser] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        role: "customer"
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [serverMessage, setServerMessage] = useState("");

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    //handle general que va guardardando todos los inputs a medida que el usuario escribe
    const handleChange = (event) => {
        const { name, value } = event.target;
        setformUser({
            ...formUser,
            [name]: value
        });
    }
    
    //permte ejecutar el codgo cuando se renderza el componente
    useEffect (() => {
        //el token es valdo? si no lo es lo desloguea borra desde el localstorage y navega al login
        if (!tokenValid(token)) {
            handleLogoutUser();
            navigate("/login");
        }

        //si es valido hace el la peticion para traer los usaruaios
        fetch("http://localhost:3000/api/users", {
            //mandamos como header el token
            headers: { Authorization: `Bearer ${token}` },
        })

        //el front recibe la respuesta del backend PERO solo recibe la response status
        //osea solo recibe o 201 o 401 no el objeto de usuario 
        .then((res) => {
            //si el error empieza con 400 algo tira error 
            if (!res.ok) throw new Error("Error al cargar usuarios");

            //si todo sale bien convierte la response a objeto
            return res.json();
        })

        //ahora si este then tiene el objeto usuario
        .then((data) => {
            //y actualiza el estado de users con el objeto recibido
            setUsers(data);
        })

        .catch(() => setServerMessage("No se pudieron cargar los usuarios"));
  
    }, []);

    const handleCreateUser = async (event) => {
        //evitamos que recarguen la pagina
        event.preventDefault();

        const validationErrors = ValidateUserManagement(formUser);
        //valdamos que el formularo este bien antes de hacer el fetch

        //object.keys guarda las propiedades y con .lenght cuenta la longtud del array donde si es mayor a cero 
        // es porq tiene errores 
        if (Object.keys(validationErrors).length > 0) {

            //aca se actualiza el estado con los errores validados
            setErrors({
                email: validationErrors.email || "",
                password: validationErrors.password || "",
                confirmPassword: validationErrors.confirmPassword || "",
            })

            return;
        }

        fetch("http://localhost:3000/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(formUser),
        })

        .then((res) => {
				if (!res.ok) {
                    //corta la ejecucon throw
					throw new Error('No se pudieron cargar los usuarios');
				}

				return res.json();
			})
		.then(() => {
            //aca limpiamos los inputs desp de crear el usuario
            setformUser({
                email: "",
                password: "",
                confirmPassword: "",
                role: "customer",
            });

            setServerMessage("Usuario creado correctamente");
        })
		.catch((error) => {
			console.log(error);
			setServerMessage('No se pudo crear al usuario');
		});
    }

    return (
        <section className="management">
                <div className="management-container">

                        <form onSubmit={handleCreateUser}>
                            <h1>Gestion de Usuarios</h1>

                            <div className="input-container">
                                <label>Email</label>
                                <input className="management-input"
                                    name = "email"
                                    ref={emailRef}
                                    type="email"
                                    placeholder="Ingresar Email"
                                    value={formUser.email}
                                    onChange={handleChange}
                                />
                                {errors.email && <p className="errors" >El email ingresado debe ser válido.</p>}
                            </div>    

                            <div className="input-container">
                                <label>Contraseña</label>
                                <input className="management-input"
                                    name= "password"
                                    ref={passwordRef}
                                    type="password"
                                    placeholder="Ingresar Contraseña"
                                    value={formUser.password}
                                    onChange={handleChange}
                                />
                                {errors.password && <p className="errors" >La contraseña debe tener al menos 7 caracteres y un caracter especial.</p>}
                            </div>

                            <div className="input-container">
                            <label>Confirmar Contraseña</label>
                                <input className="management-input"
                                    name= "confirmPassword"
                                    ref={confirmPasswordRef}
                                    type="password"
                                    placeholder="Ingresar Contraseña"
                                    value={formUser.confirmPassword}
                                    onChange={handleChange}
                                />
                                {errors.confirmPassword && <p className="errors" >La contraseña debe ser igual</p>}
                                
                            </div>
                            <div className="input-container">
                                <label>Rol de usuario</label>
                                    <select
                                        name="role"
                                        value={formUser.role}
                                        onChange={handleChange}
                                    >
                                        <option value="customer">Customer</option>
                                        <option value="professional">Professional</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                
                            </div>
                            <button type = "submit"> Agregar </button>
                            
                            {serverMessage && (<p className="server-message">{serverMessage}</p>)}
                        </form>
                </div>
            </section>
    );
}

export default UserManagement;
