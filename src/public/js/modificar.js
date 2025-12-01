let getProductos_form = document.getElementById("getProductos-form");
let contenedor_productos = document.getElementById("contenedor-productos");
let contenedor_formulario = document.getElementById("contenedor-formulario");


getProductos_form.addEventListener("submit", async (event) => {
    
    event.preventDefault();

    let formData = new FormData(event.target);

    let data = Object.fromEntries(formData.entries());

    let idProducto = data.id;

    try {

        let response = await fetch(`http://localhost:3000/api/productos/${idProducto}`);

        let datos = await response.json();

        let producto = datos.payload[0];

        mostrarProducto(producto); 

    } catch (error) {
        console.error("Error: ", error);
    }

});

function mostrarProducto(producto) {

    let htmlProducto = `
        <div class="card-producto">
            <img src="${producto.img}" alt="${producto.nombre}">
            <p>Id: ${producto.id}</p>
            <p>Nombre: ${producto.nombre}</p>
            <p>Precio: $${producto.precio}</p>
            <p>${producto.activo ? "Activo" : "Inactivo"}</p>
        </div>
        
        <button class="button" type="button" id="updateProducto_button">Modificar producto</button>
            
        `;

    contenedor_productos.innerHTML = htmlProducto;

    let updateProducto_button = document.getElementById("updateProducto_button");

    updateProducto_button.addEventListener("click", event => {
        crearFormulario(event, producto);
    });
}


function crearFormulario(event, producto) {

    event.stopPropagation(); // Evitamos la propagacion de eventos
    console.table(producto); // Recibimos el producto para llenar los valores del formulario

    let formularioHtml = `
        <form id="updateProducts-form" class="productos-form">
            
            <input type="hidden" name="id" value="${producto.id}"> 
            
            <label for="nombreProd">Nombre</label>
            <input type="text" name="nombre" id="nombreProd" value="${producto.nombre}">

            <label for="precioProd">Precio</label>
            <input type="number" name="precio" id="precioProd" value="${producto.precio}">

            <label for="tipoProd">Tipo</label>
            <select name="tipo" id="tipoProd">
                <option value="Sellado">Sellado</option>
                <option value="Accesorio">Accesorio</option>
            </select>

            <label for="imgProd">Imagen</label>
            <input type="text" name="img" id="imgProd" value="${producto.img}">

            <input type="hidden" name="activo" value="${producto.activo}"> 

            <button class="button" type="submit">Modificar producto</button>
        </form>
    `;
    // TUVE QUE AGREGAR XQ REQUIERE CAMPO ACTIVO<input type="hidden" name="activo" value="${producto.activo}">

    contenedor_formulario.innerHTML = formularioHtml;

    let updateProducts_form = document.getElementById("updateProducts-form");

    updateProducts_form.addEventListener("submit", event => {
        console.log(event);
        modificarProducto(event);
    });
}

async function modificarProducto(event) {
    event.preventDefault();

    let url = "http://localhost:3000/api/productos";
    
    let formData = new FormData(event.target);
    console.log(formData);

    let data = Object.fromEntries(formData.entries());
    console.log(data);

    try {
        let response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        let result = await response.json(); 

        if(response.ok) { 
            console.log(result.message);
            alert(result.message);

            contenedor_productos.innerHTML = "";
            contenedor_formulario.innerHTML = "";

        } else {
            mostrarError(result.message || "No se pudo modificar el producto");
            return;
        }

    } catch (error) {
        console.error("Error al enviar los datos: ", error);
        alert("Error al procesar la solicitud");
    }

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