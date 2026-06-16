import { Service } from "../models/Service.js";
import { Appointment } from "../models/Appointment.js";
import { WORKING_HOURS } from "../utils/schedule.js";

//esto es mas que nada para que haya como un "tiempo de preparacion y limpieza" entre turnos
//const BUFFER_TIME = 15; //asi es mayus pq very important no me vaya a olvidar de usarlo ash

//esta funcion es para pasar horas a minutos y asi
function timeToMinutes(time) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
}

//y esta es la inversa
function minutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

//funcion para obtener horarios disponibles
export const getAvailableAppointments = async (req, res) => {
    try {
        const { date, serviceId } = req.query;
        //obtiene la fecha y el servicio enviados por el frontend

        //esto es para encontrar el servicio por id
        const service = await Service.findByPk(serviceId);
        if (!service) {
            return res.status(404).json({
                message: "Servicio no encontrado"
            });
        }

        const appointments = await Appointment.findAll({
            where: {
                date
            }
        });

        const day = new Date(date).getUTCDay();
        let startHour;
        let endHour;

        //para saber si es un dia de semana
        if (day >= 1 && day <= 5) {
            startHour = WORKING_HOURS.mondayToFriday.start;
            endHour = WORKING_HOURS.mondayToFriday.end;
        }
        //saber si es dia sabado
        if (day === 6) {
            startHour = WORKING_HOURS.saturday.start;
            endHour = WORKING_HOURS.saturday.end;
        }
        //y esto es para el domingo que la estetica no abre okay
        if (day === 0) {
            return res.json([]);
        }

        //arrancamos con la generacion de turnos
        const availableSlots = [];
        const startMinutes = timeToMinutes(startHour);
        const endMinutes = timeToMinutes(endHour);

        for (
            let current = startMinutes;
            current + service.duration <= endMinutes;
            current += 30
        ) {
            availableSlots.push(minutesToTime(current));
        }

        res.json({
            date,
            appointments,
            availableSlots
        });
        //devuelve esos datos para verificar que llegan correctamente

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
    //por si algo fallo que no haga boom nada
};


//funcion para crear turnos
export const createAppointment = async (req, res) => {
    try {
        console.log("BODY:", req.body);

        return res.json({ ok: true });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};