import User from "./User.js";
import { Appointment } from "./Appointment.js";
import { Service } from "./Service.js";
import { Category } from "./Category.js";

User.hasMany(Appointment, {
  foreignKey: "userId",
  as: "appointments"
});

Appointment.belongsTo(User, {
  foreignKey: "userId",
  as: "customer"
});

User.hasMany(Appointment, {
  foreignKey: "professionalId",
  as: "professionalAppointments"
});

Appointment.belongsTo(User, {
  foreignKey: "professionalId",
  as: "professional"
});

Category.hasMany(Service, {
  foreignKey: "categoryId",
});

Service.belongsTo(Category, {
  foreignKey: "categoryId",
});

Service.hasMany(Appointment, {
  foreignKey: "serviceId",
  as: "appointments"
});

Appointment.belongsTo(Service, {
  foreignKey: "serviceId",
  as:"service"
});