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
import { Category } from "./models/Category.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

app.use("/api/professionals", professionalsRoutes);

app.use("/api/appointments", appointmentsRoutes);

app.use(authRoutes);
app.use("/api/user", userRoutes);

app.use("/api/services", servicesRoutes);

app.use("/api/categories", async (req, res) => {
  try {
    const dbServices = await Category.findAll({}); 
    res.json(dbServices);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener categorias", error: error.message });
  }
});

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
