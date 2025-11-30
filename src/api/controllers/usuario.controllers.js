import { selectUserByCredentials } from "../models/usuario.models.js";

export const renderLoginView = (req, res) => {
    res.render("login", {
        title: "Login",
        about: "Iniciar sesión",
    });
};

export const loginUser = async (req, res) => {
    try {
        const { correo, password } = req.body;

        // Validación 1: campos vacíos
        if (!correo || !password) {
            return res.render("login", {
                title: "Login",
                about: "Iniciar sesión",
                error: "Todos los campos son obligatorios",
            });
        }

        // Consultar usuario
        const [rows] = await selectUserByCredentials(correo, password);

        // Validación 2: usuario no encontrado
        if (rows.length === 0) {
            return res.render("login", {
                title: "Login",
                about: "Iniciar sesión",
                error: "Credenciales incorrectas",
            });
        }

        const user = rows[0];

        // Guardar sesión
        req.session.user = {
            id: user.id,
            correo: user.correo,
        };

        // Redirigir al dashboard
        res.redirect("/dashboard");
    } catch (error) {
        console.error("Error en el login:", error);
        res.render("login", {
            title: "Login",
            about: "Iniciar sesión",
            error: "Ha ocurrido un error interno",
        });
    }
};

export const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log("Error al destruir la sesión:", err);
            return res.status(500).json({
                error: "Error al cerrar la sesión",
            });
        }

        res.redirect("/login");
    });
};
