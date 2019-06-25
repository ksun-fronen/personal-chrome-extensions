
$(function () {
    var KEY_CODE_LEFT = window.KEY_CODE_LEFT;
    var KEY_CODE_RIGHT = window.KEY_CODE_RIGHT;

    if (window.location.href.indexOf('/search.php') >= 0) {
        $(window).on('keydown', function (e) {
            var $current = $(".column-order-menu").find('.current');
            var href = '';

            if (e.keyCode === KEY_CODE_LEFT) {
                href = $current.prev().children().attr('href');
            } else if (e.keyCode === KEY_CODE_RIGHT) {
                href = $current.next().children().attr('href');
            } else {
                return;
            }

            window.location.href = href;
        });
    }
});