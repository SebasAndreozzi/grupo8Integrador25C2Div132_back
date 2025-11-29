let altaProducto_form = document.getElementById("altaProducto-form");

altaProducto_form.addEventListener("submit", async event => {
    
event.preventDefault();

let formData = new FormData(event.target);

let data = Object.fromEntries(formData.entries());

console.log(JSON.stringify(data));

enviarProducto(data);
})

async function enviarProducto(data){
    let url = "http://localhost:3000/api/productos"
    try{
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        let result = await response.json();

        if(response.ok){
            console.log(result.message);
            alert(result.message);
        }
        else{
            console.error(result.message);
            alert(result.message)
        }

    }catch(err){
        console.log("Error: ", err)
    }
}
