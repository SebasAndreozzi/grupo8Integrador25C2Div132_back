/*=========================
// Controladores usuario
==========================*/

import { selectUserByCredentials, selectUsuarioById } from "../models/usuario.models.js"; // Importa la función del modelo de datos para buscar usuarios por credenciales.
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import UserModels from "../models/usuario.models.js"



export const insertUser = async (req, res) => {
    try {
        const { correo, password } = req.body;

        if (!correo || !password) {
            return res.status(400).json({
                message: "Datos inválidos, faltan campos"
            });
        }

        // Hashear contraseña ANTES de guardar
        const hashedPassword = await hashPassword(password);

        // Guardar en la base la contraseña hasheada
        const [rows] = await UserModels.insertUser(correo, hashedPassword);

        return res.status(201).json({
            message: "Usuario creado con éxito!",
            userId: rows.insertId
        });

    } catch (error) {
        console.log("Error interno del servidor:", error);

        return res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        });
    }
};

// CONTROLADOR MODIFY -> Modifica un producto existente utilizando los datos enviados por el cliente y ejecuta la actualización y devuelve resultado como JSON
export const modifyUser = async (req, res) => {
    try {
        let { id, correo, password } = req.body;

        // Validación de campos obligatorios
        if (!id || !correo) {
            return res.status(400).json({
                message: "Faltan campos requeridos (id o correo)."
            });
        }

        // 1° Buscar usuario actual
        const [rows] = await selectUsuarioById(id);

        if (rows.length === 0) {
            return res.status(404).json({
                message: "No existe usuario con ese id"
            });
        }

        let oldUser = rows[0];

        // Resolver contraseña
        let newPassword;

        if (!password || password.trim() === "") {
            // Si NO manda nueva contraseña → Mantenemos la actual
            newPassword = oldUser.password;
        } else {
            // Si manda nueva contraseña → la hasheamos
            try {
                newPassword = await hashPassword(password);
            } catch (e) {
                return res.status(400).json({
                    message: e.message || "Error al hashear la contraseña"
                });
            }
        }

        // 3° Ejecutar UPDATE
        const [result] = await UserModels.updateUser(correo, newPassword, id);

        if (result.affectedRows === 0) {
            return res.status(400).json({
                message: "No se pudo actualizar el usuario."
            });
        }

        // 4° Respuesta OK
        return res.status(200).json({
            message: `Usuario con id ${id} actualizado correctamente`
        });

    } catch (error) {
        console.error("Error al actualizar usuario: ", error);
        return res.status(500).json({
            message: `Error interno del servidor: ${error}`
        });
    }
};
export const removeProduct = async (req, res)=>{
    try
    {
        let{id} = req.params;
        let [result] = await UserModels.deleteUser(id);
        
        console.log(result); //console

        // Comprobamos si realmente se elimino un usuario y afectó alguna fila (es decir, si el usuario existía)
        if(result.affectedRows === 0) {
            return res.status(400).json({ //bad request
                message: `No se elimino el usuario con id: ${id}`
            });
        }

        // el tipo de respuesta en json
        return res.status(200).json({//ok
            message: `Usuario con id ${id} eliminado exitosamente!`
        });
    }catch(error)
    {
        console.error("Error al eliminar un usuario por su id:  ", error);
        res.status(500).json({//internal server error
            message: `Error al eliminar usuario con id: ${id}`,
            error: error.message
        });
    }
}



export const getUsuarioById = async (req, res)=>{ 
    let {id} = req.params; // En el array le importa unicamente el id
    const [rows] = await selectUsuarioById(id);

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
  
}

export const loginUser = async (req, res) => {
    try {
        const { correo, password } = req.body;
        console.log(await hashPassword(password));

        // BUSCAR USUARIO SOLO POR CORREO
        const [rows] = await selectUserByCredentials(correo);

        if (rows.length === 0) {
            return res.render("login", {
                title: "Login",
                about: "Iniciar sesión",
                error: "Credenciales incorrectas"
            });
        }

        const user = rows[0];
        console.table(user);

        // COMPARAR PASSWORD CON BCRYPT
        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            return res.render("login", {
                title: "Login",
                about: "Iniciar sesión",
                error: "Credenciales incorrectas"
            });
        }

        // SI TODO OK → GUARDAMOS LA SESION
        req.session.user = {
            id: user.id,
            correo: user.correo
        };

        res.redirect("/dashboard");

    } catch (error) {
        console.log("Error en login:", error);

        res.render("login", {
            title: "Login",
            about: "Iniciar sesión",
            error: "Error interno en el servidor"
        });
    }
};


export const logoutUser = (req, res) => { // Define la función que maneja el cierre de sesión (POST /logout).
    req.session.destroy((err) => {
        if(err) { // Si existiera algun error destruyendo la sesion
            console.log("Error al destruir la sesion", err);
            return res.status(500).json({
                error: "Error al cerrar la sesion"
            });
        }

        // Redirigimos a login luego de cerrar la sesion
        res.redirect("/login");
    });
};