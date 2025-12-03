/*======================
        Importaciones
=====================*/
import express from "express";
const app = express();

import enviroments from "./src/api/config/enviroments.js";
const PORT = enviroments.port;

import cors from "cors";
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { productRoutes, ventasRoutes, usuarioRoutes, viewRoutes } from "./src/api/routes/index.js";
// NUEVA RUTA DE LOGIN

// importamos la config para trabajar rutas y archivos estaticos
import { join, __dirname } from "./src/api/utils/index.js";
// importamos session .env
import session from "express-session";
import { handleMulterError } from "./src/api/middlewares/multer-middleware.js";

const SESSION_KEY = enviroments.session_key;

/*======================
     Middlewares
=====================*/
app.use(cors());
app.use(loggerUrl);
app.use(express.json());
app.use(express.static(join(__dirname, "src", "public"))); //ACCEDER LOS ARCHIVOS DE LA CARPETA PUBLIC COMO LOCALHOST OSEA MIS IMAGENES

app.use(express.urlencoded({ extended: true })); //Podemos leer la info que nos envia por POST los <form> de HTML (sin fetch y sin JSON)

/*======================
  configuracion (EJS)
====================*/
app.set("view engine", "ejs"); // Configuramos EJS como motor de plantillas
app.set("views", join(__dirname, "src", "views")); // Le indicamos la ruta donde estan las vistas ejs
/*======================
Middlewares de sesion
====================*/
app.use(
  session({
    secret: SESSION_KEY, //firma las cookies para evitar manipulacion x el cliente, clave para la seguridad de la apilacaciones, este valor se usa para FIRMAR las cokkies de la sesion apra que e4l servidor verifique q los datos no fueron alterados por el cliente
    resave: false, //evita guardar la sesion si no hubo cambios
    saveUninitialized: true, //No guarada sesiones vacias
  })
);

/*======================
      EndPoints
=====================*/
app.use("/api/productos", productRoutes);
app.use("/api/ventas", ventasRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/", viewRoutes);


    
/*======================
      SERVER
======================*/

// AHORA LAS RUTAS GESTIONA EL MIDDLEWARE
app.use(handleMulterError);//IMPORTANTE PARA Q NO COLISIONE EL SERVIDOR!

app.listen(PORT, () => {
  console.log(`Servidor corriendo desde el puerto ${PORT}`);
});
