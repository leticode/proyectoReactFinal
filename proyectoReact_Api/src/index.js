import express from "express";
//importamos el puerto dede el archivo config.js para comodidad
//y porq lo dice el pdf
import { PORT } from "./config.js";

// libreria cors para poder llamar a la api desde un origen distinto (localhost:5173 que es donde esta vite, vs. localhost:3000 que es donde corre este server)
import cors from "cors";

// importamos el array de servicios desde otro archivo para mantener este archivo prolijo y solo con cosas de express
// import { services } from "./services/information.services.js";
import { sequelize } from "./db.js";
import { Service } from "./models/Service.js";
import  User from "./models/User.js";
import bcrypt from "bcrypt";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/users.routes.js"

//creamos la aplicacion express donde app es nuestro servidor backend
const app = express();

// habilitar CORS
app.use(cors());

// leer JSON del body, asi le paso en formato json el email y la contrasena al register en auth.services.js
app.use(express.json());
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

// endpoint para obtener un solo servicio por id
app.get("/api/services/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const serviceId = Number(id);

    if (Number.isNaN(serviceId)) {
      return res.status(400).json({ message: "El id del servicio debe ser un número" });
    }

    const service = await Service.findByPk(serviceId);

    if (!service) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el servicio", error: error.message });
  }
});

// endpoint para crear un servicio
app.post("/api/services", async (req, res) => {
  try {
    const service = await Service.create(req.body);

    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear servicio",
      error: error.message,
    });
  }
});

// endpoint para modificar un servicio por id
app.put("/api/services/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const serviceId = Number(id);

    if (Number.isNaN(serviceId)) {
      return res.status(400).json({ message: "El id del servicio debe ser un número" });
    }

    const service = await Service.findByPk(serviceId);

    if (!service) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }

    await service.update(req.body);

    res.json(service);
  } catch (error) {
    res.status(500).json({
      message: "Error al modificar servicio",
      error: error.message,
    });
  }
});

// endpoint para borrar un servicio por id
app.delete("/api/services/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const serviceId = Number(id);

    if (Number.isNaN(serviceId)) {
      return res.status(400).json({ message: "El id del servicio debe ser un número" });
    }

    const service = await Service.findByPk(serviceId);

    if (!service) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }

    await service.destroy();

    res.json({ message: "Servicio eliminado correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al borrar servicio",
      error: error.message,
    });
  }
});

// FIN ENDPOINTS ---------------

// async function seedServices() {
//   // Con esta funcion cargamos todos los servicios a la base de datos, en la tabla Service, usando lo que tenemos hardcodeado en information.services.js
//   const count = await Service.count();
//   if (count === 0) {
//     // Si no tiene ningun registro en la tabla de servicios, quiere decir que nunca la inicializamos
//     // Entonces cargamos todos los registros que tenemos en information.services.js
//     // Como los nombres de los campos de services coinciden con los de la tabla que creamos, se puede hacer
//     // facilmente con bulkCreate
//     await Service.bulkCreate(services);
//     console.log("Servicios iniciales cargados en la base");
//   }
// }

/* FUNCION PARA CREAR EL ADMIN DONDE ME HASHEA LA CONTRASENA DEL ADMIN Y SI YA EXISTE ESE ADMIN
//NO ME LO CREA LA COMENTO PORQ ESTA FUNCION SOLO SE TIENE Q EJECUTAR UNA VEZ
//UNA VEZ QUE EL ADMIN SE CREO YA NO ME SIRVE

  async function createSuperAdmin() {
    const user = await User.findOne({
        where: {
            email: "luciromee@gmail.com"
        }
    });

    if (!user) {
        const hashedPassword = await bcrypt.hash("mondongo@@", 10);

        await User.create({
            email: "luciromee@gmail.com",
            password: hashedPassword,
            role: "admin"
        })

        console.log("Admin creado");
    }
}*/

async function startServer() {
  try {
    await sequelize.authenticate(); // conectarse a la base de datos, con los datos que estan definidos en db.js
    await sequelize.sync(); // sincronizar las tablas (agregar las que faltan, modificar las que cambiaron, etc.) 
    // await seedServices(); // si la tabla de servicios esta vacia, llenarla con los datos que tenemos hardcodeados en information.services.js 

    //ACA SE EJECUTABA LA FUNCION PARA CREAR ADMIN
    //await createSuperAdmin()

    //puse esto para usar la ruta de auth
    app.use(authRoutes);
    app.use("/api/user", userRoutes);

    app.listen(PORT, () => {
      console.log(`server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("No se pudo iniciar el servidor:", error.message);
  }
}

startServer();
