import { Router } from "express";
import { validateId, validacionVenta } from "../middlewares/middlewares.js";
import { getAllVentas, getVentaById, createVenta } from "../controllers/ventas.controllers.js";

const router = Router();

router.get("/", getAllVentas);

router.get("/:id", validateId,getVentaById);

router.post("/", validacionVenta, createVenta)
/*
router.put()
router.delete()
*/
export default router;