assignChecks();

let total = 0;
let idsPedidos = [];

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' :
        decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function assignChecks() {
    $(".form-check-input").on("click", element => {
        addToMenu(element.target);
    });
}

function addToMenu(element) {
    let precioconeur = element.value.split("-")[1] + "";
    let checked = element.checked;
    let idPlato = Number(element.id.replace("check", ""));

    if (checked === true) {
        total += Number(precioconeur.substring(0, precioconeur.length - 1));

        $("#contenidoPedido").append(
            `<p class="pPedido" id="sel${element.id}">${element.value} </p>`
        );
        $("#totalPedido").text(`Total :${total} €`);
        idsPedidos.push(idPlato);
    } else {
        total -= Number(precioconeur.substring(0, precioconeur.length - 1));
        $("#totalPedido").text(`Total :${total} €`);
        $(`#sel${element.id}`).remove();
        let index = idsPedidos.indexOf(idPlato);
        idsPedidos.splice(index, 1);
    }
    console.log(idsPedidos);
}

function hacerPedido() {
    if (idsPedidos.length > 0) {
        let pedido = {
            idRes: $("#hidden").text(),
            idsPlatos: idsPedidos,
            hora: new Date()
        };

        $.ajax({
                type: "POST",
                url: "/p/pedido",
                data: pedido
            })
            .done(response => {
                document.getElementById("misPedidos").click();
            })
            .fail(response => {
                console.log(response);
            });
    } else {
        $("#alertDiv").css("display", "block");
        $("#alertDiv").text("Por favor, seleccione al menos un plato");
    }
}