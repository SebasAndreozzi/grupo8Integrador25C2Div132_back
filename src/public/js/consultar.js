let getProducts_form = document.getElementById("getProductos-form");
let contenedor_productos = document.getElementById("contenedor-productos");


getProducts_form.addEventListener("submit", async (event) => {
    
    event.preventDefault(); 

    let formData = new FormData(event.target);

    let data = Object.fromEntries(formData.entries());

    let idProducto = data.id;

    try {
        // Hago el fetch a la url personalizada
        let response = await fetch(`http://localhost:3000/api/productos/${idProducto}`);
        console.log(response);

        // Proceso los datos que me devuelve el servidor
        let datos = await response.json();
        console.log(datos);

        if (!response.ok) {
            mostrarError(datos.message || "No se pudo obtener el producto");
            return;
        }
        // Extraigo el producto que devuelve payload
        let producto = datos.payload[0]; // Apuntamos a la respuesta, vamos a payload que trae el array con el objeto y extraemos el primer y unico elemento

        // Le pasamos el producto a una funcion que lo renderice en la pantalla
        mostrarProducto(producto); 

    } catch (error) {
        console.error("Error: ", error);
    }

});

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
