import connection from "../database/db.js";

//Busca y selecciona un usuario de la base de datos utilizando su correo y contraseña.
//params: correo y contraseña sera el usuario ingresado en el formulario login
//retorna una promesa que resuelve con los resultados de la consulta a la base de datos.
export const selectUserByCredentials = (correo) => {
    const sql = "SELECT * FROM usuarios WHERE correo = ?";
    return connection.query(sql, [correo]);
};



export const insertUser = (correo, password) => {
    const sql = `INSERT INTO usuarios (correo, password) values (?,?)`;
    return connection.query(sql, [correo, password])
}

export default {
    insertUser
}

