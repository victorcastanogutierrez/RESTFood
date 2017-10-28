/**
 * Hace un swap entre las dos cards del HTML: login y registro
 */
function swapCards() {
    const template = $(".card, .d-none");
    const noTemplate = $(".card:not(.d-none)");
    template.removeClass("d-none");
    noTemplate.addClass("d-none");
}

/**
 * Por defecto muestra la card de registro, salvo que se indique lo contrario en la URL
 */
$(document).ready(function () {
    var login = getUrlParameter('login');
    if (login) {
        swapCards();
    }
});