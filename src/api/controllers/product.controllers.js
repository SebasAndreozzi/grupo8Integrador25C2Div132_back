/*=============================
CONTROLADORES DE PRODUCTO
definicion: se encarga de gestionas las llamadas peticiones(req) y respuestas(res)
=============================*/

import ProductModel from "../models/product.models.js"; //traemos consultas sql jeje


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
export const createProduct = async (req, res) =>{
    try
    {
        let {nombre, img, tipo, precio} = req.body;

        console.log(req.body);
        console.log(`Nombre producto: ${nombre}`); 

        if(!tipo || !img || !nombre || !precio)
        {
            return res.status(400).json({ //bad request
                message: "Faltan datos obligatorios (nombre, img, tipo o precio)",
            });

        }

        let [rows] = await ProductModel.insertProduct(nombre, img, tipo, precio); //let?

        console.log(rows);//console

        res.status(201).json({ //created
            message: "Producto creado con exito!",
        });
    }
    catch(error){
        console.log("Error al crear producto: ", error);
        res.status(500).json({ // internal server error
            message: "Error interno del servidor",
            error: error.message
        });
    }
}


// CONTROLADOR MODIFY -> Modifica un producto existente utilizando los datos enviados por el cliente y ejecuta la actualización y devuelve resultado como JSON
export const modifyProduct = async (req, res) =>{
    try
    {   // Extraemos los datos del cuerpo de la petición
        let {id, nombre, img, tipo, precio, activo} = req.body;
        if(!id || !nombre || !img || !tipo || !precio || !activo)
        {
            return res.status(400).json({ //bad request
                message: "Faltan campos requeridos"
            });
        }
        let [result] = await ProductModel.updateProduct(nombre, img, tipo, precio, activo, id);
        
        console.log(result); // console

        if(result.affectedRows === 0)
        {
            return res.status(400).json({ //bad request
                message:"No se actualizo el producto"
            })
        }
        res.status(200).json({ //ok
            message: `Producto con id: ${id} actualizado correctamente`
        });
    }
    catch(error){
        console.error("Error al actualizar producto: ", error);
        res.status(500).json({ //internal server error
            message: `Error interno del servidor: ${error}`
        });
    }
}


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