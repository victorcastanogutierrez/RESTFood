assignChecks();


function assignChecks() {
    $(".form-check-input").on("click", element => {
        addToMenu(element.target);
    });
}

function addToMenu(element) {
    if (element.checked) {
        $("#contenidoPedido").append(` <p class="pPedido" id="${element.value}">${element.value} </p>`);
    } else {
        $(`#${element.value}`).remove();
    }
}


function goToMakeMenu() {
    event.preventDefault();
    $('#infoGeneral').css("display", "none");
    $('#menu').css("display", "flex");
}

function addToMenu() {
    event.preventDefault();
    let nombre = $('#nombreplato').val();
    let precio = $('#precioplato').val();
    $("#scrollable").append(`
        <p>${nombre} - ${precio}</p>
    `);
    $('#nombreplato').val("");
    $('#precioplato').val("");
}