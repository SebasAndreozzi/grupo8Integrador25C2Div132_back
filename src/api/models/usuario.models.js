import connection from "../database/db.js";

export const selectUserByCredentials = (correo, password) => {
    const sql = "SELECT * FROM usuarios WHERE correo = ? AND password = ?";
    return connection.query(sql, [correo, password]);
};
