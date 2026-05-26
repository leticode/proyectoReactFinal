import express from "express";
//importamos el puerto dede el archivo config.js para comodidad
//y porq lo dice el pdf
import { PORT } from "./config.js";

// libreria cors para poder llamar a la api desde un origen distinto (localhost:5173 que es donde esta vite, vs. localhost:3000 que es donde corre este server)
import cors from "cors";

// importamos el array de servicios desde otro archivo para mantener este archivo prolijo y solo con cosas de express
import { services } from "./services/information.services.js";
import { sequelize } from "./db.js";
import { Service } from "./models/Service.js";

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
app.get("/api/services", async (req, res) => {
  try {
    const dbServices = await Service.findAll({ order: [["id", "ASC"]] }); // obtener un array con los registros
    res.json(dbServices);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener servicios", error: error.message });
  }
});

// FIN ENDPOINTS ---------------

async function seedServices() {
  // Con esta funcion cargamos todos los servicios a la base de datos, en la tabla Service, usando lo que tenemos hardcodeado en information.services.js
  const count = await Service.count();
  if (count === 0) {
    // Si no tiene ningun registro en la tabla de servicios, quiere decir que nunca la inicializamos
    // Entonces cargamos todos los registros que tenemos en information.services.js
    // Como los nombres de los campos de services coinciden con los de la tabla que creamos, se puede hacer
    // facilmente con bulkCreate
    await Service.bulkCreate(services);
    console.log("Servicios iniciales cargados en la base");
  }
}

async function startServer() {
  try {
    await sequelize.authenticate(); // conectarse a la base de datos, con los datos que estan definidos en db.js
    await sequelize.sync(); // sincronizar las tablas (agregar las que faltan, modificar las que cambiaron, etc.) 
    await seedServices(); // si la tabla de servicios esta vacia, llenarla con los datos que tenemos hardcodeados en information.services.js 

    app.listen(PORT, () => {
      console.log(`server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("No se pudo iniciar el servidor:", error.message);
  }
}

startServer();
