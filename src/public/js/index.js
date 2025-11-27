let contenedorProductos = document.getElementById("contenedor-productos");
let contenedorCarrito = document.getElementById("contenedor-carrito");
const url = "http://localhost:3000/api/productos"

let carrito = [];
if(JSON.parse(localStorage.getItem("carrito"))){
    carrito = JSON.parse(localStorage.getItem("carrito"));}

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
                <p>$${producto.precio}</p>
                <button class="button" data-producto='${JSON.stringify(producto)}' onclick="agregarACarrito(this.dataset.producto)">Agregar al carrito</button>
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

    let carrito = document.getElementById("carrito");
    carrito.addEventListener("click", (event) =>{
        mostrarCarrito(array);
    })
   
}

/*====================
  Funcines de carrito
=====================*/
function agregarACarrito(producto){ 
    carrito.push(producto);
}

function mostrarCarrito(){

    let htmlCarrito ="";

  carrito.forEach((producto, i)=> {
        let prod = JSON.parse(producto);

        htmlCarrito += `
            <div class= "card-producto">
                <img src="${prod.img}" alt="${prod.nombre}">
                <h3>${prod.nombre}</h3>
                <p>$${prod.precio}</p>
                <button class="button" onclick="eliminarElemento(${i})">Eliminar</button>
            </div>
        `; 
    });

    htmlCarrito += `<button class=button>Finalizar compra</button>`

    if(carrito.length > 0){
        contenedorCarrito.innerHTML = htmlCarrito;
    }

}

function eliminarElemento(indice){
    carrito.splice(indice, 1);

    if(carrito.length === 0){
        vaciarCarrito();

    }else{
        mostrarCarrito();
    }
}

function vaciarCarrito(){
    carrito = [];
    contenedorCarrito.innerHTML = "";
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
                <button class="button" onclick="agregarACarrito(${array})">Agregar al carrito</button>
            </div>
        `;

    });
    contenedorProductos.innerHTML = htmlProducto;
}


function init() {
    obtenerProductos();
}

init();