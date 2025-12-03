const urlProductos = "http://localhost:3000/api/productos";
const urlUsuarios  = "http://localhost:3000/api/usuarios";

const getProductos_form   = document.getElementById("getProductos-form");
const getUsuarios_form    = document.getElementById("getUsuarios-form");
const contenedor_productos = document.getElementById("contenedor-productos");
const contenedor_formulario = document.getElementById("contenedor-formulario");

// BUSCAR PRODUCTO POR ID 
getProductos_form.addEventListener("submit", async (event) => {
    event.preventDefault();

    let formData = new FormData(event.target); 
    
    let data = Object.fromEntries(formData.entries());

    let idProducto = data.id;

    try {
        let response = await fetch(`${urlProductos}/${idProducto}`);
        let datos = await response.json();
        // Extraigo el producto que devuelve payload
        let producto = datos.payload[0]; // Apuntamos a la respuesta, vamos a payload que trae el array con el objeto y extraemos el primer y unico elemento

        mostrarProducto(producto);

    } catch (error) {
        console.error("Error: ", error);
    }
});

getUsuarios_form.addEventListener("submit", async (event) => {
  event.preventDefault();
    // 1° paso = extraer toda la info del formulario en un objeto FormData (event.target -> le pasamos todo el formulario a FormData)
    //--------------------------------------------------------------------
    let formData = new FormData(event.target); 
    console.log(formData);
    // Form data {id -> "2"}
    // Pares clave valor con funcionalidad html y utilizado para enviar datos
    // de formulario 
    
    //--------------------------------------------------------------------
    // 2° paso = convertimos el objeto FormData en un objeto normal JS para poder extraer la info comodamente
    //--------------------------------------------------------------------
    let data = Object.fromEntries(formData.entries());
    console.log(data);
    
    let idUsuario = data.id;
    console.log(idUsuario); //extraimos el id osea el valor del campo
    
    
    // 3
    //fecth a localhost:3000/products/id -> el valor numerico del campo del form
    
    try{
        //hafo el fecth a la url personalizada
        let response = await fetch(`${urlUsuarios}/${idUsuario}`);

        console.log(response);
        //proceso los datos que me debuelve el servidor
        let datos = await response.json();
        console.log(datos);

        // extraigo el Usuario que devuelve payload
        let usuario = datos.payload[0]; //apuntamos a la respuesta , vamos a payload donde trae el array con el objeto y extraemos el primer y unico elemento 
        // console.table(Usuario);

        mostrarUsuario(usuario); // le pasamos el producto a la funcion que lo renderice en la pantalla

    }
    catch(error)
    {
        console.error("Error: ", error); 
    }

});







// ======================================================
// === MOSTRAR EN PANTALLA ===
// ======================================================
function mostrarProducto(producto) {

    contenedor_productos.innerHTML = `
        <div class="card-producto">
            <img src="${producto.img}" alt="${producto.nombre}">
            <p>Id: ${producto.id}</p>
            <p>Nombre: ${producto.nombre}</p>
            <p>Precio: $${producto.precio}</p>
            <p>${producto.activo ? "Activo" : "Inactivo"}</p>
        </div>

        <button class="button" id="updateProducto_button">Modificar producto</button>
    `;

    document
        .getElementById("updateProducto_button")
        .addEventListener("click", () => crearFormulario(producto));
}

function mostrarUsuario(usuario) {
    console.table(usuario); // recibe correectamente el prod

    let htmlProducto = `
        <div class="card-usuario">
            <p>Id: ${usuario.id}</p>
            <p>Correo: ${usuario.correo}</p>
        </div>
        <div class="actions">
            <button class="button" id="updateUsuario_button">Modificar usuario</button>
        </div>
    `;

    contenedor_productos.innerHTML = htmlProducto;
    let updateUsuario_button = document.getElementById("updateUsuario_button");


    updateUsuario_button.addEventListener("click", event =>
        crearFormularioUsuario(event, usuario)
    );

}








