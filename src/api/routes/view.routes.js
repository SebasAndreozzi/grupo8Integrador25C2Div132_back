import { Router } from "express";
import { requireLogin } from "../middlewares/middlewares.js";
import {
    renderDashboard,
    renderConsultar,
    renderCrear,
    renderModificar,
    renderEliminar
} from "../controllers/view.controllers.js";

const router = Router();

// GET para el dashboard, requiere login previo para acceder y luego renderiza la vista.
router.get("/dashboard", requireLogin, renderDashboard);

// GET para consultar datos, requiere login previo y luego renderiza la vista.
router.get("/consultar", requireLogin, renderConsultar);

// GET para crear datos, requiere login previo y luego renderiza la vista.
router.get("/crear", requireLogin, renderCrear);

// GET para modificar datos, requiere login previo y luego renderiza la vista.
router.get("/modificar", requireLogin, renderModificar);

// GET para eliminar datos, requiere login previo y luego renderiza la vista.
router.get("/eliminar", requireLogin, renderEliminar);

export default router;
