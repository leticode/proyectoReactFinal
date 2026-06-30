export const verifyRegister = (req, res, next) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    const errors = {};

    if (!firstName.trim()) {
        errors.firstName = "El nombre es obligatorio";
    }

    if (!lastName.trim()) {
        errors.lastName = "El apellido es obligatorio";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
        errors.email = "El email no es válido";
    }

    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{7,}$/;

    if (!password || !passwordRegex.test(password)) {
        errors.password = "Contraseña inválida";
    }

    if (password !== confirmPassword) {
        errors.confirmPassword = "No coinciden";
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};

export const verifyLogin = (req, res, next) => {
    const {email, password } = req.body;
    const errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
        errors.email = "El email no es válido";
    }

    const passwordRegex = /^(?=.*[!@#$%^&*(),.?\":{}|<>]).{7,}$/;

    if (!password || !passwordRegex.test(password)) {
        errors.password =
            "La contraseña debe tener al menos 7 caracteres y un carácter especial";
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};

export const verifyRole = ((role) => {
    const allowRole = ['customer', 'professional', 'admin', 'superadmin']
    const errors = [];

    if(!role)
        errors.push("El rol es obligatorio")

    if(!allowRole.includes(role))
        errors.push("Rol inválido")

    return errors;
});

export const validateCreateUser = ({firstName, lastName, email, password, confirmPassword, role}) => {
    const errors = {};

    if (!firstName?.trim()) {
        errors.firstName = "El nombre es obligatorio";
    }
    if (!lastName?.trim()) {
        errors.lastName = "El apellido es obligatorio";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
        errors.email = "El email no es válido";
    }

    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{7,}$/;

    if (!password || !passwordRegex.test(password)) {
        errors.password = "Contraseña inválida";
    }

    if (password !== confirmPassword) {
        errors.confirmPassword = "No coinciden";
    }

    const validRoles = ["customer", "professional", "admin", 'superadmin'];

    if (!role || !validRoles.includes(role)) {
        errors.role = "El rol no es válido";
    }

    return errors;
};

export const ValidateUserUpdate = ({ email, role, firstName, lastName }) => {
    const errors = {};

    if (!firstName?.trim()) {
        errors.firstName = "El nombre es obligatorio";
    }
    if (!lastName?.trim()) {
        errors.lastName = "El apellido es obligatorio";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
        errors.email = "El email no es válido";
    }

    const validRoles = ["customer", "professional", "admin", 'superadmin'];

    if (!role || !validRoles.includes(role)) {
        errors.role = "El rol no es válido";
    }

    return errors;
};

export const ValidateUpdateProfile = ({firstName, lastName}) => {
    const errors = {}

    if (!firstName?.trim()) {
        errors.firstName = "El nombre es obligatorio";
    }
    if (!lastName?.trim()) {
        errors.lastName = "El apellido es obligatorio";
    }

    return errors;
}

export const ValidateChangePassword = ({currentPassword, newPassword, confirmPassword}) => {
    const errors = {};

    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{7,}$/;

    if (!currentPassword) {
        errors.currentPassword = "La contraseña actual es obligatoria";
    }

    if (newPassword) {
        if (currentPassword === newPassword) {
            errors.newPassword = "La contraseña nueva no puede ser igual a la anterior";
        }

        if (!passwordRegex.test(newPassword)) {
            errors.newPassword = "La contraseña debe tener al menos 7 caracteres y un caracter especial";
        }
    }

    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
        errors.confirmPassword = "Las contraseñas no coinciden";
    }
    return errors;
}