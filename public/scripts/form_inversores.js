function goToCompany() {

    $("#personal").css("display", "none");
    $("#company").css("display", "flex");
    changeStep("btnCompany", "btnPersonal", "btnLlamada", "btnCapital");
}

function askForCompletion() {
    $("#alertDiv").css("display", "block");
    $("#alertDiv").text("Rellena todos los campos,por favor");
}

function atrasAPersonal() {
    $("#personal").css("display", "block");
    $("#company").css("display", "none");
    changeStep("btnPersonal", "btnCompany", "btnLlamada", "btnCapital");

}

function inputNotNull(id) {
    return $(id).val() !== "";
}

function atrasACompany() {
    $("#capital").css("display", "none");
    $("#company").css("display", "flex");
    changeStep("btnCompany", "btnPersonal", "btnLlamada", "btnCapital");

}



function aCapital() {
    $("#capital").css("display", "flex");
    $("#company").css("display", "none");
    changeStep("btnCapital", "btnPersonal", "btnLlamada", "btnCompany");

}

function atrasACapital() {
    $("#capital").css("display", "flex");
    $("#llamada").css("display", "none");
    changeStep("btnCapital", "btnPersonal", "btnLlamada", "btnCompany");

}


function aLlamada() {
    $("#capital").css("display", "none");
    $("#llamada").css("display", "flex");
    changeStep("btnLlamada", "btnPersonal", "btnCompany", "btnCapital");
}

function confirmar() {
    alert("Gracias por contactar con nosotros");
    document.getElementById("pedir").click();

}

function changeStep(active, inative1, inative2, inative3) {

    activate(active);
    desactivate(inative1);
    desactivate(inative2);
    desactivate(inative3);
    $("#alertDiv").css("display", "none");

}

function activate(id) {
    $(`#${id}`).removeClass("btn-default");
    $(`#${id}`).addClass("btn-primary");
}

function desactivate(id) {
    $(`#${id}`).removeClass("btn-primary");
    $(`#${id}`).addClass("btn-default");
}