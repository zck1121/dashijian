$(function() {
  getUserInfo();
  var layer = layui.layer
  $("#btnLogout").on("click", function() {
    layer.confirm("确定退出登录?", { icon: 3, title: "提示" }, function(index) {

      //清空本地存储的token
      localStorage.removeItem('token')
      //重新跳转到 登录页面
      location.href = '/login.html'

      layer.close(index);
    });
  });
});

// 获取用户基本信息
function getUserInfo() {
  $.ajax({
    methed: "GET",
    url: "/my/userinfo",
    // headers: {
    //   Authorization: localStorage.getItem("token") || ""
    // },
    success: function(res) {
      // console.log(res);
      if (res.status !== 0) {
        return layui.layer.msg("获取用户失败！");
      }
      renderAvatar(res.data);
    },
    // complete:function(res){
    //   console.log(res);
      
    // }
  });
}

//获取用户头像 名称
function renderAvatar(user) {
  //先获取用户的名称
  var name = user.nickname || user.username;
  // var name = 'zck可乐'
  //设置欢迎的文本
  $("#welcome").html("欢迎&nbsp;&nbsp;" + name);

  //渲染用户的头像
  if (user.user_pic !== null) {
    $(".layui-nav-img")
      .attr("src", user.user_pic)
      .show();
    $(".test-avater").hide();
  } else {
    //渲染文本头像
    $(".layui-nav-img").hide();
    var first = name[0].toUpperCase();
    $(".test-avater")
      .html(first)
      .show();
  }
}
