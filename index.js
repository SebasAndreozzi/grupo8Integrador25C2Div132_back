import express from "express";
import enviroments from "./src/api/config/enviroments.js";

const app = express();

import connection from "./src/api/database/db.js";

import cors from "cors";

app.use(cors()); 

const PORT = enviroments.port;

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

app.listen(PORT, () => {
    console.log(`corriendo en el puerto ${PORT}`)
})