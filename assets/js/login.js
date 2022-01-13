$(function() {
  //点击‘去注册账号链接’
  $("#link-reg").on("click", function() {
    $(".login-box").hide();
    $(".reg-box").show();
  });

  //点击‘去登录’链接
  $("#link-login").on("click", function() {
    $(".login-box").show();
    $(".reg-box").hide();
  });

  var form = layui.form;
  var layer = layui.layer;

  //表单验证
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    //校验两次密码
    repwd: function(value) {
      var pwd = $('.reg-box [name="password"]').val();
      if (pwd !== value) {
        return "两次密码输入不一致！";
      }
    }
  });

  //监听注册表单的提交事件
  $("#form_reg").on("submit", function(e) {
    e.preventDefault();
    var data = {
      username: $("#form_reg [name=username]").val(),
      password: $("#form_reg [name=password]").val()
    };
    $.post("/api/reguser", data, function(res) {
      if (res.status !== 0) {
        return layer.msg(res.message);
      }
      layer.msg("注册成功，请登录！");
      $("#link-login").click();
    });
  });


  //监听登录表单提交事件
  $('#form_login').submit(function(e){
    e.preventDefault()
    $.ajax({
      url:'/api/login',
      method:'POST',
      //快速获取表单数据
      data:$(this).serialize(),
      success:function(res){
        if(res.status !== 0){
          return layer.msg(res.message);
        }
        layer.msg("登录成功!");
        //将登录成功得到的token字符串，保存到localStorage中
        localStorage.setItem('token',res.token)
        //跳转页面
        location.href= '/index.html'
        
      }
    })
  })
});
