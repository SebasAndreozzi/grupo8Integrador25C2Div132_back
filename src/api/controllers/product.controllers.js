/*=============================
CONTROLADORES DE PRODUCTO
definicion: se encarga de gestionas las llamadas peticiones(req) y respuestas(res)
=============================*/

import ProductModel from "../models/product.models.js"; //traemos consultas sql


// Controlador GET: consulta todos los productos y devuelve el resultado como JSON
export const getAllProducts = async(req, res) => {
    try
    {
        const [rows, fields]  = await ProductModel.selectAllProducts();
        res.status(200).json({ //ok
                payload:rows, 
                message: rows.length === 0 ? "No se encontraron productos" : "Productos encontrados" 
            });
    }
    catch(error)
    {
        console.error("Error obteniendo productos" , error.message);
        res.status(500).json({ //internal server error:  error en la consulta
            message:"Error interno al obtener productos"
        });
    }
}

export const getActiveProducts = async (req, res) => {
    try {
        // la conexion devuelve dos campos, rows con el resultado de la consulta, fields la informacion de la tabla products
        
        const [rows, fields] = await ProductModel.selectActiveProducts();

        // Tipo de respuesta en JSON
        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontraron productos" : "Productos encontrados"
        });
    } catch (error) {
        console.error("Error obteniendo productos", error.message);

        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }
}

export const getActiveProductById = async (req, res)=>{ 
    try{
        let {id} = req.params; // En el array le importa unicamente el id
        const [rows] = await ProductModel.selectActiveProductById(id);
        
        if(rows.length === 0)
        {
            console.log(`Error!! No existe producto con el id ${id}`);
            return res.status(404).json({ //not found
                message:`No se encontro producto con id ${id}`
            });
        }
        res.status(200).json({ //ok
            payload: rows
        });
    }catch(error)
    {
        console.log(error);

        res.status(500).json({ //internal server error
            message:"Error interno del servidor",
            error: error.message
        });
    }
}
// Controlador GET: obtiene un producto específico por su ID y devuelve la respuesta en JSON
export const getProductById = async (req, res)=>{ 
    try{
        let {id} = req.params; // En el array le importa unicamente el id
        const [rows] = await ProductModel.selectProductById(id);

        console.log(rows); //console
        
        if(rows.length === 0)
        {
            console.log(`Error!! No existe producto con el id ${id}`);
            return res.status(404).json({ //not found
                message:`No se encontro producto con id ${id}`
            });
        }
        res.status(200).json({ //ok
            payload: rows
        });
    }catch(error)
    {
        console.log(error);

        res.status(500).json({ //internal server error
            message:"Error interno del servidor",
            error: error.message
        });
    }
}

// Controlador PUT: actualiza un producto existente con los datos enviados por el cliente
export const createProduct = async (req, res) => {
    try {
        const { nombre, precio, tipo } = req.body;
        let img = req.file ? `${req.protocol}://${req.get("host")}/img/${req.file.filename}`: null;

        await ProductModel.insertProduct(nombre, img, tipo, precio);

        res.json({ message: "Producto creado correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al crear producto" });
    }
};



// CONTROLADOR MODIFY -> Modifica un producto existente utilizando los datos enviados por el cliente y ejecuta la actualización y devuelve resultado como JSON
export const modifyProduct = async (req, res) => {
    try {
        let { id, nombre, tipo, precio, activo } = req.body;

        // SI ENVIA IMAGEN
        // let img = req.file ? "/img/" + req.file.filename : null;
        // protocolo de petición:"http"▼                ▼ Devuelve el host + puerto: "localhost:3000"
        let img = req.file ? `${req.protocol}://${req.get("host")}/img/${req.file.filename}`: null;
        if (!id || !nombre || !tipo || !precio || activo === undefined) {
            return res.status(400).json({ message: "Faltan campos requeridos" });
        }

        // Si NO envió nueva imagen → mantener la anterior
        if (!img) {
            const [rows] = await ProductModel.selectProductById(id);
            img = rows[0].img; 
        }

        const [result] = await ProductModel.updateProduct(nombre, img, tipo, precio, activo, id);

        if (result.affectedRows === 0) {
            return res.status(400).json({ message: "No se actualizó el producto" });
        }

        return res.status(200).json({
            message: `Producto con id ${id} modificado correctamente`
        });

    } catch (error) {
        console.error("Error al modificar producto:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

// CONTROLADOR DELETE-> Eliminar producto existente utilizando el id y devuelve como resultado como JSON
export const removeProduct = async (req, res)=>{
    try
    {
        let{id} = req.params;
        let [result] = await ProductModel.deleteProduct(id);
        
        console.log(result); //console

        // Comprobamos si realmente se elimino un producto y afectó alguna fila (es decir, si el producto existía)
        if(result.affectedRows === 0) {
            return res.status(400).json({ //bad request
                message: `No se elimino el producto con id: ${id}`
            });
        }

        // el tipo de respuesta en json
        return res.status(200).json({//ok
            message: `Producto con id ${id} eliminado exitosamente!`
        });
    }catch(error)
    {
        console.error("Error al eliminar un producto por su id:  ", error);
        res.status(500).json({//internal server error
            message: `Error al eliminar producto con id: ${id}`,
            error: error.message
        });
    }
}