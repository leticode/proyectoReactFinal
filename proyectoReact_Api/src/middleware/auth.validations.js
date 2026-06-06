export const verifyRegister = ((req, res, next) => {
    const {email, password, confirmPassword} = req.body;
    const errors = [];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
        errors.push("El email no es válido")
    }

    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{7,}$/;

    if (!passwordRegex.test(password)) {
        errors.push(
            "La contraseña debe tener al menos 7 caracteres y un caracter especial"
        )
    }

    if (password !== confirmPassword) {
        errors.push("Las contraseñas no coinciden")
    }

    if (errors.length > 0) {
        return res.status(400).json({
            errors
        })
    }

    //el next sirve para que cuando llegue la peticion si hay problema responede y corta pero si no siga
    next();
});

export const verifyLogin = ((req, res, next) =>{
    const {email, password} = req.body;
    const errors = [];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
        errors.push("El email no es válido")
    }

    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{7,}$/;

    if (!password || !passwordRegex.test(password)) {
        errors.push("La contraseña debe tener al menos 7 caracteres y un carácter especial")
    }

    if (errors.length > 0) {
        return res.status(400).json({
            errors
        })
    }

    next();

});

export const verifyRole = ((role) => {
    const allowRole = ['customer', 'professional', 'admin']
    const errors = [];

    if(!role)
        errors.push("El rol es obligatorio")

    if(!allowRole.includes(role))
        errors.push("Rol inválido")

    return errors;
});