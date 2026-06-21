import { Router } from "express";
import verifyToken from "../middleware/verifytoken.js";
import { Service } from "../models/Service.js";
import { Professionals } from "../models/Professionals.js";

// endpoint para obtener los servicios
const getAllServices = async (req, res) => {
  try {
    const dbServices = await Service.findAll({
      order: [["id", "ASC"]],
      include: [
        {
          model: Professionals,
          as: "professional",
        },
      ],
    }); // obtener un array con los registros
    res.json(dbServices);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener servicios", error: error.message });
  }
};

// endpoint para obtener un solo servicio por id
const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const serviceId = Number(id);

    if (Number.isNaN(serviceId)) {
      return res.status(400).json({ message: "El id del servicio debe ser un número" });
    }

    const service = await Service.findByPk(serviceId, {
      include: [
        {
          model: Professionals,
          as: "professional",
        },
      ],
    });

    if (!service) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el servicio", error: error.message });
  }
};

// endpoint para crear un servicio
const createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);

    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear servicio",
      error: error.message,
    });
  }
};

// endpoint para modificar un servicio por id
const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const serviceId = Number(id);

    if (Number.isNaN(serviceId)) {
      return res.status(400).json({ message: "El id del servicio debe ser un número" });
    }

    const service = await Service.findByPk(serviceId);

    if (!service) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }

    await service.update(req.body);

    res.json(service);
  } catch (error) {
    res.status(500).json({
      message: "Error al modificar servicio",
      error: error.message,
    });
  }
};

// endpoint para borrar un servicio por id
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const serviceId = Number(id);

    if (Number.isNaN(serviceId)) {
      return res.status(400).json({ message: "El id del servicio debe ser un número" });
    }

    const service = await Service.findByPk(serviceId);

    if (!service) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }

    await service.destroy();

    res.json({ message: "Servicio eliminado correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al borrar servicio",
      error: error.message,
    });
  }
};

const router = Router();

router.get('/', getAllServices);
router.get('/:id', getServiceById);
router.post('/', verifyToken, createService);
router.put('/:id', verifyToken, updateService);
router.delete('/:id', verifyToken, deleteService);



export default router;
