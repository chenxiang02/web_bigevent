// 注意每次调用$.get $.ajax $.post 会先调用下面这个函数
// 在这个函数中 可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    console.log(options.url);
    // 在发起真正的ajax请求之前，统一拼接请求字符串
    options.url = 'http://www.liulongbin.top:3007' + options.url;


    // 统一为有权限的接口 设置header请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    options.complete = function (res) {
        console.log(res.responseJSON.status);
        console.log(res.responseJSON.message);

        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token');
            location.href = 'login.html'
        }

    }
})