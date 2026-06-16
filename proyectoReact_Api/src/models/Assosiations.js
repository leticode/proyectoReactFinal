import { User } from "./User.js";
import { Appointment } from "./Appointment.js";
import { Service } from "./Service.js";

//cliente <-> turno
Appointment.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

User.hasMany(Appointment, {
  foreignKey: "userId",
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