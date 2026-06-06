import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
//IMPORTARIAMOS EL CONTEXTO TAMB uy
import ValidateUserManagement from "../../utils/validateUserManagement";
import tokenValid from "../services/auth/auth.token";

const UserManagement = () => {
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
    };
    
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

        fetch("http://localhost:5000/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //deberia tener authorization me todavia no tengo lo  del token
            },
            body: JSON.stringify(formUser),
        })
        //respuesta del servdor
        .then((res) => {
                //si la respuesta no fue exitosa osea error400, 401 etc
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
                            <p>{setServerMessage}</p>
                        </form>
                </div>
            </section>
    );
}

export default UserManagement;
