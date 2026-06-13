import User from "./User.js";
import { Professionals } from "./Professionals.js";
import { Appointment } from "./Appointment.js";
import { Service } from "./Service.js";
import { ProfessionalService } from "./ProfessionalService.js";

//cliente <-> turno
Appointment.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

User.hasMany(Appointment, {
  foreignKey: "userId",
});

//professional <-> turno
Appointment.belongsTo(Professionals, {
  foreignKey: "professionalId",
  as: "professional",
});

Professionals.hasMany(Appointment, {
  foreignKey: "professionalId",
});

//servicio <-> turno
Appointment.belongsTo(Service, {
  foreignKey: "serviceId",
  as: "service",
});

Service.hasMany(Appointment, {
  foreignKey: "serviceId",
});

//usuario <-> professional
Professionals.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

User.hasOne(Professionals, {
  foreignKey: "userId",
});

//professional <-> servicio
Professionals.belongsToMany(Service, {
  through: ProfessionalService,
  foreignKey: "professionalId",
});

Service.belongsToMany(Professionals, {
  through: ProfessionalService,
  foreignKey: "serviceId",
});