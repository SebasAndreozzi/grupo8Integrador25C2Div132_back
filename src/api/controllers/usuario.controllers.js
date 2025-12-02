import { selectUserByCredentials } from "../models/usuario.models.js"; // Importa la función del modelo de datos para buscar usuarios por credenciales.
import { comparePassword, hashPassword } from "../utils/bcrypt.js";

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

        // COMPARAR PASSWORD CON BCRYPT
        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            return res.render("login", {
                title: "Login",
                about: "Iniciar sesión",
                error: "Credenciales incorrectas"
            });
        }

        // SI TODO OK → CREAR SESIÓN
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