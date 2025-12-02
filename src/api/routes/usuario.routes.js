import { Router } from "express";
 // Importa las funciones controladoras que manejan la lógica de las rutas.
import { getUsuarioById, insertUser} from "../controllers/usuario.controllers.js";
import { validateId } from "../middlewares/middlewares.js";

const router = Router(); //inicializa una instancia de la aplicacion




/*========================
        Usuarios 
=========================*/
router.post("/" , insertUser);

router.get("/:id",validateId, getUsuarioById);



export default router;
