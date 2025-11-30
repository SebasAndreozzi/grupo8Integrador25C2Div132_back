import { Router } from "express";
 // Importa las funciones controladoras que manejan la lógica de las rutas.
import { loginUser, logoutUser } from "../controllers/usuario.controllers.js";
import { renderLoginView } from "../controllers/view.controllers.js";

const router = Router(); //inicializa una instancia de la aplicacion

//  GET para mostrar la vista del formulario de inicio de sesión.
router.get("/login", renderLoginView);

// POST para procesar los datos del formulario e iniciar sesión
router.post("/login", loginUser);

// POST para cerrar la sesión del usuario actual.
router.post("/logout", logoutUser);

export default router;
