/*======================
        Middlewares
funciones que se ejecutan entre la peticion (request -> req) y la respuesta (response -> res)
// middleware de aplicacion:funcion de aplicacion q se ejecuta en todas las rutas
// middleware de ruta: funcion que se ejecuta en algunas rutas
=====================*/


// Middleware logger q muestra x consola todas las solicitudes
const loggerUrl = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    
    next();
}

const validateId = (req, res, next) => {
    const {id} = req.params;

    // validar q el ID sea un numero (de lo contrario la consulta podria generar un error en la base de datos)
    if(!id || isNaN(id))
    {
        return res.status(400).json({
            message: "El id debe ser un numero"
        });
    }


    // convertimos el params id (originalmente un string xq viene de una URL) a un numero entero (integer en base 10 decimal)
    req.id = parseInt(id, 10); // convertimos el id en un entero
    console.log("Id validado!: ", req.id),
    
    next(); // continuar al sig middleware
} 



// middlewares de ruta para validad el id en la ruta /api/products/:id
export {
    loggerUrl,
    validateId
}
