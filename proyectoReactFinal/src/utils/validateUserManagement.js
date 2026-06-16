export const ValidateUserManagement = ((formUser) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formUser.email || !emailRegex.test(formUser.email)) {
        errors.email = "El email no es válido";
    }

    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{7,}$/;

    if (!passwordRegex.test(formUser.password)) {
        errors.password = "La contraseña debe tener al menos 7 caracteres y un caracter especial";
    }

    if (formUser.password !== formUser.confirmPassword) {
        errors.confirmPassword = "Las contraseñas no coinciden";
    }

    return errors;
});

export const ValidateUserUpdate = (user) => {
    const errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!user.email || !emailRegex.test(user.email)) {
        errors.email = "El email no es válido";
    }

    return errors;
};
