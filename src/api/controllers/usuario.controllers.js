import { selectUserByCredentials } from "../models/usuario.models.js"; // Importa la función del modelo de datos para buscar usuarios por credenciales.

export const loginUser = async (req, res) => {
    const { correo, password } = req.body;

    const [rows] = await selectUserByCredentials(correo, password); // Ejecuta la consulta a la base de datos de forma asíncrona.
    if (rows.length === 0) { // Comprueba si la consulta no arrojó resultados (credenciales incorrectas).
        return res.redirect("/login"); // Si falla el login, redirige al usuario de vuelta a la página de login.
    }

    req.session.user = { // Si las credenciales son correctas, crea una sesión para el usuario.
        id: rows[0].id, // Guarda el ID del usuario en la sesión.
        correo: rows[0].correo, // Guarda el correo del usuario en la sesión.
    };

    res.redirect("/dashboard"); // Redirige al usuario a la página principal o dashboard tras iniciar sesión con éxito.
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