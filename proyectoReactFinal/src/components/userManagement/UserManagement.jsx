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
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "customer"
    });
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
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
        firstName: "", 
        lastName: "", 
        email: "", 
        role: ""
    });

    const handleOpenUpdateModal = (user) => {
        setShowUpdateModal(true);
        setUpdateUser(user);
    }
    const handleCloseUpdateModal = () => {
        setUpdateErrors({
            firstName: "",
            lastName: "",
            email: "",
            role: ""
        });

        setShowUpdateModal(false);
        setUpdateUser(null);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setformUser({
            ...formUser,
            [name]: value
        });
    }

    const handleLoadUsers = () => {
        fetch("http://localhost:3000/api/user", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        .then((res) => {
            if (!res.ok) {
                throw new Error("Error al cargar usuarios");
            }

            return res.json();
        })

        .then((data) => {
            setUsers(data);
        })

        .catch(() => toast.error("No se pudieron cargar los usuarios"));
    };

    useEffect(() => {
        if (!tokenValid(token)) {
            handleUserLogout();
            navigate("/login");
        }

        handleLoadUsers();

    }, []);

    const handleCreateUser = async (event) => {
        event.preventDefault();

        const validationErrors = ValidateUserManagement(formUser);

        if (Object.keys(validationErrors).length > 0) {

            setErrors({
                firstName: validationErrors.firstName || "",
                lastName: validationErrors.lastName || "",
                email: validationErrors.email || "",
                password: validationErrors.password || "",
                confirmPassword: validationErrors.confirmPassword || ""
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
                throw new Error('Error al crear usuario');
            }

            return res.json();
        })
        .then(() => {

            handleLoadUsers()

            setformUser({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
                role: "customer"
            });

            toast.success("Usuario creado correctamente");
        })
        .catch((error) => {
            console.log(error);
            toast.error("No se pudo crear al usuario");
        });
    }

    const handleUpdateUser = async (updateUser) => {
        const validationErrors = ValidateUserUpdate(updateUser);

        if (Object.keys(validationErrors).length > 0) {
            setUpdateErrors({
                firstName: validationErrors.firstName || "",
                lastName: validationErrors.lastName || "",
                email: validationErrors.email || "",
                role: validationErrors.role || ""
            });
            return;
        }

        fetch(`http://localhost:3000/api/user/${updateUser.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify({
                firstName: updateUser.firstName,
                lastName: updateUser.lastName,
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
        .then(() => {
            handleLoadUsers()

            setShowUpdateModal(false);

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
        .then(() => {

            handleLoadUsers();

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
                    {user?.role === "superadmin" && (
                        <form onSubmit={handleCreateUser} noValidate>
                            <div className="input-container">
                                <label>Nombre</label>
                                <input className="management-input"
                                    name="firstName"
                                    ref={firstNameRef}
                                    type="text"
                                    placeholder="Ingresar Nombre"
                                    value={formUser.firstName}
                                    onChange={handleChange}
                                />
                                {errors.firstName && <p className="errors" >{errors.firstName}</p>}
                            </div>

                            <div className="input-container">
                                <label>Apellido</label>
                                <input className="management-input"
                                    name="lastName"
                                    ref={lastNameRef}
                                    type="text"
                                    placeholder="Ingresar apellido"
                                    value={formUser.lastName}
                                    onChange={handleChange}
                                />
                                {errors.lastName && <p className="errors" >{errors.lastName}</p>}
                            </div>

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
                                {errors.email && <p className="errors" >{errors.email}</p>}
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
                                {errors.password && <p className="errors" >{errors.password}</p>}
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
                                {errors.confirmPassword && <p className="errors" >{errors.confirmPassword}</p>}

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
                                {user?.role === "superadmin" && (
                                    <>
                                        <th>Rol</th>
                                        <th>Nombre y Apellido</th>
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
                                    {user?.role === "superadmin" && (
                                        <>
                                            <td>{u.role}</td>
                                            <td>{u.firstName} {u.lastName}</td>
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

                                <div className="professional-fields">
                                    <div className="input-container">
                                        <div className="name-container">
                                            <label>Nombre</label>
                                            <input
                                                className="update-input"
                                                type="text"
                                                placeholder="Ingresar Nombre"
                                                value={updateUser.firstName || ""}
                                                onChange={(e) =>
                                                    setUpdateUser({
                                                        ...updateUser,
                                                        firstName: e.target.value
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                    {updateErrors.firstName && (<p className="errors">{updateErrors.firstName}</p>)}

                                    <div className="input-container">
                                        <div className="name-container">
                                            <label>Apellido</label>
                                            <input
                                                className="update-input"
                                                type="text"
                                                placeholder="Ingresar Apelliido"
                                                value={updateUser.lastName || ""}
                                                onChange={(e) =>
                                                    setUpdateUser({
                                                        ...updateUser,
                                                        lastName: e.target.value
                                                    })
                                                }
                                            />
                                        </div>
                                        {updateErrors.lastName && (<p className="errors">{updateErrors.lastName}</p>)}
                                    </div>
                                </div>

                                <div className="edit-fields">
                                    <input className="update-input"
                                        type="email"
                                        value={updateUser.email}
                                        onChange={(e) =>
                                            setUpdateUser({
                                                ...updateUser,
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
                                        onClick={handleCloseUpdateModal}
                                    > Cancelar
                                    </button>
                                    <button
                                        onClick={() => handleUpdateUser(updateUser)}
                                    > Guardar
                                    </button>
                                </div>
                                {updateErrors.email && (<p className="errors">{updateErrors.email}</p>)}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default UserManagement;
