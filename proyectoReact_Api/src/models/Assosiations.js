import User from "./User.js";
import { Professionals } from "./Professionals.js";
import { Appointment } from "./Appointment.js";
import { Service } from "./Service.js";

// Cliente
Appointment.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

// Profesional
Appointment.belongsTo(Professionals, {
  foreignKey: "professionalId",
  as: "professional",
});

// Servicio
Appointment.belongsTo(Service, {
  foreignKey: "serviceId",
  as: "service",
});