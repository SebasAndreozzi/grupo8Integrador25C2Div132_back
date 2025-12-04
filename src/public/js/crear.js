let altaProducto_form = document.getElementById("altaProducto-form");
let altaUsers_form = document.getElementById("altaUsers-form");

let urlProduct = "http://localhost:3000/api/productos";
let urlUser = "http://localhost:3000/api/usuarios";


// alta usuarios
altaUsers_form.addEventListener("submit", async event => {
    event.preventDefault();

    let formDataUsuarios = new FormData(event.target); //Transformamos en objeto formdata los campos del usuario

    let data = Object.fromEntries(formDataUsuarios.entries()); //transformaamos a objeto js el objeto FormData

    console.log(data); //en console web

    // datos del usuario al endpoint api/usuarios
    try {
        let response = await fetch(urlUser, {
            // crear un usuario
            method: "POST",
            // mandando JSON
            headers: {
                "Content-Type":"application/json",
            },
            // convierte el objeto a JSON y lo manda al servidor
            body: JSON.stringify(data)   
        });

        //Procesamos la respuesta que nos devuelve
        if (response.ok) {
            console.log(response);
            
            let result = await response.json();
            console.log(result);
            alert(result.message);
        } 

    } catch (error) { //error de red
        console.log("Error al enviar los datos : ", error);
        alert("Error al procesar la solicitud");
    }


})





// Alta productos
altaProducto_form.addEventListener("submit", async event => {
    event.preventDefault();

    const formDataProductos = new FormData(altaProducto_form);

    enviarProducto(formDataProductos);
});


async function enviarProducto(formDataProductos) {
    console.table(formDataProductos);// recibimos correctamente los datos del form
    try {
        let response = await fetch(urlProduct, {
            method: "POST",
            body: formDataProductos   // ← importante: sin JSON, sin headers
        });

        //Procesamos la respuesta que nos devuelve
        let result = await response.json();
        console.log(result);
        // Vamos a verificar si la conexion fue exitosa con un "200" OK o "201" Created
        if (response.ok) {
            alert(result.message);
        } else {//en caso de q haya otra respuesta distinta de ok
            alert(result.error);
        }

    } catch (error) {
        console.log("Error al enviar los datos : ", error);
        alert("Error al procesar la solicitud");
    }
}




// DRAG & DROP
const dropArea = document.getElementById('dropArea');
const fileInput = document.getElementById('fileInput');
const filePreview = document.getElementById('filePreview');
const fileName = document.getElementById('fileName');

// Cuando seleccionan archivo manualmente
fileInput.addEventListener('change', () => {
    if (fileInput.files.length) {
        showFile(fileInput.files[0]);
    }
});

// Arrastrar encima
['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, e => {
        e.preventDefault();
        dropArea.classList.add('dragover');
    });
});

// Salir o soltar
['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, e => {
        e.preventDefault();
        dropArea.classList.remove('dragover');
    });
});

// Soltar archivo
dropArea.addEventListener('drop', e => {
    const files = e.dataTransfer.files;
    if (files.length) {
        fileInput.files = files;
        showFile(files[0]);
    }
});

// Mostrar archivo seleccionado
function showFile(file) {
    filePreview.style.display = 'flex';
    fileName.textContent = `Archivo: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
}
