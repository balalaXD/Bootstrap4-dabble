function modalHandler() {
    $btnLogin = $('#loginToggle');
    $btnReserve = $('#reserveToggle');

    $btnLogin.on('click', function () {
        $("#loginModal").modal({
            show: true
        });
    });

    $btnReserve.on('click', function () {
        $("#reserveModal").modal({
            show: true
        });
    });
};

$(function () {
    $('.carousel').carousel({
        interval: 2000
    });
    $('#carouselAnimate').on('click', function () {
        animating = $('#carouselAnimate').children('span').hasClass("fa-pause");
        if (animating) {
            $('.carousel').carousel('pause');
            $('#carouselAnimate').children('span').removeClass("fa-pause").addClass("fa-play");
        } else {
            $('.carousel').carousel('cycle');
            $('#carouselAnimate').children('span').removeClass("fa-play").addClass("fa-pause");
        }
    });
    modalHandler();
});