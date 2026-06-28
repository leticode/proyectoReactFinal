export const validateLogin = ((formLogin) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formLogin.email || !emailRegex.test(formLogin.email)) {
        errors.email = "El email no es válido";
    }

    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{7,}$/;

    if (!passwordRegex.test(formLogin.password)) {
        errors.password = "La contraseña debe tener al menos 7 caracteres y un caracter especial";
    }

    return errors;
});

export const ValidateRegister = ((formRegister) =>{
    const errors = {};

    if (!formRegister.firstName?.trim()) {
        errors.firstName = "El nombre es obligatorio";
    }

    if (!formRegister.lastName?.trim()) {
        errors.lastName = "El apellido es obligatorio";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formRegister.email || !emailRegex.test(formRegister.email)) {
        errors.email = "El email no es válido";
    }

    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{7,}$/;

    if (!passwordRegex.test(formRegister.password)) {
        errors.password = "La contraseña debe tener al menos 7 caracteres y un caracter especial";
    }

    if (formRegister.password !== formRegister.confirmPassword) {
        errors.confirmPassword = "Las contraseñas no coinciden";
    }

    return errors;
})
export const ValidateUpdateProfile = ((formProfile) => {
    const errors = {};

    if (!formProfile.firstName?.trim()) {
        errors.firstName = "El nombre es obligatorio";
    }

    if (!formProfile.lastName?.trim()) {
        errors.lastName = "El apellido es obligatorio";
    }

    return errors;
});

export const ValidateChangePassword = ((formProfile) => {
    const errors = {};

    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{7,}$/;

    if (!formProfile.currentPassword) {
        errors.currentPassword = "La contraseña actual es obligatoria";
    }

    if (formProfile.newPassword && formProfile.currentPassword === formProfile.newPassword){
        errors.newPassword = "La contraseña nueva no puede ser igual a la anterior";
    }

    if (!passwordRegex.test(formProfile.newPassword)) {
        errors.newPassword = "La contraseña debe tener al menos 7 caracteres y un caracter especial";
    }

    if (formProfile.newPassword !== formProfile.confirmPassword) {
        errors.confirmPassword = "Las contraseñas no coinciden";
    }

    return errors;
})