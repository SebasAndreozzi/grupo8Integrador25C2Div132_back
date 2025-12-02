let contenedorProductos = document.getElementById("contenedor-productos");
let contenedorCarrito = document.getElementById("contenedor-carrito");
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
    let htmlProducto ="";

    array.forEach(producto=> {
        htmlProducto += `
            <div class= "card-producto">
                <img src="${producto.img}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>id: ${producto.id}</h3>
                <p>$${producto.precio}</p>
                <p>${producto.activo ? "Activo" : "Inactivo"}</p>
            </div>
        `;

    });
    contenedorProductos.innerHTML = htmlProducto;

    let sellado = document.getElementById("filtro-sellado");
    sellado.addEventListener("click", event =>{
        filtrarPorTipo(array, sellado.textContent);
    })

    let accesorio = document.getElementById("filtro-accesorio");
    accesorio.addEventListener("click", event =>{
        filtrarPorTipo(array, accesorio.textContent);
    })
   
}

/*===================
  Funcines de filtro
====================*/
function filtrarPorTipo(array, tipo){
    let htmlProducto ="";

    array.forEach(producto=> {
        if(producto.tipo === tipo)
        htmlProducto += `
            <div class= "card-producto">
                <img src="${producto.img}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio}</p>
                <p>${producto.activo ? "Activo" : "Inactivo"}</p>
            </div>
        `;

    });
    contenedorProductos.innerHTML = htmlProducto;
}


function init() {
    obtenerProductos();
}

init();