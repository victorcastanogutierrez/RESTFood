var mensaje = getUrlParameter('mensaje');
var tipoMensaje = getUrlParameter('tipoMensaje');

if ( mensaje != ""){
    if (tipoMensaje == "" ){
        tipoMensaje = 'alert-info';
    }
    $( ".infoContainer" ).append("<div class='alert "+tipoMensaje+"'>"+mensaje+" </div>");
}