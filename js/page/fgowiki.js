(() => {
    if (window.location.host.toLowerCase().indexOf('fgowiki.com') >= 0) {
        if (window.location.hash.indexOf('stay') >= 0) {
            console && console.log('你选择了停留在旧页面上');
            $("a").each((index, elem) => {
                $(elem).attr('href', `${$(elem).attr('href')}#stay`);
            });
        } else {
            // js 伪302
            window.location.replace('https://fgo.umowang.com');
        }
    }
})();
