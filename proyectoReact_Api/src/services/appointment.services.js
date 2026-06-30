import { Appointment } from "../models/Appointment.js"
//import { Professionals } from "../models/Professionals.js";
import { Service } from "../models/Service.js";
import User from "../models/User.js";

const appointmentGap = 20;
const normalizeHour = (hour) => hour.slice(0, 5);

const toMinutes = (h) => {
    const [hh, mm] = h.split(":").map(Number);
    return hh * 60 + mm;
};

const getAppointmentEnd = (start, duration) => start + duration;

const rangesOverlap = (startA, endA, startB, endB) => (
    startA < endB && endA > startB
);

export const generateSlots = (
    workDayStart,
    workDayEnd,
    serviceDuration
) => {
    const slots = [];

    const totalDuration = serviceDuration;

    let current = workDayStart * 60;
    const end = workDayEnd * 60;

    while (current + totalDuration <= end) {
        const hours = Math.floor(current / 60);
        const minutes = current % 60;

        slots.push(//agregamos el slot generado
            `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
        );

        current += totalDuration;
    }

    return slots;
};
//funcion para crear turnos
export const createAppointment = async (req, res) => {
    try {
        const loggedUser = req.user;
        const {
            date,
            hour,
            userId,
            professionalId,
            serviceId
        } = req.body;

        const customer = await User.findByPk(userId);

        if (!customer || customer.role !== "customer") {
            return res.status(500).json({
                message: "Este id no corresponde a un customer"
            });
        }

        const professional = await User.findByPk(professionalId);

        if (!professional || professional.role !== "professional") {
            return res.status(400).json({
                message: "El profesional no existe"
            });
        }

        if (
            loggedUser.role === "professional" &&
            loggedUser.id !== Number(professionalId)
        ) {
                return res.status(403).json({
                    message: "Solo podés crear turnos para vos mismo"
                });
            }
        }
        //aca permisos del super-admin
        if (loggedUser.role === "superadmin") {
            return res.status(403).json({
                message: "El superadmin no puede crear turnos"
            });
        }
        //verificacion de que el cliente cree un turno para si mismo
        if (loggedUser.role === "customer" && loggedUser.id !== userId) {
            return res.status(403).json({
                message: "Solo podés crear turnos para tu propio usuario"
            });
        }

        if (!customer || customer.role !== "customer") {
            return res.status(400).json({
                message: "Debes tener rol cliente para agendar"
            });
        }

        const today = new Date().toISOString().split("T")[0]; //esto para q no saquen turno dias pasados
        //si la fecha elegida es anterior al dia de hoy
        if (date < today) {
            return res.status(400).json({
                message: "No se pueden reservar turnos en fechas pasadas"
            });
        }
        //esto es por si el today automatico del calendario esta colocado en dia domingo
        const appointmentDate = new Date(date + "T00:00:00");
        const dayOfWeek = appointmentDate.getDay();
        //esq antes lo probe sin y si se podia sacar turnos los domingos xd
        if (dayOfWeek === 0) {
            return res.status(400).json({
                message: "La clínica permanece cerrada los domingos"
            });
        }

        const service = await Service.findByPk(serviceId);
        //en caso de no encontrarse servicio
        if (!service) {
            return res.status(404).json({
                message: "Servicio no encontrado"
            });
        }

        const serviceDuration = service.duration;
        const newStart = toMinutes(hour);
        const newEnd = getAppointmentEnd(newStart, serviceDuration);

        // traer turnos del profesional ese día
        const appointments = await Appointment.findAll({
            where: { professionalId, date },
            include: {
                model: Service,
                as: "service",
                attributes: ["duration"]
            }
        });

        // validar solapamiento real
        const hasOverlap = appointments.some(app => {
            const existingStart = toMinutes(app.hour);

            const existingEnd = getAppointmentEnd(
                existingStart,
                app.service.duration
            );

            return rangesOverlap(newStart, newEnd, existingStart, existingEnd);
        });

        if (hasOverlap) {
            return res.status(400).json({
                message: "Horario ocupado"
            });
        }

        const appointment = await Appointment.create({
            date,
            hour,
            userId,
            professionalId,
            serviceId
        });

        return res.status(201).json(appointment);

    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

export const getAvailableSlots = async (req, res) => {
    try {
        const { professionalId } = req.params;
        const { date, serviceDuration } = req.query;

        const professional = await Professionals.findByPk(professionalId);

        if (!professional) {
            return res.status(404).json({
                message: "Profesional no encontrado"
            });
        }

        //todos los slots
        const allSlots = generateSlots(
            //professional.workDayStart,
            //professional.workDayEnd,
            user.workDayStart,
            user.workDayEnd,
            Number(serviceDuration)
        );

        //traigo los ocupados
        const appointments = await Appointment.findAll({
            where: {
                professionalId,
                date
            },
            include: {
                model: Service,
                as: "service",
                attributes: ["duration"]
            }
        });

        //filtro disponibilidad
        const availableSlots = allSlots.filter(slot => {
            const slotStart = toMinutes(slot);
            const slotEnd = getAppointmentEnd(slotStart, Number(serviceDuration));

            return !appointments.some(appointment => {
                const appointmentStart = toMinutes(normalizeHour(appointment.hour));
                const appointmentEnd = getAppointmentEnd(
                    appointmentStart,
                    appointment.service.duration
                );

                return rangesOverlap(slotStart, slotEnd, appointmentStart, appointmentEnd);
            });
        });

        return res.json(availableSlots);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
//a partir de aca es para todo lo relacionado con el abm
export const getAppointments = async (req, res) => {
    try {
        const { id, role } = req.user;
        let where = {};

        if (role === "customer") {
            where = { userId: id };
        }
        if (role === "professional") {
            const professional = await Professionals.findOne({
                where: { userId: id }
            });

            where = {
                professionalId: professional.id
            };
        }

        const appointments = await Appointment.findAll({
            where, include: [ //para traer datos relacionados
                {
                    model: User,
                    as: "user",
                    attributes: ["id", "email", "role"]
                }, {
                    model: Professionals,
                    as: "professional",
                    attributes: ["id", "firstName", "lastName"]
                },
                {
                    model: Service,
                    as: "service",
                    attributes: ["id", "name", "duration"]
                }
            ],
            order: [
                ["date", "ASC"],
                ["hour", "ASC"]
            ]
        });

        res.json(appointments);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const updateAppointmentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const loggedUser = req.user;
        const appointment = await Appointment.findByPk(id);
        const professional = await Professionals.findOne({
            where: {
                userId: loggedUser.id
            }
        });

        if (!appointment) {
            return res.status(404).json({
                message: "Turno no encontrado"
            });
        }

        if (loggedUser.role === "superadmin") {
            return res.status(403).json({
                message: "El superadmin solo puede ver turnos"
            });
        }

        if (loggedUser.role === "customer") {
            if (appointment.userId !== loggedUser.id || status !== "cancelado") {
                return res.status(403).json({
                    message: "Solo podés cancelar tus propios turnos"
                });
            }
        }

        if (loggedUser.role === "professional" && appointment.professionalId !== professional?.id) {
            return res.status(403).json({
                message: "No podés modificar turnos de otro profesional"
            });
        }
        appointment.status = status;

        await appointment.save();

        res.json({
            message: "Estado actualizado", appointment
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const loggedUser = req.user;
        const appointment = await Appointment.findByPk(id);
        const professional = await Professionals.findOne({
            where: {
                userId: loggedUser.id
            }
        });

        if (!appointment) {
            return res.status(404).json({
                message: "Turno no encontrado"
            });
        }

        if (loggedUser.role === "superadmin" || loggedUser.role === "customer") {
            return res.status(403).json({
                message: "No tenes permiso para eliminar turnos"
            });
        }

        if (loggedUser.role === "professional" && appointment.professionalId !== professional?.id) {
            return res.status(403).json({
                message: "No podés eliminar turnos de otro profesional"
            })
        }

        await appointment.destroy();

        res.json({
            message: "Turno eliminado"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
