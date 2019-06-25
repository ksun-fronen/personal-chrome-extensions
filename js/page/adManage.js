
// 简单应对跳转的方式

if (window.location.href.indexOf('/misc/adpage') >= 0) {
    var hrefList = window.location.href.split('?');

    hrefList.splice(0, 1);

    window.location.replace(hrefList.join('?'));
}

