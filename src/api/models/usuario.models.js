import connection from "../database/db.js";

//Busca y selecciona un usuario de la base de datos utilizando su correo y contraseña.
//params: correo y contraseña sera el usuario ingresado en el formulario login
//retorna una promesa que resuelve con los resultados de la consulta a la base de datos.
export const selectUserByCredentials = (correo, password) => {
    const sql = "SELECT * FROM usuarios WHERE correo = ? AND password = ?";
    return connection.query(sql, [correo, password]);
};
