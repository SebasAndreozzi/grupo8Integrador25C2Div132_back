let urlProductos = "http://localhost:3000/api/productos";
let urlUsuarios = "http://localhost:3000/api/usuarios";



// Productos
let getProducts_form = document.getElementById("getProductos-form");
// Usuarios
let getUsuarios_form = document.getElementById("getUsuarios-form");


let contenedor_productos = document.getElementById("contenedor-productos");


getProducts_form.addEventListener("submit", async (event) => {
    event.preventDefault(); 
    let formDataProductos = new FormData(event.target);

    // Llamamos a la función que hace la consulta
    ConsultarTabla(urlProductos, formDataProductos, "producto");
});

getUsuarios_form.addEventListener("submit", async (event) => {
    event.preventDefault(); 
    let formDataUsuarios = new FormData(event.target);

    // Llamamos a la función que hace la consulta
    ConsultarTabla(urlUsuarios, formDataUsuarios, "usuario");
});

async function ConsultarTabla(urlPersonalizado, formData, tipo) {
    let data = Object.fromEntries(formData.entries());
    let id = data.id;
    try {
        // Hago el fetch a la URL personalizada
        let response = await fetch(`${urlPersonalizado}/${id}`);
        // console.log(response);
        
        // Proceso los datos que me devuelve el servidor
        let datos = await response.json();
        // console.log(datos);

        if (!response.ok) {
            mostrarError(datos.message || "No se pudo obtener el producto");
            return;
        }

        // Renderizamos según el tipo
        let item = datos.payload[0];
        if (tipo === "producto") mostrarProducto(item);
        else if (tipo === "usuario") mostrarUsuario(item);

    } catch (error) {
        console.error("Error: ", error);
        mostrarError("Error al consultar el producto");
    }
}

function mostrarProducto(producto) {
    console.table(producto); // El producto se recibe correctamente

    let htmlProducto = `
        <div class="card-producto">
            <img src="${producto.img}" alt="${producto.nombre}" class="img-contenedors">
            <p>Id: ${producto.id}</p>
            <p>Nombre: ${producto.nombre}</p>
            <p>Precio: $${producto.precio}</p>
            <p>${producto.activo ? "Activo" : "Inactivo"}</p>
        </div>
        `;

    contenedor_productos.innerHTML = htmlProducto;
}
function mostrarUsuario(usuario) {
    let htmlUsuario = `
        <div class="card-usuario">
            <p>Id: ${usuario.id}</p>
            <p>Correo: ${usuario.correo}</p>
            <p>Password: ${usuario.password}</p>
        </div>
    `;
    contenedor_productos.innerHTML = htmlUsuario;
}

function mostrarError(message) {
    contenedor_productos.innerHTML = `
        <li class="mensaje-error">
            <p>
                <strong>Error:</strong>
                <span>${message}</span>
            </p>
        </li>
    `;
}
