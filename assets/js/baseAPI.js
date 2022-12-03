// 注意每次调用$.get $.ajax $.post 会先调用下面这个函数
// 在这个函数中 可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    console.log(options.url);
    // 在发起真正的ajax请求之前，统一拼接请求字符串
    options.url = 'http://www.liulongbin.top:3007' + options.url;
})