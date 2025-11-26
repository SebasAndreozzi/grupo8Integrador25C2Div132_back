/*======================
        Importaciones
=====================*/
import express from "express";
const app = express();

import enviroments from "./src/api/config/enviroments.js";
const PORT = enviroments.port;

import cors from "cors"; 
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { productRoutes } from "./src/api/routes/index.js";

// importamos la config para trabajar rutas y archivos estaticos
import { join, __dirname } from "./src/api/utils/index.js";
import connection from "./src/api/database/db.js";

/*======================
Middlewares
=====================*/
app.use(cors()); 
app.use(loggerUrl);
app.use(express.json());
app.use(express.static(join(__dirname, "src", "public"))); //GRACIAS A ESTO PODEMOS ACCEDER LOS ARCHIVOS DE LA CARPETA PUBLIC COMO LOCALHOST OSEA MIS IMAGENES
/*======================
        configuracion
====================*/
app.set("view engine", "ejs"); // Configuramos EJS como motor de plantillas
app.set("views", join(__dirname, "src", "views")); // Le indicamos la ruta donde estan las vistas ejs



/*======================
        EndPoints
=====================*/

app.get("/", (req, res) =>{
    res.send("TP INTEGRADOR Div 132");
});
        
app.get("/index", async (req, res) =>{
    try{
        const [rows] = await connection.query("SELECT * FROM productos");
        // console.log(rows);
        res.render("index", {
            title: "Tiendamon",
            about: "Lista de productos",
            products: rows
        }); //le devolvemos la pagina index.ejs
    }catch(error)
    {
        console.log(error);
    }
});
app.get("/consultar", (req, res) => {
    res.render("consultar", {
        title: "Consultar",
        about: "Consultar producto por id:"
    });//le devolvemos la pagina index.ejs
});
app.get("/crear", (req, res) =>{
    res.render("crear", {
        title: "Crear",
        about: "Crear producto"
    }); 
});
app.get("/modificar", (req, res) => {
    res.render("modificar", {
        title: "Modificar",
        about: "Actualizar producto"
    });
})
app.get("/eliminar", (req, res) => {
    res.render("eliminar", {
        title: "Eliminar",
        about: "Eliminar producto"
    });
})

// AHORA LAS RUTAS GESTIONA EL MIDDLEWARE
app.use("/api/productos", productRoutes)

app.listen(PORT, () =>{
    console.log(`Servidor corriendo desde el puerto ${PORT}`)
});
