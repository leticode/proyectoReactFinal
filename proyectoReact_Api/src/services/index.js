import express from "express";
//importamos el puerto dede el archivo config.js para comodidad
//y porq lo dice el pdf
import { PORT } from "./config.js";

// libreria cors para poder llamar a la api desde un origen distinto (localhost:5173 que es donde esta vite, vs. localhost:3000 que es donde corre este server)
import cors from "cors";

// importamos el array de servicios desde otro archivo para mantener este archivo prolijo y solo con cosas de express
import { services } from "./information.js";

//creamos la aplicacion express donde app es nuestro servidor backend
const app = express();

// habilitar CORS
app.use(cors());

// ENDPOINTS ---------------

// ruta root (entras a la url sin nada mas, es la ruta raiz)
app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});


// endpoint para obtener los servicios
app.get("/api/services", (req, res) => {
  res.json(services);
});

// FIN ENDPOINTS ---------------

//el servidor empieza a escuchar en ese puerto 
app.listen(PORT);
//mensaje para confirmar que el servidor arranco 
console.log(`server listening on port ${PORT}`)