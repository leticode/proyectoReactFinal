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

export const validateCreateUser = ({email, password, confirmPassword, role, firstName, lastName}) => {
    const errors = validateRegister({email, password, confirmPassword});

    if (!firstName?.trim()) {
            errors.firstName = "El nombre es obligatorio";
        }
        if (!lastName?.trim()) {
            errors.lastName = "El apellido es obligatorio";
        }

    return errors;
};

export const ValidateUserUpdate = ({ email, role, firstName, lastName }) => {
    const errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
        errors.email = "El email no es válido";
    }

    const validRoles = ["customer", "professional", "admin", 'superadmin'];

    if (!role || !validRoles.includes(role)) {
        errors.role = "El rol no es válido";
    }

    //validacion por si es profesional y se le agrega el nombre y el apellido
    if (role === "professional") {
        if (!firstName?.trim()) {
            errors.firstName = "El nombre es obligatorio";
        }
        if (!lastName?.trim()) {
            errors.lastName = "El apellido es obligatorio";
        }
    }

    return errors;
};
