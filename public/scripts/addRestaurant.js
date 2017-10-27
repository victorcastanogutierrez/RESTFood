let menuPlates = [];
let currentRestaurant;
let counter = 0;

function addToMenu(element) {
    if (element.checked) {
        $("#contenidoPedido").append(
            ` <p class="pPedido" id="${element.value}">${element.value} </p>`
        );
    } else {
        $(`#${element.value}`).remove();
    }
}

function goToMakeMenu() {
    event.preventDefault();
    $("#infoGeneral").css("display", "none");
    $("#menu").css("display", "flex");
}

function addToMenu() {
    event.preventDefault();
    let nombre = $("#nombreplato").val();
    let precio = $("#precioplato").val();

    if (nombre !== "" && precio !== "") {
        $("#scrollable").append(`
        <p id="plato${counter}">${nombre} - ${precio} <button class="btn btn-danger" id="btn_${counter}" onclick="deletePlato()"> borrar</button></p>  
    `);
        let plate = {
            nombre: nombre,
            precio: precio
        };
        menuPlates.push(plate);
        $("#nombreplato").val("");
        $("#precioplato").val("");
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
}

function siguienteAConfirmar() {
    $("#menu").css("display", "none");
    $("#confirmRestaurant").css("display", "flex");
    let nombreRes = $("#nombreRes").val();
    let direccionRes = $("#direccionRes").val();
    let horarioRes = $("#horarioRes").val();
    let telefonoRes = $("#telefonoRes").val();
    let webRes = $("#webRes").val();
    let tipoRes = $('#tipoRes').find(":selected").text();
    let tipoValue = $('#tipoRes').find(":selected").val();
    let restaurant = {
        nombre: nombreRes,
        direccion: direccionRes,
        horario: horarioRes,
        telefono: telefonoRes,
        web: webRes,
        tipo: tipoValue,
        menu: menuPlates

    };

    currentRestaurant = restaurant;
    console.log(restaurant);

    $("#currentCreation").empty();

    $("#currentCreation").append(`
    <h3>Información General</h3>
        <p>
            Nombre : ${nombreRes} <br/>
            Dirección : ${horarioRes} <br/>
            Horario : ${horarioRes} <br/>
            Telefono : ${telefonoRes} <br/>
            Web : ${webRes} <br/>
            Tipo : ${tipoRes}
        </p>
    <h3>Platos Disponibles</h3>
    <p>
    `);

    menuPlates.forEach(plate => {
        $("#currentCreation").append(`
            ${plate.nombre} - ${plate.precio}
        `);
    });
    $("#currentCreation").append(`</p>`);
}

function atrasAMenu() {
    $("#menu").css("display", "flex");
    $("#confirmRestaurant").css("display", "none");
}

function confirm() {
    $.ajax({
            type: "POST",
            url: "/restaurante",
            data: currentRestaurant,
            dataType: "application/json"
        })
        .done(response => {
            alert("success");
        })
        .fail(response => {
            console.log(response);
        });
}