let contenedorVentas = document.getElementById("contenedor-ventas");
const url = "http://localhost:3000/api/ventas"

async function obtenerVentas()
{
    try{
        let respuesta =  await fetch(url)

        let data = await respuesta.json();

        let ventas = data.payload;

        mostrarVentas(ventas);

    }
    catch(error){
        console.log(error);
    }
}

function mostrarVentas(array)
{
    let htmlVenta =`
            <div class= "venta header-venta">
                <h3>ID</h3>
                <p>Fecha</h3>
                <p>Usuario</p>
                <p>Monto</p>
            </div>`;

    array.forEach(venta=> {
        let fecha = new Date(venta.fecha);
        let htmlFecha = fecha.toLocaleDateString("en-GB");
        htmlVenta += `
            <div class= "venta">
                <h3>${venta.id}</h3>
                <p>${htmlFecha}</h3>
                <p>${venta.usuario}</p>
                <p>$${venta.monto}</p>
            </div>
        `;

    });
    contenedorVentas.innerHTML = htmlVenta;
   
}

function init() {
    obtenerVentas();
}

init();