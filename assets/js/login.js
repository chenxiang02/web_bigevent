$(function () {
    // 点击去注册账号的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    // 点击 去登录 的链接
    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    })

    // 从layui中获取form对象
    var form = layui.form
    // 通过form.verify()函数自定义效验规则
    form.verify({
        // 自定义一个叫做pwd效验规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 效验密码是否一致
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中内容
            // 还需要拿到密码框内容再进行等号判断 失败则返回提示
            var pwd = $('.reg-box [name=password]').val()

            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    });

    // 监听注册表单提交事件
    var layer = layui.layer;
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.post('/api/reguser', { username: $('#form_reg input[name=username]').val(), password: $('#form_reg input[name=password]').val() }, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg(res.message)
            $('#link_login').click()

        })
    })

    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.post('/api/login', { username: $('#form_login input[name=username]').val(), password: $('#form_login input[name=password]').val() }, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg(res.message)
            // 将登录成功得到的token字符串 保存到localstorage中
            localStorage.setItem('token', res.token)
            console.log(res.token)
            location.href = 'index.html'
        })
    })
})