import { Router } from "express";
import { validacionFormularios, validateId } from "../middlewares/middlewares.js";
import { createProduct, getAllProducts, getActiveProducts, getProductById, modifyProduct, removeProduct } from "../controllers/product.controllers.js"; 
import { multerUploader } from "../middlewares/multer-middleware.js";

const router = Router(); //inicializa una instancia de la aplicacion

// get all products -> Traer todos los productos
router.get("/", getAllProducts);

router.get("/cliente", getActiveProducts);

// get product by id -> Consultar producto por id , lo del async es por mysql importado desde connection from "../database/db.js"s
router.get("/:id",  validateId , getProductById);

// POST -> Crear nuevo Producto
//                  ▼ objeto multer q tendra metodo single(una imagen a la vez)
router.post("/",multerUploader.single("image"), validacionFormularios, createProduct)


// PUT -> Actualizar producto
router.put("/", multerUploader.single("image"),validacionFormularios, modifyProduct);

// DELETE -> Eliminar producto
router.delete("/:id",validateId, removeProduct);

export default router;