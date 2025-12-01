let getProducts_form = document.getElementById("getProductos-form");
let contenedor_productos = document.getElementById("contenedor-productos");


getProducts_form.addEventListener("submit", async (event) => {
    
    event.preventDefault(); 

    let formData = new FormData(event.target);

    let data = Object.fromEntries(formData.entries());

    let idProducto = data.id;

    try {
        let response = await fetch(`http://localhost:3000/api/productos/${idProducto}`);
        console.log(response);

        let datos = await response.json();
        console.log(datos);

        if (!response.ok) {
            mostrarError(datos.message || "No se pudo obtener el producto");
            return;
        }
        let producto = datos.payload[0];

        mostrarProducto(producto); 

    } catch (error) {
        console.error("Error: ", error);
    }

});

function mostrarProducto(producto) {
    console.table(producto);

    let htmlProducto = `
        <div class="card-producto">
            <img src="${producto.img}" alt="${producto.nombre}">
            <p>Id: ${producto.id}</p>
            <p>Nombre: ${producto.nombre}</p>
            <p>Precio: $${producto.precio}</p>
            <p>${producto.activo ? "Activo" : "Inactivo"}</p>
        </div>
        
        <button class="button" type="button" id="delete-button">Eliminar producto</button>   
        `;

    contenedor_productos.innerHTML = htmlProducto;
    
    let deleteProduct_button = document.getElementById("delete-button");

    deleteProduct_button.addEventListener("click", event => {
        event.stopPropagation();

        let confirmacion = confirm("Quiere eliminar el producto?")

        if(!confirmacion){
            alert("Eliminacion cancelada");
        }else{
            eliminarProducto(producto.id);
        }
    })
}

async function eliminarProducto(id) {
    let url = `http://localhost:3000/api/productos/${id}`;

    try{
        let response = await fetch(url, {
            method:"DELETE"
        });

        let result = await response.json();

        if(response.ok){
            console.log(result.message);

            contenedor_productos.innerHTML="";
        }else{
            console.error(error.message);
        }

    }catch(err){
        console.error(err.message);
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