$(function(){
 // 点击“去注册账号”的链接
 $('#link_reg').on('click', function() {
  $('.login-box').hide()
  $('.reg-box').show()
})

// 点击“去登录”的链接
$('#link_login').on('click', function() {
  $('.login-box').show()
  $('.reg-box').hide()
  
})

//从 layui中获取form 对象
var form = layui.form
var layer = layui.layer
  // 通过 form.verify() 函数自定义校验规则
form.verify({
    // 自定义了一个叫做 pwd 校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
      // 校验两次密码是否一致的规则
      repwd:function(value){
        var pwd = $('.reg-box [name=password]').val()
        if(pwd !== value){
          return "两次密码不一致！"
        }
      }
})


$('#form_reg').on('submit',function(e){
  e.preventDafault()
  var data ={
    username: $('#form_reg [name=username]').val(),
    password: $('#form_reg [name=password]').val()
  }
  $.post('http://www.liulongbin.top:3007/api/reguser',data,
  function(res){
  if(res.status !== 0){
    return console.log(res.message);
  }
  layer.msg('注册成功，请登录！')
  $('#link_login').click()
})
})








})