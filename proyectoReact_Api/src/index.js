import express from "express";
//importamos el puerto dede el archivo config.js para comodidad
//y porq lo dice el pdf
import { PORT } from "./config.js";

//creamos la aplicacion express donde app es nuestro servidor backend
const app = express();
// ENDPOINTS ---------------

// ruta root (entras a la url sin nada mas, es la ruta raiz)
app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});


// FIN ENDPOINTS ---------------

//el servidor empieza a escuchar en ese puerto 
app.listen(PORT);
//mensaje para confirmar que el servidor arranco 
console.log(`server listening on port ${PORT}`)