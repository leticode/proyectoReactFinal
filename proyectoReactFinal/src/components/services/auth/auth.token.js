import { jwtDecode } from 'jwt-decode';

const tokenValid = ((token) => {
    if (!token)
        return false;

    try {
        const decodedToken = jwtDecode(token);

        const currentTime = Date.now() / 1000;

        return currentTime < decodedToken.exp;

    } catch {
        console.error('Error decodificando el token', error);
        return false;
    }
})

export default tokenValid;