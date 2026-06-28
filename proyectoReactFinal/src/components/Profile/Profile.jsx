import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../services/auth/authContextProvider";
import { ValidateUpdateProfile, ValidateChangePassword } from "../../utils/validateForms";
import { toast } from "react-toastify";

const Profile = () => {
    const navigate = useNavigate();
    const { user, setUser, token, handleUserLogout } = useContext(AuthenticationContext);

    const [formProfile, setFormProfile] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    })

    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleChange = (e) => {
        setFormProfile({
            ...formProfile,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        setFormProfile({
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        })
    }, [user]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        const validationErrors = ValidateUpdateProfile(formProfile);
        if (Object.keys(validationErrors).length > 0) {
            setErrors({
                firstName: validationErrors.firstName || "",
                lastName: validationErrors.lastName || "",
            });
            return;
        }
        try {
            const res = await fetch(
                `http://localhost:3000/api/user/profile/${user.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        firstName: formProfile.firstName,
                        lastName: formProfile.lastName
                    })
                }
            );

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message);
            }

            setUser({
                ...user,
                firstName: formProfile.firstName,
                lastName: formProfile.lastName
            });
            navigate("/home")
            toast.success("Datos actualizados correctamente");

        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        const validationErrors = ValidateChangePassword(formProfile);
        if (Object.keys(validationErrors).length > 0) {
            setErrors({
                currentPassword: validationErrors.currentPassword || "",
                newPassword: validationErrors.newPassword || "",
                confirmPassword: validationErrors.confirmPassword || ""
            })

            return;
        }
        try {
            const res = await fetch(
                `http://localhost:3000/api/user/profile/${user.id}/password`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        currentPassword: formProfile.currentPassword,
                        newPassword: formProfile.newPassword
                    })
                }
            );

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message);
            }

            toast.success("Contraseña actualizada correctamente");
            setFormProfile({
                ...formProfile,
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });

        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleDeleteAccount = async (id) => {
        try {
            const res = await fetch(
                `http://localhost:3000/api/user/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Error al eliminar usuario");
            }

            setShowModal(false);
            toast.success("Usuario eliminado correctamente");

        } catch (error) {
            toast.error(error.message);
        }
    };
    return (
        <div className="profile-container">
            <h1>Mi Perfil</h1>

            <div className="profile-content">
                <form onSubmit={handleUpdateProfile}>

                    <section className="profile-card">
                    <h2>Información personal</h2>

                        <label>Nombre</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formProfile.firstName}
                            onChange={handleChange}
                        />
                        {errors.firstName && <p className="errors" >{errors.firstName}</p>}
                        <label>Apellido</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formProfile.lastName}
                            onChange={handleChange}
                        />
                        {errors.lastName && <p className="errors" >{errors.lastName}</p>}
                        <button type="submit"
                                className="edit-btn"
                        >
                            Guardar cambios
                        </button>
                    </section>
                </form>
            
                <form onSubmit={handleChangePassword}>
                    <section className="profile-card">
                        <h2>Cambiar contraseña</h2>

                        <label>Contraseña actual</label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={formProfile.currentPassword}
                            onChange={handleChange}
                        />
                        {errors.currentPassword && <p className="errors" >{errors.currentPassword}</p>}
                        <label>Nueva contraseña</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={formProfile.newPassword}
                            onChange={handleChange}
                        />
                        {errors.newPassword && <p className="errors" >{errors.newPassword}</p>}
                        <label>Confirmar contraseña</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formProfile.confirmPassword}
                            onChange={handleChange}
                        />
                        {errors.confirmPassword && <p className="errors" >{errors.confirmPassword}</p>}
                        <button type="submit"
                                className="edit-btn"
                        >
                            Cambiar contraseña
                        </button>
                    </section>
                </form>
            </div>

            <div className="delete-account-card">
                <p>
                    Una vez eliminada tu cuenta, esta acción no se puede deshacer.
                </p>
                <button
                    type="button"
                    className="delete-btn"
                    onClick={() => handleOpenModal(user.id)}
                >
                    Eliminar cuenta
                </button>
            </div>
                {showModal && (
                    <div className="modal-container">
                        <div className="modal">
                            <h3>Confirmar eliminacion</h3>
                            <p>
                                ¿Seguro que deseas eliminar tu cuenta?
                            </p> 
                            <div className="modal-buttons">
                                <button
                                    className="cancel-btn"
                                    onClick={handleCloseModal}
                                > Cancelar
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={handleDeleteAccount}
                                > Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    )
};

export default Profile;