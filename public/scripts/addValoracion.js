$(document).ready(function () {
    $( ".addValoracion" ).click(function() {
        const valId = $(this).closest('tr').find("input").val();
        $("#pedidoId").val(valId);
    });

    $( ".repitePedidoBt" ).click(function() {
        const valId = $(this).closest('tr').find("input").val();
        console.log(valId);
        $("#repetirPedidoId").val(valId);
    });

    const notaDefault = 2;
    $star_rating.siblings('input.rating-value').val(notaDefault);
    $("#valoracionNum").val(notaDefault); // Por defecto
    SetRatingStar();
});

var $star_rating = $('.star-rating .fa');

var SetRatingStar = function() {
    return $star_rating.each(function() {
        if (parseInt($star_rating.siblings('input.rating-value').val()) >= parseInt($(this).data('rating'))) {
            return $(this).removeClass('fa-star-o').addClass('fa-star');
        } else {
            return $(this).removeClass('fa-star').addClass('fa-star-o');
        }
    });
};

$star_rating.on('click', function() {
    $star_rating.siblings('input.rating-value').val($(this).data('rating'));
    $("#valoracionNum").val($(this).data('rating'));
    return SetRatingStar();
});

SetRatingStar();