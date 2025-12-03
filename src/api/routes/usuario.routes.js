import { Router } from "express";
 // Importa las funciones controladoras que manejan la lógica de las rutas.
import { getUsuarioById, insertUser, modifyUser} from "../controllers/usuario.controllers.js";
import { validateId } from "../middlewares/middlewares.js";

const router = Router(); //inicializa una instancia de la aplicacion




/*========================
        Usuarios 
=========================*/
// POST -> Crear nuevo usuario
router.post("/" , insertUser);

// GET product by id -> Consultar usuario por id 
router.get("/:id",validateId, getUsuarioById);

// PUT -> Actualizar usuario
router.put("/:id", modifyUser);
//             ↑, falta validacion de formularios propio de usuarios


export default router;
