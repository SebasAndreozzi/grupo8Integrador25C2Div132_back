// Seleccionamos el elemento al que le vamos a inyectar el HTML

let contenedorProductos = document.getElementById("contenedor-productos");
const url = "http://localhost:3000/api/productos"

async function obtenerProductos()
{
    try{
        let respuesta =  await fetch(url)

        let data = await respuesta.json();

        let productos = data.payload;

        mostrarProductos(productos);

    }
    catch(error){
        console.log(error);
    }
}
function mostrarProductos(array)
{
    console.table(array); //recibimos correctamente en formate tabla los productos q nos manda la funcion obtenerPorductos()

    let htmlProducto ="";

    array.forEach(producto=> {
        htmlProducto += `
            <div class= "card-producto">
                <img src="${producto.img}" alt="${producto.nombre}"  width="150" height="150">
                <h3>${producto.nombre}<h4>
                <p>$${producto.precio}</p>
                <input class="button" type="button" id="idProducto" value="Agregar al carrito">
            </div>
        `;

    });
    contenedorProductos.innerHTML = htmlProducto;
}

function init() {
    obtenerProductos();
}

init();