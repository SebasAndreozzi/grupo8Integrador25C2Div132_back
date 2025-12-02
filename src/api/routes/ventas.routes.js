import { Router } from "express";
import { getAllVentas, getVentaById, createVenta } from "../controllers/ventas.controllers.js";

const router = Router();

router.get("/", getAllVentas);

router.get("/:id", getVentaById);

router.post("/", createVenta)
/*
router.put()
router.delete()
*/
export default router;