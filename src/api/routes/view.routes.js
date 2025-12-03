import { Router } from "express";
import { requireLogin } from "../middlewares/middlewares.js";
import {
    renderDashboard,
    renderConsultar,
    renderCrear,
    renderModificar,
    renderEliminar,
    renderVentas
} from "../controllers/view.controllers.js";

import { loginUser, logoutUser } from "../controllers/usuario.controllers.js";
import { renderLoginView } from "../controllers/view.controllers.js";
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

// GET para ventas datos, requiere login previo y luego renderiza la vista.
router.get("/ventas", renderVentas);



/*========================
        Login
=========================*/
//  GET para mostrar la vista del formulario de inicio de sesión.
router.get("/login", renderLoginView);

// POST para procesar los datos del formulario e iniciar sesión
router.post("/login", loginUser);

// POST para cerrar la sesión del usuario actual.
router.post("/logout", logoutUser);

export default router;
