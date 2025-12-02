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