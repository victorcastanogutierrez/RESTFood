let ids = Number($('#platos tr').length);

function addNuevoPlato() {

    let iNombre = $(`#newPlatoName`);
    let iPrecio = $(`#newPlatoPrecio`);
    if (iNombre.val() === "" && iPrecio.val() === "") return;
    let newId = ids;
    ids++;


    $("#platos").append(`<tr id="plato${newId}">
    <td><input id="nombre${newId}" class="form-control" type="text" value="${iNombre.val()}"> </td>
    <td><input min="0" id="precio${newId}" class="form-control" type="number" value="${iPrecio.val()}"></td>
    <td> <input class="form-check-input" type="checkbox" id="check${newId}"> </td>
    <td><button id="delete${newId}" onclick="deletePlato()" class="btn btn-danger">Borrar</button></td>
    </tr>`)
    iNombre.val("");
    iPrecio.val("");

}

function deletePlato() {

    let id = event.target.id.replace("delete", "");
    $(`#plato${id}`).remove();

}

function modifyMenu() {

    let newMenu = [];

    $('#platos  tr').each((index) => {

        let row = $(`#platos tr:eq(${index})`)[0];
        let rowId = row.id.replace("plato", "");

        newMenu.push({
            nombre: $(`#nombre${rowId}`).val(),
            precio: Number($(`#precio${rowId}`).val()),
            id: index,
            oferta: $(`#check${rowId}`)[0].checked

        });
    })
    postMenu(newMenu);

}

function postMenu(menu) {

    let restaurant = {
        id: $(`#hidden`).text(),
        menu: menu
    }

    $.ajax({
            type: "POST",
            url: "/p/modifyrestaurant",
            data: restaurant
        })
        .done(response => {
            document.getElementById("misRestaurantes").click();
        })
        .fail(response => {

        });

}