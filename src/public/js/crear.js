let altaProducto_form = document.getElementById("altaProducto-form");
let url = "http://localhost:3000/api/productos";

altaProducto_form.addEventListener("submit", async event => {
    event.preventDefault();

    const formData = new FormData(altaProducto_form);

    enviarProducto(formData);
});


async function enviarProducto(formData) {
    console.table(formData);// recibimos correctamente los datos del form
    try {
        let response = await fetch(url, {
            method: "POST",
            body: formData   // ← importante: sin JSON, sin headers
        });

        //Procesamos la respuesta que nos devuelve
        let result = await response.json();
        console.log(result);
        // Vamos a verificar si la conexion fue exitosa con un "200" OK o "201" Created
        if (response.ok) {
            alert(result.message);
        } else {//en caso de q haya otra respuesta distinta de ok
            alert(result.message);
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
