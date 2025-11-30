/*======================
        Importaciones
=====================*/
import express from "express";
const app = express();

import enviroments from "./src/api/config/enviroments.js";
const PORT = enviroments.port;

import cors from "cors";
import { loggerUrl, requireLogin } from "./src/api/middlewares/middlewares.js";
import { productRoutes } from "./src/api/routes/index.js";
// NUEVA RUTA DE LOGIN

// importamos la config para trabajar rutas y archivos estaticos
import { join, __dirname } from "./src/api/utils/index.js";
import connection from "./src/api/database/db.js";
// importamos session .env
import session from "express-session";
const SESSION_KEY = enviroments.session_key;

import { usuarioRoutes } from "./src/api/routes/index.js";
import { viewRoutes } from "./src/api/routes/index.js";
/*======================
  Middlewares
=====================*/
app.use(cors());
app.use(loggerUrl);
app.use(express.json());
app.use(express.static(join(__dirname, "src", "public"))); //GRACIAS A ESTO PODEMOS ACCEDER LOS ARCHIVOS DE LA CARPETA PUBLIC COMO LOCALHOST OSEA MIS IMAGENES

app.use(express.urlencoded({ extended: true })); // Gracias a este middleware podemos leer la info que nos envia por POST los <form> de HTML (sin fetch y sin JSON)

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
app.use("/", usuarioRoutes);
app.use("/", viewRoutes);


// app.get("/dashboard", requireLogin, async (req, res) => {
//   try {
//     const [rows] = await connection.query("SELECT * FROM productos");
//     // console.log(rows);
//     res.render("index", {
//       title: "Tiendamon",
//       about: "Lista de productos",
//       products: rows,
//     }); //le devolvemos la pagina index.ejs
//   } catch (error) {
//     console.log(error);
//   }
// });
// app.get("/consultar", requireLogin,(req, res) => {
//   res.render("consultar", {
//     title: "Tiendamon - Consultar",
//     about: "Consultar producto por id:",
//   }); //le devolvemos la pagina index.ejs
// });
// app.get("/crear", requireLogin,(req, res) => {
//   res.render("crear", {
//     title: "Tiendamon - Crear",
//     about: "Crear producto",
//   });
// });
// app.get("/modificar", requireLogin,(req, res) => {
//   res.render("modificar", {
//     title: "Tiendamon - Modificar",
//     about: "Modificar producto",
//   });
// });
// app.get("/eliminar", requireLogin,(req, res) => {
//   res.render("eliminar", {
//     title: "Tiendamon - Eliminar",
//     about: "Eliminar producto",
//   });
// });

// Login y logout




// // Vista de login
// app.get("/login", (req, res) => {
  //     res.render("login", {
    //         // ojo con estos campos ya que en login.ejs requerira estos campos y sino pones nada saldrea error
    //         title: "Login",
    //         about: "Iniciar sesion"
    //     });    
    // }); 
    // app.post("/login", async (req, res) => {
      //   try {
        //     const { correo, password } = req.body;
        //     // Validacion 1: Evitamos consulta innecesaria
        //     if (!correo || !password) {
          //       return res.render("login", {
            //         title: "Login",
            //         about: "Login dashboard",
            //         error: "Todos los campos son obligatorios",
            //       });
            //     }
            //     //RECORDATORIO SEPARAR LA LOGICA
            //     const sql = "SELECT * FROM usuarios WHERE correo = ? AND password = ?";
            //     const [rows] = await connection.query(sql, [correo, password]);


            //     // Validacion 2: Verificamos si existe este email y password
            //     if (rows.length === 0) {
              //       return res.render("login", {
                //         title: "Login",
                //         about: "Login dashboard",
                //         error: "Credenciales incorrectas",
                //       });
                //     }
                
                //     // console.log(rows);
                //     const user = rows[0];
                //     console.table(user);
                
                //     // Con el email y el password validos, guardamos la sesion
                //     req.session.user = {
//       id: user.id,
//       correo: user.correo,
//     };

//     res.redirect("/"); // Redirigimos a la pagina principal
//   } catch (error) {
  //     console.error("Error en el login", error);
  //   }
  // });
  
  // app.post("/logout", (req, res) => {
//   // 1. Destruimos la sesion
//   req.session.destroy((err) => {
  //     if (err) {
    //       // Si existiera algun error destruyendo la sesion
    //       console.log("Error al destruir la sesion", err);
    //       return res.status(500).json({
      //         error: "Error al cerrar la sesion",
      //       });
      //     }
      
      //     // 2. Redirigimos a login luego de cerrar la sesion
      //     res.redirect("/login");
      //   });
      // });
      

      
      
      /*======================
      SERVER
      ======================*/
      
      // AHORA LAS RUTAS GESTIONA EL MIDDLEWARE
      app.listen(PORT, () => {
        console.log(`Servidor corriendo desde el puerto ${PORT}`);
      });
      