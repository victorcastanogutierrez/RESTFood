$(document).ready(function () {
    var busqueda = getUrlParameter('busqueda');
    var param = getUrlParameter('param');

    if (busqueda && param) {
        const value = $("#busquedaForm .dropdown-menu a[data-pdsa-dropdown-val='"+param+"']").html();
        $("#btBusqueda").html(value);
        $("#busquedaValue").val(busqueda);
        $("#busquedaParam").val(param);
    }

    $(".dropdown-menu a:not(.busquedaTodos)").on("click", function () {
        const selectedValue = $(this).data('pdsa-dropdown-val');
        const selectedText = $(this).html();
        $("#btBusqueda").html(selectedText);
        $("#busquedaParam").val(selectedValue);
    });

    //Por defecto búsqueda por nombre
    $(".dropdown-menu a[data-pdsa-dropdown-val='nombre'").click();
});