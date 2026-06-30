import User from "./User.js";
import { Appointment } from "./Appointment.js";
import { Service } from "./Service.js";
import { Category } from "./Category.js";

//customer <-> appointment
User.hasMany(Appointment, {
  foreignKey: "userId",
  as: "appointments"
});

Appointment.belongsTo(User, {
  foreignKey: "userId",
  as: "customer"
});

//professional <-> appointment
User.hasMany(Appointment, {
  foreignKey: "professionalId",
  as: "professionalAppointments"
});

Appointment.belongsTo(User, {
  foreignKey: "professionalId",
  as: "professional"
});

// categories -> service 
Category.hasMany(Service, {
  foreignKey: "categoryId",
});

Service.belongsTo(Category, {
  foreignKey: "categoryId",
});

//service <-> appointment
Service.hasMany(Appointment, {
  foreignKey: "serviceId",
  as: "appointments"
});

Appointment.belongsTo(Service, {
  foreignKey: "serviceId",
  as:"service"
});