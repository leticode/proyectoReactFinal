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
import dotenv from "dotenv";
import "./models/User.js";
import "./models/Service.js";
import "./models/Appointment.js";
import "./models/Category.js";
import "./models/Assosiations.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ENDPOINTS ---------------

app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

/*const createSuperAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({
      where: { email: "luciromee@gmail.com" },
    });

    if (existingAdmin) {
      console.log("Super admin ya existe");
      return;
    }

    const hashedPassword = await bcrypt.hash("mondongo@@", 10);

    await User.create({
      firstName: "Super",
      lastName: "Admin",
      email: "luciromee@gmail.com",
      password: hashedPassword,
      role: "superadmin",
    });

    console.log("Super admin creado correctamente");
  } catch (error) {
    console.log("Error creando super admin:", error);
  }
};*/

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

    //await createSuperAdmin();
    app.listen(PORT, () => {
      console.log(`server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("No se pudo iniciar el servidor:", error.message);
  }
}

startServer();
