/*=============================
    MODELOS DE PRODUCTOS
Definicion : Logica de las consultas SQL 
=============================*/
import connection from "../database/db.js";// conexion a la BDD

// Traer todos los productos
const selectAllProducts = () => {
    const sql = "SELECT * FROM productos"

    return connection.query(sql);
}; 

const selectActiveProducts = () => {
    const sql = "Select * FROM productos WHERE activo = 1";

    return connection.query(sql);
}

// Traer traer productos por id
//params: id sera el producto ingresado en la barra de consulta
const selectProductById = (id) => {
    let sql = "SELECT * FROM productos WHERE productos.id = ?";
    return connection.query(sql, [id]); // ? = [id]  
}


// Crear nuevo producto
//params: Recibe los valores del nuevo producto y los inserta en la tabla "productos"
const insertProduct = (nombre, img, tipo, precio) => {
    let sql = "INSERT INTO productos (nombre, img, tipo, precio) VALUES (?,?,?,?)";

    return connection.query(sql, [nombre, img, tipo, precio]);
}


// Modificar producto
//params: Recibe los nuevos valores del producto y actualiza el registro según su ID
const updateProduct = (nombre, img, tipo, precio, activo, id) =>
{
    let sql = `
    UPDATE productos
    SET nombre = ?, img = ?, tipo = ?, precio = ?, activo = ?
    WHERE id= ?`

    return connection.query(sql, [nombre, img, tipo, precio, activo, id]);
} 


// Eliminar producto
//params: elimina el registro según su ID

const deleteProduct = (id) =>{
    let sql = `UPDATE productos set activo = 0 WHERE id = ?`;
    return connection.query(sql,[id]);
}








export default {
    selectAllProducts,
    selectActiveProducts,
    selectProductById,
    insertProduct,
    updateProduct,
    deleteProduct
}