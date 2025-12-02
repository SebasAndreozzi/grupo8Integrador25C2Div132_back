import { selectAllVentas, selectVentaById, insertVenta, insertVentaProducto} from "../models/ventas.models.js";
import ProductModel from "../models/product.models.js";

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

export const createVenta = async (req, res) => {
    try {
        const { usuario, productos } = req.body;

        // 1. Validar productos y calcular monto total
        let monto = 0;

        for (let item of productos) {
            const [rows] = await ProductModel.selectActiveProductById(item.id);

            if (rows.length === 0) {
                return res.status(404).json({
                    message: `No se encontró producto con id ${item.id}`
                });
            }

            const prod = rows[0];
            monto += prod.precio * item.cantidad;
        }

        // 2. Insertar venta
        const fecha = new Date();
        const [ventaResult] = await insertVenta(fecha, usuario, monto);
        const ventaId = ventaResult.insertId;

        // 3. Insertar detalle de venta
        for (let item of productos) {
            const [rows] = await ProductModel.selectActiveProductById(item.id);
            const prod = rows[0];

            await insertVentaProducto(ventaId, item.id, prod.precio, item.cantidad);
        }

        return res.status(201).json({
            message: "Venta realizada con éxito", ventaId});

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Error interno al procesar venta"
        });
    }
};