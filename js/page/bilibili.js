
$(function () {
    var KEY_CODE_LEFT = window.KEY_CODE_LEFT ;
    var KEY_CODE_RIGHT = window.KEY_CODE_RIGHT;

    $("#home_popularize,#bili_live").hide();
    $(".nav-list > div").filter(function (n, element) {
        var $element = $(element);
        $element.text().indexOf('直播') >= 0 && $element.hide();
    });

    if (window.location.href.indexOf('v/anime/serial/') >= 0 ||
        window.location.href.indexOf('v/anime/finish/') >= 0) {
        $(window).on('keydown', function (e) {
            var $pagerList = $(".pager.pagination");

            if (e.keyCode === KEY_CODE_LEFT) {
                $pagerList
                    .find('.page-item.active')
                    .prev()
                    .children()
                    .trigger('click');
            } else if (e.keyCode === KEY_CODE_RIGHT) {
                $pagerList
                    .find('.page-item.active')
                    .next()
                    .children()
                    .trigger('click');
            }
        })
    }
});