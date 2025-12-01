import connection from "../database/db.js";

//nuevo renderLoginView
export const renderLoginView = (req, res) => {
    res.render("login", {
        title: "Login",
        about: "Iniciar sesión",
        error: "Credenciales incorrectas"
    });
};

export const renderDashboard = async (req, res) => {
    const [rows] = await connection.query("SELECT * FROM productos");
    res.render("index", { title: "Tiendamon", about: "Lista de productos", products: rows });
};

export const renderConsultar = (req, res) => {
    res.render("consultar", { title: "Consultar", about: "Consultar producto" });
};

export const renderCrear = (req, res) => {
    res.render("crear", { title: "Crear", about: "Crear producto" });
};

export const renderModificar = (req, res) => {
    res.render("modificar", { title: "Modificar", about: "Modificar producto" });
};

export const renderEliminar = (req, res) => {
    res.render("eliminar", { title: "Eliminar", about: "Eliminar producto" });
};
