import User from "./User.js";
import { Professionals } from "./Professionals.js";
import { Appointment } from "./Appointment.js";
import { Service } from "./Service.js";
import { ProfessionalService } from "./ProfessionalService.js";

// Cliente
Appointment.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

User.hasMany(Appointment, {
  foreignKey: "userId",
});

// Profesional
Appointment.belongsTo(Professionals, {
  foreignKey: "professionalId",
  as: "professional",
});

Professionals.hasMany(Appointment, {
  foreignKey: "professionalId",
});

// Profesional a user
Professionals.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

User.hasOne(Professionals, {
  foreignKey: "userId",
});

// Servicio
Appointment.belongsTo(Service, {
  foreignKey: "serviceId",
  as: "service",
});

Service.hasMany(Appointment, {
  foreignKey: "serviceId",
});

//Profesional a servicio
Professionals.belongsTo(Service, {
  foreignKey: "serviceId",
  as: "service",
});

Service.hasMany(Professionals, {
  foreignKey: "serviceId",
});

//Realación un profesional-varios servicios

Professionals.belongsToMany(Service, {
  through: ProfessionalService,
  foreignKey: "professionalId",
});

Service.belongsToMany(Professionals, {
  through: ProfessionalService,
  foreignKey: "serviceId",
});