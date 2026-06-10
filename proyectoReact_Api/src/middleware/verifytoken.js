//esta libreria es para crear o verificar token en el back
import jwt from "jsonwebtoken";

const verifyToken = ((req, res, next) => {
    //obtenemos el header
    const authHeader = req.headers.authorization;
    
    //verificamos que ese token encontrado en el header exista
    if(!authHeader){
        return res.status(401).json({
            message: "token requerido"
        })
    }

    //el token siempre viene con un bearer pero solo necesitamos el tok por eso usamos split
    const token = authHeader.split(" ")[1];

    try {
        //aca verificaos el token si la firma es correcta etc
        const decoded = jwt.verify(token, '2tup2pureSkin-2026');

        //se guarda el usuario
        req.user = decoded;

        next(); //pasamos al sig middleware

    } catch (error) {
        return res.status(401).json({
            message: 'token invalido o expirado'
        })
    }
});

export default verifyToken;