// ======================================================
// === CREAR FORMULARIO DE MODIFICACIÓN DINÁMICO ===
// ======================================================
function crearFormulario(producto) {

    contenedor_formulario.innerHTML = `
        <form id="updateProducts-form" class="productos-form">

            <input type="hidden" name="id" value="${producto.id}">

            <label>Nombre</label>
            <input type="text" name="nombre" value="${producto.nombre}">

            <label>Precio</label>
            <input type="number" name="precio" value="${producto.precio}">

            <label>Tipo</label>
            <select name="tipo">
                <option value="Sellado">Sellado</option>
                <option value="Accesorio">Accesorio</option>
            </select>

            <label>Estado</label>
            <select name="activo">
                <option value="1">Activo</option>
                <option value="0">Inactivo</option>
            </select>

            <label id="dropArea" class="drop-zone">
                <p class="drop-text">Arrastra un archivo aquí o <span>explora</span></p>
                <p class="drop-subtext">Tamaño máximo: 5MB</p>
                <input type="file" id="fileInput" name="image">
            </label>

            <div class="file-preview" id="filePreview">
                <div id="fileName">Archivo:</div>
            </div>

            <button class="button" type="submit">Modificar producto</button>
        </form>
    `;

    // Activar Drag & Drop (recién ahora existen los elementos)
    initDropzone(
        document.getElementById('dropArea'),
        document.getElementById('fileInput'),
        document.getElementById('filePreview'),
        document.getElementById('fileName')
    );

    document
        .getElementById("updateProducts-form")
        .addEventListener("submit", actualizarProducto);
}

function crearFormularioUsuario(event, usuario) 
{

    event.stopPropagation(); //evitar propagacion de usuarios
    console.table(usuario);

    let containerFormUsuarios = `
        <form id="updateUsers-form" class="productos-form">
            <input type="hidden" name="id" value="${usuario.id}">

            <label>Correo</label>
            <input type="email" name="correo" value="${(usuario.correo)}" required>

            <label>Password (si dejás vacío no se cambia)</label>
            <input type="password" name="password" placeholder="Ingrese contraseña">

            <button class="button" type="submit">Modificar usuario</button>
        </form>
    `;

    contenedor_formulario.innerHTML = containerFormUsuarios;

    let updateProducts_form = document.getElementById("updateUsers-form");

    updateProducts_form.addEventListener("submit", event =>{
        actualizarUsuario(event);
    });
        
}
async function actualizarUsuario(event) 
{
    event.preventDefault();

    let formData = new FormData(event.target);
    let data = Object.fromEntries(formData.entries()); 
    console.log(data);

    let url = `http://localhost:3000/api/usuarios/${data.id}`;

    try {
        let response = await fetch(url,{
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
        } 
        else {
            console.error("Error:", result.message);
            alert(result.message);
        }

    } catch(error) {
        console.error("Error al enviar los datos: ", error);
        alert("Error al procesar la solicitud");
    }
}








async function actualizarProducto(event) {
    event.preventDefault();
    let url= "http://localhost:3000/api/productos";

    let formData = new FormData(event.target);

    try {
        let response = await fetch(url, {
            method: "PUT",
            body: formData   // IMPORTANTE: sin JSON, sin headers
        });

        let result = await response.json();

        if (response.ok) {//si la peticion es exitosa, pasa hacer esto
            console.log(result.message);
            alert(result.message);
            // Vaciamos el form y el listado 
            contenedor_productos.innerHTML = "";
            contenedor_formulario.innerHTML = "";
        } else {
            mostrarError(result.message);
        }

    } catch (error) {
        console.error("Error al modificar: ", error);
        alert("Error al procesar la solicitud");
    }
}


function mostrarError(message) {
    contenedor_productos.innerHTML = `
        <li class="mensaje-error">
            <p><strong>Error:</strong> ${message}</p>
        </li>
    `;
}


/*======================================================
=== DRAG & DROP GENÉRICO (reutilizable) ===
======================================================*/
function initDropzone(dropArea, fileInput, filePreview, fileName) {

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length) {
            showFile(fileInput.files[0], filePreview, fileName);
        }
    });

    ['dragenter', 'dragover'].forEach(ev => {
        dropArea.addEventListener(ev, e => {
            e.preventDefault();
            dropArea.classList.add('dragover');
        });
    });

    ['dragleave', 'drop'].forEach(ev => {
        dropArea.addEventListener(ev, e => {
            e.preventDefault();
            dropArea.classList.remove('dragover');
        });
    });

    dropArea.addEventListener('drop', e => {
        const files = e.dataTransfer.files;
        if (files.length) {
            fileInput.files = files;
            showFile(files[0], filePreview, fileName);
        }
    });
}

// ======================================================
// === MOSTRAR ARCHIVO SELECCIONADO ===
// ======================================================
function showFile(file, preview, label) {
    preview.style.display = 'flex';
    label.textContent = `Archivo: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
}

