import { Appointment } from "../models/Appointment.js"
import { Service } from "../models/Service.js";
import User from "../models/User.js";

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

        slots.push(
            `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
        );

        current += totalDuration;
    }

    return slots;
};

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

        if (loggedUser.role === "superadmin") {
            return res.status(403).json({
                message: "El superadmin no puede crear turnos"
            });
        }

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

        const today = new Date().toISOString().split("T")[0];

        if (date < today) {
            return res.status(400).json({
                message: "No se pueden reservar turnos en fechas pasadas"
            });
        }

        const appointmentDate = new Date(date + "T00:00:00");

        const dayOfWeek = appointmentDate.getDay();

        if (dayOfWeek === 0) {
            return res.status(400).json({
                message: "La clínica permanece cerrada los domingos"
            });
        }

        const service = await Service.findByPk(serviceId);
        if (!service) {
            return res.status(404).json({
                message: "Servicio no encontrado"
            });
        }

        const serviceDuration = service.duration;
        const newStart = toMinutes(hour);
        const newEnd = getAppointmentEnd(newStart, serviceDuration);

        const appointments = await Appointment.findAll({
            where: { professionalId, date },
            include: {
                model: Service,
                as: "service",
                attributes: ["duration"]
            }
        });

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

        const professional = await User.findByPk(professionalId);

        if (!professional || professional.role !== "professional") {
            return res.status(404).json({
                message: "Profesional no encontrado"
            });
        }

        const allSlots = generateSlots(
            professional.workDayStart,
            professional.workDayEnd,
            Number(serviceDuration)
        );
        const today = new Date().toISOString().split("T")[0];

        let validSlots = allSlots;

        if (date === today) {
            const now = new Date();
            const currentMinutes = now.getHours() * 60 + now.getMinutes();

            validSlots = allSlots.filter(slot => {
                return toMinutes(slot) > currentMinutes;
            });
        }

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

        const availableSlots = validSlots.filter(slot => {
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

export const getAppointments = async (req, res) => {
    try {
        const { id, role } = req.user;
        let where = {};

        if (role === "customer") {
            where = { userId: id };
        }

        if (role === "professional") {
            where = {
                professionalId: id
            };
        }

        const appointments = await Appointment.findAll({
            where, include: [
                {
                    model: User,
                    as: "customer",
                    attributes: [
                        "id",
                        "firstName",
                        "lastName",
                        "email",
                        "role"
                    ]
                },
                {
                    model: User,
                    as: "professional",
                    attributes: [
                        "id",
                        "firstName",
                        "lastName"
                    ]
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

        if (loggedUser.role === "professional" && appointment.professionalId !== loggedUser.id) {
            return res.status(403).json({
                message: "No podés modificar turnos de otro profesional"
            });
        }

        if (appointment.status === "cancelado") {
            return res.status(400).json({
                message: "Los turnos cancelados no pueden modificarse"
            });
        }

        if (appointment.status === "terminado") {
            return res.status(400).json({
                message: "Los turnos terminados no pueden modificarse"
            });
        }

        const now = new Date();

        const appointmentDateTime = new Date(
            `${appointment.date}T${appointment.hour}`
        );

        if (status === "terminado" && appointmentDateTime > now) {
            return res.status(400).json({
                message: "El turno todavía no finalizó"
            });
        }

        if (status === "en curso" && appointmentDateTime > now){
            return res.status(400).json({
                message: "El turno todavía no empezó"
            });
        }
        appointment.status = status;

        await appointment.save();

        res.json({
            message: "Estado del turno actualizado correctamente", appointment
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

        if (!appointment) {
            return res.status(404).json({
                message: "Turno no encontrado"
            });
        }

        if (loggedUser.role === "superadmin" || loggedUser.role === "customer") {
            return res.status(403).json({
                message: "No tenés permitido eliminar turnos"
            });
        }

        if (loggedUser.role === "professional" && appointment.professionalId !== loggedUser.id) {
            return res.status(403).json({
                message: "No podés eliminar turnos de otro profesional"
            })
        }

        await appointment.destroy();

        res.json({
            message: "Turno eliminado correctamente"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
