assignChecks();

let total = 0;
let idsPedidos = [];

function assignChecks() {
    $(".form-check-input").on("click", element => {
        addToMenu(element.target);
    });
}


function addToMenu(element) {


    console.log(element.checked);
    let precioconeur = element.value.split("-")[1] + "";
    let checked = element.checked;
    let idPlato = element.id.replace("check", "");
    console.log(idPlato);

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
        console.log(`#sel${element.id}`);
        $(`#sel${element.id}`).remove();
        let index = idsPedidos.findIndex(idPlato);
        idsPedidos.splice(index, 1);
    }
}

function hacerPedido() {

    let pedido = {

        idRes = $("#hidden").text(),
        idsPlatos = idsPedidos,
    }

    $.ajax({
            type: "POST",
            url: "/p/pedido",
            data: pedido,
            dataType: "application/json"
        })
        .done(response => {
            console.log("BIEN")
        })
        .fail(response => {
            console.log(response);
        });


}