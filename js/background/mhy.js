const instance = axios.create({
    baseURL: 'https://api-takumi.mihoyo.com',
    timeout: 5000,
    headers: { 'X-Custom-Header': 'foobar' }
});
// const { DS } = require('./mihoyo.vendors');

const mihoyoUserAgent = 'Mozilla/5.0 (Linux; Android 5.1.1; V1824A Build/LMY48Z; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/52.0.2743.100 Mobile Safari/537.36 miHoYoBBS/2.1.0';

// chrome.cookies.getAll({
//     domain: 'bbs.mihoyo.com',
// }, function (cookies) {
//     const cookie = [...cookies].pop();
//     console.log(cookie.value);
// });

chrome.webRequest.onBeforeSendHeaders.addListener(
    function (info) {
        // Replace the User-Agent header
        let headers = info.requestHeaders;
        headers.forEach(function (header) {
            if (header.name.toLowerCase() === 'user-agent') {
                header.value = mihoyoUserAgent;
            }
        });

        [
            { name: 'x-rpc-device_id', value: '3d098381-4cb2-3ab3-8648-6b67fae353a8' },
            {
                name: 'Referer',
                value: 'https://webstatic.mihoyo.com/bbs/event/signin-ys/index.html?bbs_auth_required=true&act_id=e202009291139501&utm_source=bbs&utm_medium=mys&utm_campaign=icon'
            },
            { name: 'X-Requested-With', value: 'com.mihoyo.hyperion', },
            { name: 'DS', value: DS, },
            { name: "x-rpc-client_type", value: "5" },
            { name: "x-rpc-app_version", value: "2.1.0" },


        ].forEach(function (item) {
            headers.push(item);
        });
        console.log(headers);
        return {
            requestHeaders: headers,

        };
    },
    // Request filter
    {
        // Modify the headers for these pages
        urls: [
            "https://api-takumi.mihoyo.com/*",
            "https://api-takum222i.mihoyo.com/*",
        ],
        // In the main window and frames
        types: [
            "xmlhttprequest",
        ]
    },
    ["blocking", "requestHeaders"]
);

async function handleSign () {
    const { data } = await instance({
        method: 'get',
        // url: '/event/bbs_toolbox/getInfo?game_biz=ys_cn',
        url: '/apihub/api/home/new?cpu=placeholder&device=OnePlus%206T&gids=2',
    });
    if (!data) {
        console.log('获取info接口凉凉');
        return;
    }
    // const { app_path: href } = data.data.page_data[0].pages.find(function (x) {
    const { app_path: href } = data.data.navigator.find(function (x) {
        return x.name === '签到福利' || +x.id === 44;
    });
    const act_id = href.split('?').pop().split('&').find(function (x) {
        return x.indexOf('act_id') >= 0
    }).split('=').pop();
    const { data: bindData } = await instance({
        method: 'get',
        url: '/binding/api/getUserGameRolesByCookie?game_biz=hk4e_cn',
    });
    if (!bindData) {
        console.log('要登录');
        return;
    }
    const { region, game_uid } = [...bindData.data.list].pop() || {};
    // const { data: signStatusContext } = await instance({
    //     method: 'get',
    //     url: '/event/bbs_sign_reward/info',
    //     // url: '/event/bbs_sign_reward/sign',
    //     withCredentials: true,
    //     params: {
    //         "act_id": act_id,
    //         "region": region,
    //         "uid": game_uid
    //     }
    // });

    const { data: signStatusContext } = await instance({
        method: 'post',
        // url: '/event/bbs_sign_reward/info',
        url: '/event/bbs_sign_reward/sign',
        withCredentials: true,
        data: {
            "act_id": act_id,
            "region": region,
            "uid": game_uid
        }
    });

    console.log(signStatusContext.data);
    return !!signStatusContext.data;
}

chrome.alarms.onAlarm.addListener(async function (alarm) {
    if (alarm.name === 'interval-question') {
        console.log('定时任务执行中！');
        const isOk = await handleSign();
        if (isOk) {
            chrome.notifications.create('sign-status', {
                message: '原神',
                title: '今日签到成功',
                type: "basic",
                iconUrl: '/resources/images/logo.png',
            });
        }
    }
});

const time = moment(moment(Date.now()).format('YYYY/MM/DD')).add(-1, 'd').add(4, 'h').format('x');
chrome.alarms.create('interval-question', {
    when: +time,
    periodInMinutes: 24 * 60
});
