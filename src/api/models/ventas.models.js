import connection from "../database/db.js";// conexion a la BDD

export const selectAllVentas = () => {
    const sql = "SELECT * FROM ventas"

    return connection.query(sql);
};

export const selectVentaById = (id) => {
    let sql = "SELECT * FROM ventas WHERE ventas.id = ?";
    return connection.query(sql, [id]);
}

export const insertVenta = (fecha, usuario, monto) =>{
    let sql = `INSERT INTO ventas (fecha, usuario, monto) VALUES (?, ?, ?)`;
    return connection.query(sql, [fecha, usuario, monto]);
}

export const insertVentaProducto = (ventaId, id, productoId, cantidad) => {
    let sql = `INSERT INTO ventaProducto (ventas_id, productos_id, precio, cantidad) VALUES (?,?,?,?)`;
    return connection.query(sql, [ventaId, productoId, precio, cantidad]);
}