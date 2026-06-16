export const validateRegister = ({ email, password, confirmPassword }) => {
    const errors = {};

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

    return errors;
};

export const verifyRegister = (req, res, next) => {
    const errors = validateRegister(req.body);

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
    }

    //srve para pasar a otra funcion
    next();
};

export const validateLogin = ({ email, password }) => {
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

    return errors;
};

export const verifyLogin = (req, res, next) => {
    const errors = validateLogin(req.body);

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};

export const verifyRole = ((role) => {
    const allowRole = ['customer', 'professional', 'admin']
    const errors = [];

    if(!role)
        errors.push("El rol es obligatorio")

    if(!allowRole.includes(role))
        errors.push("Rol inválido")

    return errors;
});

export const ValidateUserUpdate = ({ email, role }) => {
    const errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
        errors.email = "El email no es válido";
    }

    const validRoles = ["customer", "professional", "admin"];

    if (!role || !validRoles.includes(role)) {
        errors.role = "El rol no es válido";
    }

    return errors;
};
