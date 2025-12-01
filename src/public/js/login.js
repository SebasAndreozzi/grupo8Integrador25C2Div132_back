    let emailUser = document.getElementById("emailUser");
    let passwordUser = document.getElementById("passwordUser");

    let acceso_rapido = document.getElementById("acceso");
    acceso_rapido.addEventListener("click", () => {
        emailUser.value = "test@test.com";
        passwordUser.value = "test";
    });