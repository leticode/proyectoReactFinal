import express from "express";
import { PORT } from "./config.js";
import cors from "cors";

import { sequelize } from "./db.js";
import  User from "./models/User.js";
import bcrypt from "bcrypt";
import authRoutes from "./routes/auth.routes.js";
import appointmentsRoutes from "./routes/appointment.routes.js"
import userRoutes from "./routes/users.routes.js";
import servicesRoutes from "./routes/services.routes.js";
import professionalsRoutes from "./routes/professionals.routes.js";
import "./models/Assosiations.js";

const app = express();

app.use(cors());
app.use(express.json());

// ENDPOINTS ---------------

app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});


//endopoint para profesionales
app.use("/api/professionals", professionalsRoutes);

//endpoint para los appointments
app.use("/api/appointments", appointmentsRoutes);

//endpoints de auth
app.use(authRoutes);
app.use("/api/user", userRoutes);

//endpoint de services
app.use("/api/services", servicesRoutes);

// FIN ENDPOINTS ---------------

async function startServer() {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); 

    app.listen(PORT, () => {
      console.log(`server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("No se pudo iniciar el servidor:", error.message);
  }
}

startServer();
