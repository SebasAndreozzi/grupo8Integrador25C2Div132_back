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

//Valida el id ingresado si es distinto al campo id, si no tiene valor o sea valor negativo
const validateId = (req, res, next) => {
    const {id} = req.params;

    // validar q el ID sea un numero (de lo contrario la consulta podria generar un error en la base de datos)
    if(!id || isNaN(id)|| id < 1)
    {
        return res.status(400).json({//bad request. La peticion http esta mal formado
            message: "El id debe ser un numero entero positivo"
        });
    }


    // convertimos el params id (originalmente un string xq viene de una URL) a un numero entero (integer en base 10 decimal)
    req.id = parseInt(id, 10); // convertimos el id en un entero
    console.log("Id validado!: ", req.id),
    
    next(); // continuar al sig middleware
} 

//middlewares para chequear si existe una sesion creada, si no, redirigir a login
const requireLogin = (req, res, next) => {
    if(!req.session.user)
    {
        return res.redirect("/login");
    }
    next();

}

//validacion para la creacion de un producto
const validacionFormularios = (req, res, next) => {
    const { nombre, precio, tipo, img } = req.body;

    // nombre
    if (!nombre || nombre.trim().length < 3) {//trim(): eliminar todos los espacios en blanco de la cadena.
        return res.status(400).json({
            message: "El nombre es obligatorio y debe tener al menos 3 caracteres."
        });
    }

    // precio
    if (!precio || isNaN(precio) || Number(precio) <= 0) {
        return res.status(400).json({
            message: "El precio debe ser un número mayor a 0."
        });
    }

    // tipo(categoría)
    const categoriasValidas = ["Sellado", "Accesorio"];
    if (!tipo || !categoriasValidas.includes(tipo)) {
        return res.status(400).json({
            message: "La categoría no es válida."
        });
    }
    // URL de imagen
    if (!img || !img.startsWith("http")) {
        return res.status(400).json({
            message: "La URL de imagen no es válida."
        });
    }

    next();
};




// middlewares de ruta para validad el id en la ruta /api/products/:id
export {
    loggerUrl,
    validateId,
    validacionFormularios,
    requireLogin

}
