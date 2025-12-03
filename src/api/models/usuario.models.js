import connection from "../database/db.js";

//Busca y selecciona un usuario de la base de datos utilizando su correo y contraseña.
//params: correo y contraseña sera el usuario ingresado en el formulario login
//retorna una promesa que resuelve con los resultados de la consulta a la base de datos.
export const selectUserByCredentials = (correo) => {
    const sql = "SELECT * FROM usuarios WHERE correo = ?";
    return connection.query(sql, [correo]);
};

// Obtener usuario por id
export const selectUsuarioById = (id) => {
    let sql = "SELECT * FROM usuarios WHERE usuarios.id = ?";
    return connection.query(sql, [id]);
}

// Crear usuario
export const insertUser = (correo, password) => {
    const sql = `INSERT INTO usuarios (correo, password) values (?,?)`;
    return connection.query(sql, [correo, password])
}

// Modificar usuario
export const updateUser = (correo, password, id) => {
    let sql = `
        UPDATE usuarios
        SET correo = ?, password = ?
        WHERE id = ?
    `;
    return connection.query(sql, [correo, password, id]);
};

export const deleteUser = (id) =>{
    let sql = `DELETE FROM usuarios where id= ?`;
    
    return connection.query(sql,[id]);
}



export default {
    insertUser,
    updateUser,
    deleteUser
}

