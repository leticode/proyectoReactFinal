import User from "./User.js";
import { Appointment } from "./Appointment.js";
import { Service } from "./Service.js";

// Cliente
Appointment.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

// Profesional
Appointment.belongsTo(User, {
  foreignKey: "professionalId",
  as: "professional",
});

// Servicio
Appointment.belongsTo(Service, {
  foreignKey: "serviceId",
  as: "service",
});