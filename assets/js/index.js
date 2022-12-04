$(function () {
    // 调用getuserinfo 函数
    getUserInfo()

    $('#btnLoginout').on('click', function () {
        layer.confirm('是否确认退出?', { icon: 3, title: '提示' },
            function (index) {
                //do something
                //1.清空本地储存中的token
                localStorage.removeItem('token');
                // 2.重新跳转回登录页面
                location.href = 'login.html';

                // 这是关闭confirm询问框
                layer.close(index);
            });

    })
})
// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        methods: 'GET',
        url: '/my/userinfo',

        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 调用renderAvatar 渲染用户头像
            renderAvatar(res.data);

        },


        // 注意ajax中有三个回调函数 其中success是成功 error是失败 complete是无论失败还是成功都行
        // complete: function (res) {
        // console.log(res.responseJSON);
        // if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败') {
        //     // 强制清空token
        //     localStorage.removeItem('token')
        //     // 强制退出登录
        //     location.href = 'login.html'
        // }



        // }



    })
}

// 渲染用户头像
function renderAvatar(user) {
    // 获取用户的名称
    var name = user.nickname || user.username
    // 设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    //  按需渲染用户的头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}