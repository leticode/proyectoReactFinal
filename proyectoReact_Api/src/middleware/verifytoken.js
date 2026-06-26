import jwt from "jsonwebtoken";

const verifyToken = ((req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if(!authHeader){
        return res.status(401).json({
            message: "token requerido"
        })
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, '2tup2pureSkin-2026');

        req.user = decoded;

        next(); //pasamos al sig middleware

    } catch (error) {
        return res.status(401).json({
            message: 'token invalido o expirado'
        })
    }
});

export default verifyToken;