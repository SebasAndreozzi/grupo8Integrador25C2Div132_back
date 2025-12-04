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
    if(!id || isNaN(id)|| id < 0)
    {
        return res.status(400).json({//bad request. La peticion http esta mal formado
            message: "El id debe ser un numero entero positivo"
        });
    }


    // convertimos el params id (originalmente un string xq viene de una URL) a un numero entero (integer en base 10 decimal)
    req.id = parseInt(id, 10); // convertimos el id en un entero
    //console.log("Id validado!: ", req.id),
    
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
    const { nombre, precio, tipo } = req.body;

    if (!nombre || nombre.trim().length < 3) {
        return res.status(400).json({ message: "El nombre debe tener al menos 3 caracteres." });
    }

    if (!precio || isNaN(precio) || Number(precio) <= 0) {
        return res.status(400).json({ message: "El precio debe ser mayor a 0." });
    }

    const categoriasValidas = ["Sellado", "Accesorio"];
    if (!tipo || !categoriasValidas.includes(tipo)) {
        return res.status(400).json({ message: "La categoría no es válida." });
    }

    next();
};
const validacionFormulariosCrear = (req, res, next) => {
    const { nombre, precio, tipo } = req.body;

    if (!nombre || nombre.trim().length < 3) {
        return res.status(400).json({ message: "El nombre debe tener al menos 3 caracteres." });
    }

    if (!precio || isNaN(precio) || Number(precio) <= 0) {
        return res.status(400).json({ message: "El precio debe ser mayor a 0." });
    }

    const categoriasValidas = ["Sellado", "Accesorio"];
    if (!tipo || !categoriasValidas.includes(tipo)) {
        return res.status(400).json({ message: "La categoría no es válida." });
    }

        // de la image multer
    if (!req.file) {
        return res.status(400).json({ message: "Debes subir una imagen." });
    }
    next();

};

const validacionVenta = (req, res, next) => {
    const { usuario, productos } = req.body;

    if (!usuario || usuario.trim().length === 0) {
        return res.status(400).json({ message: "Debe ingresar un nombre de usuario" });
    }

    if (!Array.isArray(productos) || productos.length === 0){
        return res.status(400).json({ message: "Debe haber al menos 1 producto" });
    }

    next();
};


// middlewares de ruta para validad el id en la ruta /api/products/:id
export {
    loggerUrl,
    validateId,
    validacionFormularios,
    validacionFormulariosCrear,
    requireLogin,
    validacionVenta

}
