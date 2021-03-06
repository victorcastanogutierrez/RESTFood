let menuPlates = [];
let currentRestaurant;
let counter = 0;






function goToMakeMenu() {
    event.preventDefault();
    let nombreRes = $("#nombreRes").val();
    let direccionRes = $("#direccionRes").val();
    let horarioRes = $("#horarioRes").val();
    let telefonoRes = $("#telefonoRes").val();
    let webRes = $("#webRes").val();
    let tipoRes = $("#tipoRes")
        .find(":selected")
        .text();
    let tipoValue = $("#tipoRes")
        .find(":selected")
        .val();
    let restaurant = {
        nombre: nombreRes,
        direccion: direccionRes,
        horario: horarioRes,
        telefono: telefonoRes,
        web: webRes,
        tipo: tipoValue
    };
    if (
        nombreRes !== "" &&
        direccionRes !== "" &&
        horarioRes !== "" &&
        telefonoRes !== "" &&
        webRes !== ""
    ) {
        currentRestaurant = restaurant;
        $("#infoGeneral").css("display", "none");
        $("#alertDiv").css("display", "none");
        $("#confirmRestaurant").css("display", "none");
        $("#menu").css("display", "flex");
        changeStep("btnInfo", "btnMenu", "btnConfirmar");

    } else {
        $("#alertDiv").css("display", "block");
        $("#alertDiv").text("Por favor, rellene todos los campos del formulario");
    }
}



function addToMenu() {
    event.preventDefault();
    let nombre = $("#nombreplato").val();
    let precio = $("#precioplato").val();
    if (nombre !== "" && precio !== "") {
        $("#scrollable").append(`
        <tr class="pPedido spaced" id="plato${counter}">
            <td>${nombre}</td>
            <td>${precio}€</td>
            <td><button class="btn btn-link px-0" id="btn_${counter}" onclick="deletePlato()"> Borrar plato</button></td>
        </tr>  
    `);
        let plate = {
            nombre: nombre,
            precio: precio,
            id: counter
        };
        menuPlates.push(plate);
        $("#nombreplato").val("");
        $("#precioplato").val("");
        $("#alertDiv").css("display", "none");
        counter++;
    }
}

function deletePlato() {
    let paragraphID = event.target.id.split("_")[1];
    menuPlates.splice(Number(paragraphID), 1);
    $(`#plato${paragraphID}`).remove();
    counter--;
}

function atrasAInfo() {
    $("#infoGeneral").css("display", "block");
    $("#menu").css("display", "none");
    $("#confirmRestaurant").css("display", "none");
    changeStep("btnMenu", "btnInfo", "btnConfirmar");


}

function siguienteAConfirmar() {
    if (menuPlates.length > 0) {
        $("#menu").css("display", "none");
        $("#confirmRestaurant").css("display", "flex");
        currentRestaurant.menu = menuPlates;
        $("#alertDiv").css("display", "none");
        fillInfoRestaurant(currentRestaurant);
        changeStep("btnMenu", "btnConfirmar", "btnInfo");

    } else {
        $("#alertDiv").css("display", "block");
        $("#alertDiv").text("Añada al menos un plato");
    }
}

function fillInfoRestaurant(restaurant) {
    $("#currentCreation").empty();

    $("#currentCreation").append(`
        <h3>Información General</h3>
            <p>
                Nombre : ${restaurant.nombre} <br/>
                Dirección : ${restaurant.direccion} <br/>
                Horario : ${restaurant.horario} <br/>
                Telefono : ${restaurant.telefono} <br/>
                Web : ${restaurant.web} <br/>
                Tipo : ${restaurant.tipo}
            </p>
        <h3>Platos Disponibles</h3>
        <p>
        `);

    restaurant.menu.forEach(plate => {
        $("#currentCreation").append(`
                ${plate.nombre} - ${plate.precio}
            `);
    });
    $("#currentCreation").append(`</p>`);
}

function atrasAMenu() {
    $("#menu").css("display", "flex");
    $("#confirmRestaurant").css("display", "none");
    $("#infoGeneral").css("display", "none");
    changeStep("btnConfirmar", "btnMenu", "btnInfo");


}

function confirm() {
    $.ajax({
        type: "POST",
        url: "/p/restaurante",
        data: currentRestaurant
    }).done(response => {
        document.getElementById("misRestaurantes").click();
    });
}

function changeStep(fromButton, toButton, otherButton) {
    $(`#${fromButton}`).addClass("btn-default");
    $(`#${fromButton}`).removeClass("btn-primary");
    $(`#${toButton}`).removeClass("btn-default");
    $(`#${toButton}`).addClass("btn-primary");
    $(`#${otherButton}`).removeClass("btn-primary");
    $(`#${otherButton}`).addClass("btn-default");
}