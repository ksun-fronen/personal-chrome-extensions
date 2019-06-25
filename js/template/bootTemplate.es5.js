"use strict";

window.BootTemplate = {
    mvItem: function mvItem(_ref) {
        var title = _ref.title;
        var url = _ref.url;

        return "\n<a href=\"" + url + "\" class='mv-item'>\n    <div class='mv-title'>\n        <div class=\"favicon\" title='" + title + "' style=\"background-image:url(https://s2.googleusercontent.com/s2/favicons?domain_url=" + url + "/&alt=s&sz=32)\"></div>\n        <span>" + title + "</span>\n</div>\n</a>\n";
    }
};

