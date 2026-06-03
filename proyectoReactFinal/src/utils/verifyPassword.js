const verifyPassword = (password) => {
    const regex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{7,}$/
    return regex.test(password)
}

export default verifyPassword;