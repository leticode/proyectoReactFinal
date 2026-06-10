//libreria que nos permite decodificar y ver si expiro el token para leer los datos del usuario
import { jwtDecode } from 'jwt-decode';

const tokenValid = ((token)=> {
    if(!token)
        return false;

    try{
        const decodedToken = jwtDecode(token)
        //date.now devuleve milisegundos asiq dividimos por 1000 porq jwt trabaja con segundos
        const currentTime = Date.now() / 1000;

        //si currentTime es menor a osea q no vencio retorna true
        return currentTime < decodedToken.exp;
        
    }catch{
        console.error('Error decodificando el token', error);
        return false;
    }
})

export default tokenValid;