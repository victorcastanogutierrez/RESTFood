function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : 
        decodeURIComponent(results[1].replace(/\+/g, ' '));
};

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
});