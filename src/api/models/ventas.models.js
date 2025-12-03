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

export const selectVentaProductoById = (id) => {
    let sql = "SELECT * FROM venta_producto WHERE ventas_id = ?";
    return connection.query(sql, [id]);
}

export const insertVentaProducto = (ventaId, productoId, precio, cantidad) => {
    let sql = `INSERT INTO venta_producto (ventas_id, productos_id, precio, cantidad) VALUES (?,?,?,?)`;
    return connection.query(sql, [ventaId, productoId, precio, cantidad]);
}
