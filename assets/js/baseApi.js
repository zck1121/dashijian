//每次调用$.get().....的时候就会先调用ajaxPrefilter这个函数
//在函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options){
  options.url = 'http://www.liulongbin.top:3007' + options.url
  console.log(options.url);
  
})