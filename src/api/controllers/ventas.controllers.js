import { selectAllVentas, selectVentaById, insertVenta, insertVentaProducto} from "../models/ventas.models.js";

export const getAllVentas = async (req, res) => {
    try{
        const [rows] = await selectAllVentas();

        res.status(200).json({
            payload:rows
        });

    }catch(err){
        console.log(err)

        res.status(500).json({
            message: "Error interno al obtener ventas"
        })
    }
}

export const getVentaById = async(req, res) => {
    try{
            let {id} = req.params; // En el array le importa unicamente el id
            const [rows] = await selectVentaById(id);
    
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

export const createVenta = async(req, res) => {
    try{
        let {fecha, usuario, productos} = req.body;

        if (!fecha || !usuario || !Array.isArray(productos) || !productos){
            return res.status(400).json({
                message: "Datos no ingresados"
            })
        }
           let total = productos.reduce((acumulado, producto)=>{ 
            return acumulado + producto.precio * preoducto.cantidad
        }, 0);

        let [result] =insertVenta(fecha, usuario, monto);

        const ventas_id = result.insertId;

        for(const producto of productos){
            let ventaProducto = [ventas_id, id, precio, cantidad];
            let [result] = insertVentaProducto(ventaProducto);
        }

        res.status(201).json({
            message: "Producto insertado copado"
        })
    }catch(err){
        console.log(err)

        res.status(500).json({
            message: "Error interno al obtener ventas"
        })
    }
}