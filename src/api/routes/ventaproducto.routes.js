import { Router } from "express";
import { validateId } from "../middlewares/middlewares.js";
import { getVentaProductoById } from "../controllers/ventas.controllers.js";

const router = Router();

router.get("/:id", validateId, getVentaProductoById);


export default router;