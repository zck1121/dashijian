//每次调用$.get().....的时候就会先调用ajaxPrefilter这个函数
//在函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options){
  options.url = 'http://www.liulongbin.top:3007' + options.url
  console.log(options.url);


  if(options.url.indexOf('/my/') !== -1){
    options.headers ={
      Authorization: localStorage.getItem("token") || ""
    }
  }
  
  //全局统一挂载 complete 回调函数
  options.complete = function(res){
    if(res.responseJSON.status === 1 &&  res.responseJSON.message === '身份认证失败！'){
      //强制清空 token
      localStorage.removeItem('token')
      //强制跳转到登录页面
      location.href = '/login.html'
    }
  }



  
})


