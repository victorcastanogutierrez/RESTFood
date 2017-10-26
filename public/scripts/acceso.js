/**
 * Hace un swap entre las dos cards del HTML: login y registro
 */
function swapCards() {
    const template = $(".card, .d-none");
    const noTemplate = $(".card:not(.d-none)");
    template.removeClass("d-none");
    noTemplate.addClass("d-none");
}