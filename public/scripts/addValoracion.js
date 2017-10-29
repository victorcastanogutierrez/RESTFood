$(document).ready(function () {
    $( ".addValoracion" ).click(function() {
        const valId = $(this).closest('tr').find("input").val();
        $("#pedidoId").val(valId);
    });
});