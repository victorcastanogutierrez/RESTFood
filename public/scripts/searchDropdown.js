$(document).ready(function () {
    var busqueda = getUrlParameter('busqueda');
    var param = getUrlParameter('param');
    var nombreAv = getUrlParameter('nombreAvanzada');
    var webAv = getUrlParameter('webAvanzada');

    if (busqueda && param) {
        const value = $("#busquedaForm .dropdown-menu a[data-pdsa-dropdown-val='"+param+"']").html();
        $("#btBusqueda").html(value);
        $("#busquedaValue").val(busqueda);
        $("#busquedaParam").val(param);
    }

    if (nombreAv && webAv) {
        $("#nombreAv").val(nombreAv);
        $("#webAv").val(webAv);
        document.getElementById("linkAv").click();
    }

    $(".dropdown-menu a:not(.busquedaTodos)").on("click", function () {
        const selectedValue = $(this).data('pdsa-dropdown-val');
        const selectedText = $(this).html();
        $("#btBusqueda").html(selectedText);
        $("#busquedaParam").val(selectedValue);
        $("#helpText").html(getHelpText(selectedValue));

    });

    //Por defecto búsqueda por nombre
    $(".dropdown-menu a[data-pdsa-dropdown-val='nombre'").click();
});

function getHelpText(param) {
    switch (param) {
        case 'nombre':
            return "Por ejemplo: Go Sushi";
        case 'direccion':
            return "Por ejemplo: Calle Asturias 8"
        case 'web':
            return "Por ejemplo: www.donmiguel.es"
    }
}