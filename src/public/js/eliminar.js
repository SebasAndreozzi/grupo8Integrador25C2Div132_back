let getProducts_form = document.getElementById("getProductos-form");
let listado_productos = document.getElementById("listado-productos");


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

        let producto = datos.payload[0];

        mostrarProducto(producto); 

    } catch (error) {
        console.error("Error: ", error);
    }

});

function mostrarProducto(producto) {
    console.table(producto);

    let htmlProducto = `
        <ul class="card-producto">
            <li><img src="${producto.img}" alt="${producto.nombre}" class="img-listados"></li>
            <li>Id: ${producto.id}</li>
            <li>Nombre: ${producto.nombre}</li>
            <li><strong>Precio: $${producto.precio}</strong></li>
        </ul>

        <input class="button" type="button" id="delete-button" value="Eliminar producto">    
        `;

    listado_productos.innerHTML = htmlProducto;
    
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

            listado_productos.innerHTML="";
        }else{
            console.error(error.message);
        }

    }catch(err){
        console.error(err.message);
    }
}