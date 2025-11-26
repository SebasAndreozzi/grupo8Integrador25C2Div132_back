let getProductos_form = document.getElementById("getProductos-form");
let listado_productos = document.getElementById("listado-productos");
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
        <ul class="card-producto">
            <li><img src="${producto.img}" alt="${producto.nombre}" class="img-listados"></li>
            <li>Id: ${producto.id}</li>
            <li>Nombre: ${producto.nombre}</li>
            <li><strong>Precio: $${producto.precio}</strong></li>
        </ul>
        
        <input class="button" type="button" id="updateProducto_button" value="Modificar producto">
            
        `;

    listado_productos.innerHTML = htmlProducto;

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
            <br>

            <label for="precioProd">Precio</label>
            <input type="number" name="precio" id="precioProd" value="${producto.precio}">
            <br>

            <label for="tipoProd">Tipo</label>
            <select name="tipo" id="tipoProd">
                <option value="sellado">Sellado</option>
                <option value="accesorio">Accesorio</option>
            </select>
            <br>

            <label for="imgProd">Imagen</label>
            <input type="text" name="img" id="imgProd" value="${producto.img}">
            <br>

            <input type="hidden" name="activo" value="${producto.activo}"> 

            <input class="button" type="submit" value="Modificar producto">
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
            alert(result.message);

            listado_productos.innerHTML = "";
            contenedor_formulario.innerHTML = "";

        } else {
            console.error("Error: ", error.message);
            alert(error.message);
        }

    } catch (error) {
        console.error("Error al enviar los datos: ", error);
        alert("Error al procesar la solicitud");
    }

}
