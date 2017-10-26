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