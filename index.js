import express from "express";
import enviroments from "./src/api/config/enviroments.js";

const app = express();

import connection from "./src/api/database/db.js";

import cors from "cors";

app.use(cors()); 

const PORT = enviroments.port;

// Traer todos los productos
// Middleware logger
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    
    next();
});

app.use(express.json());
/*======================
        EndPoints
=====================*/
app.get("/", (req, res) =>{
    res.send("TP INTEGRADOR Div 132");
});



// Crear nuevo Producto
app.post("/productos", async (req, res) =>{
    try
    {
        let {nombre, img_url, tipo, precio} = req.body;

        console.log(req.body);
        console.log(`Nombre del producto: ${nombre}`); 

        let sql = "INSERT INTO productos (nombre, img, tipo, precio) VALUES (?,?,?,?)";

        let[rows] = await connection.query(sql, [nombre, img_url, tipo, precio]);

        res.status(201).json({
            message: "Producto creado con exito!",
        });

    }
    catch(error){
        console.log("Error al crear producto: ", error);

        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        });
    }
});


// Consultar producto por id 
app.get("/productos/:id", async (req, res)=>{ 
    try{
        let {id} = req.params;
        
        let sql = "SELECT * FROM productos WHERE productos.id = ?";

        const[rows] = await connection.query(sql, [id]);

        console.log(rows);

        res.status(200).json({
            payload: rows
        });
    }catch(error)
    {
        console.log(error);

        res.status(500).json({
            message:"Error interno del servidor",
            error: error.message
        });
    }
});

app.get("/productos", async (req, res) => {
    try{
        const sql = `SELECT * FROM productos`;
        const [rows, fields] = await connection.query(sql);

        res.status(200).json({
            payload:rows
        });

    }catch(err){
        console.log(err)

        res.status(500).json({
            message: "Error interno al obtener productos"
        })
    }
})


app.listen(PORT, () =>{
    console.log(`Servidor corriendo desde el puerto ${PORT}`)
});