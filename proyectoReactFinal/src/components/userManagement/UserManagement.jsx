import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../services/auth/authContextProvider";
import {ValidateUserManagement, ValidateUserUpdate} from "../../utils/validateUserManagement";
import tokenValid from "../services/auth/auth.token.js";
import { toast } from "react-toastify";

const UserManagement = () => {
    const { token, handleUserLogout, user } = useContext(AuthenticationContext);
    const navigate = useNavigate();

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

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    //para mostrar el modal y guardar el id donde no se va a eliminar
    const [showModal, setShowModal] = useState(false);
    const [userDelete, setUserDelete] = useState(null);

    const handleOpenModal = (id) => {
        setShowModal(true);
        setUserDelete(id);
    }
    const handleCloseModal = () => {
        setShowModal(false);
        setUserDelete(null);
    }

    const [updateUser, setUpdateUser] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateErrors, setUpdateErrors] = useState({
        email: "",
        role: ""
    });

    const handleOpenUpdateModal = (user) => {
        setShowUpdateModal(true);
        setUpdateUser(user);
    }
    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setUpdateUser(null);
        setUpdateErrors({
            email: "",
            role: ""
        });
    }

    //handle general que va guardardando todos los inputs a medida que el usuario escribe
    const handleChange = (event) => {
        const { name, value } = event.target;
        setformUser({
            ...formUser,
            [name]: value
        });
    }

    //permte ejecutar el codgo cuando se renderza el componente
    useEffect(() => {
        //el token es valdo? si no lo es lo desloguea borra desde el localstorage y navega al login
        if (!tokenValid(token)) {
            handleUserLogout();
            navigate("/login");
        }

        //si es valido hace el la peticion para traer los usaruaios
        fetch("http://localhost:3000/api/user", {
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

            .catch(() => toast.error("No se pudieron cargar los usuarios"));

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

        fetch("http://localhost:3000/api/user", {
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
                    throw new Error('Error al crear usuario');
                }

                return res.json();
            })
            .then((data) => {
                //agregamos el usuaro nuevo a la tabla si necesidad de recargar
                setUsers((prevUsers) => [
                    ...prevUsers,
                    data.user
                ]);

                //aca limpiamos los inputs desp de crear el usuario
                setformUser({
                    email: "",
                    password: "",
                    confirmPassword: "",
                    role: "customer",
                });

                toast.success("Usuario creado correctamente");
            })
            .catch((error) => {
                console.log(error);
                toast.error("No se pudo crear al usuario");
            });
    }

    //recibimos el usuario que queremos actualizar
    const handleUpdateUser = async (updateUser) => {

        const validationErrors = ValidateUserUpdate(updateUser);

        if (Object.keys(validationErrors).length > 0) {
            setUpdateErrors({
                email: validationErrors.email || "",
                role: validationErrors.role || "",
            });
            return;
        }

        fetch(`http://localhost:3000/api/user/${updateUser.id}`, {
            method: "PUT",
            headers: {
                //le dice al back que le mando json
                "Content-Type": "application/json",
                //y aca mandamos el token para q verifique si le user esta autenticado
                Authorization: `Bearer ${token}`
            },
            //transformamos el body en json para que lo reciba el back con req.body
            body: JSON.stringify({
                email: updateUser.email,
                role: updateUser.role
            })
        })
        .then((res) => {
            if(!res.ok) {
                throw new Error("Error al editar el usuario")
            }
            return res.json();
        })
        //con los datos devuketos por el back
        .then((data) => {
            //actualizamos la lista sin recargar
            setUsers((prevUsers) =>
                //mapeamos los usuarios
                prevUsers.map((user) =>
                    //si user id es igual al id actualizado
                    user.id === updateUser.id
                    //lo cambia con lo nuevo
                        ? data.user
                        //si no lo deja como esta
                        : user
                )
            );
            setShowUpdateModal(false);
            //limpiamos usuario en edicion
            setUpdateUser(null);
            toast.success("Usuario actualizado correctamente");
        })
        .catch((error) => {
            toast.error(error.message);
        })
    };

    const handleDeleteUser = async (id) => {
        fetch(`http://localhost:3000/api/user/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })

        .then((res) => {
            if (!res.ok) {
                throw new Error("Error al eliminar usuario");
            }
            return res.json();
        })
        .then((data) => {

            //filtro para actualizar el estado de user solo con los elementos que no fueron eliminados
            //osea que no coinciden con el id elimanado
            setUsers((prevUsers) =>
                prevUsers.filter((user) => user.id !== id)
            )
            setShowModal(false);
            toast.success("Usuario eliminado correctamente");
        })
        .catch((error) => {
            toast.error(error.message);
        })
    };

    return (
        <>
            <h1>Gestion de Usuarios</h1>
            <div className="management">
                <div className="management-container">
                    {user?.role === "admin" && (
                        <form onSubmit={handleCreateUser} noValidate>

                            <div className="input-container">
                                <label>Email</label>
                                <input className="management-input"
                                    name="email"
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
                                    name="password"
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
                                    name="confirmPassword"
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
                            <button type="submit"> Agregar </button>
                        </form>
                    )}
                </div>
                
                <div className="management-container">
                    <table>
                        <thead> {/*encabezado*/}
                            <tr> {/*row*/} 
                                <th>Email</th>
                                {user?.role === "admin" && (
                                    <>
                                        <th>Rol</th>
                                        <th></th>
                                        <th></th>
                                    </>
                                )}
                            </tr>
                        </thead>

                        <tbody>
                            {/*mapeamos users por cada usuario con su id ceramos una fila*/}
                            {users.map((u) => (
                                <tr key={u.id}>
                                    <td>{u.email}</td>
                                    {user?.role === "admin" && (
                                        <>
                                            <td>{u.role}</td> {/*mostramos rol */}
                                            <td> {/*botones para editar o borrar*/}
                                                <button className="edit-button"
                                                        onClick={() => handleOpenUpdateModal(u)}
                                                >Editar</button>
                                            </td>
                                            <td>
                                                <button className="delete-button"
                                                        onClick={() => handleOpenModal(u.id)}> 
                                                Eliminar</button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {showModal && (
                        <div className="modal-container">
                            <div className="modal">
                                <h3>Confirmar eliminacion</h3>
                                <p>
                                    ¿Seguro que deseas eliminar este usuario?
                                </p>

                                <div className="modal-buttons">
                                    <button
                                        className="cancel-btn"
                                        onClick={handleCloseModal}
                                    >Cancelar
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDeleteUser(userDelete)}
                                    >Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {showUpdateModal && updateUser && (
                        <div className="modal-container">
                            <div className="modal">
                                <h3>Editar usuario</h3>

                                <div className="edit-fields">
                                    <input className="update-input"
                                        type="email"
                                        //vale el email guardado en el estado
                                        value={updateUser.email}
                                        onChange={(e) =>
                                            //copiamos todas las propiedades del usuario 
                                            setUpdateUser({
                                                ...updateUser,
                                                //y solo cambiamos el email
                                                email: e.target.value
                                            })
                                        }
                                    />

                                    <select
                                        value={updateUser.role}
                                        onChange={(e) =>
                                            setUpdateUser({
                                                ...updateUser,
                                                role: e.target.value
                                            })
                                        }
                                    >
                                        <option value="customer">Customer</option>
                                        <option value="professional">Professional</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                <div className="modal-buttons">
                                    <button
                                        onClick={() => setShowUpdateModal(false)}
                                    > Cancelar
                                    </button>
                                    <button
                                        onClick={() => handleUpdateUser(updateUser)}
                                    > Guardar
                                    </button>
                                </div>
                                {updateErrors.email && (
                                    <p className="errors">{updateErrors.email}</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default UserManagement;
