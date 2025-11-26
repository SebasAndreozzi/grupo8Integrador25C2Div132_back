import { Router } from "express";
import { validateId } from "../middlewares/middlewares.js";
import { createProduct, getAllProducts, getProductById, modifyProduct, removeProduct } from "../controllers/product.controllers.js"; 

const router = Router(); //inicializa una instancia de la aplicacion

// get all products -> Traer todos los productos
router.get("/", getAllProducts);

// get product by id -> Consultar producto por id , lo del async es por mysql importado desde connection from "../database/db.js"s
router.get("/:id",  validateId , getProductById);

// POST -> Crear nuevo Producto
router.post("/", createProduct);

// PUT -> Actualizar producto
router.put("/", modifyProduct);

// DELETE -> Eliminar producto
router.delete("/:id",validateId, removeProduct);

export default router;