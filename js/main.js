/*
 * 自己的JS脚步
 * @Author: iceStone
 * @Date:   2015-12-12 10:59:26
 * @Last Modified by:   iceStone
 * @Last Modified time: 2015-12-13 15:19:19
 */

'use strict';

$(function() {
  // 当文档加载完成才会执行
  /**
   * 根据屏幕宽度的变化决定轮播图片应该展示什么
   * @return {[type]} [description]
   */
  function resize() {
    // 获取屏幕宽度
    var windowWidth = $(window).width();
    // 判断屏幕属于大还是小
    var isSmallScreen = windowWidth < 768;
    // 根据大小为界面上的每一张轮播图设置背景
    // $('#main_ad > .carousel-inner > .item') // 获取到的是一个DOM数组（多个元素）
    $('#main_ad > .carousel-inner > .item').each(function(i, item) {
      // 因为拿到是DOM对象 需要转换
      var $item = $(item);
      // var imgSrc = $item.data(isSmallScreen ? 'image-xs' : 'image-lg');
      var imgSrc =
        isSmallScreen ? $item.data('image-xs') : $item.data('image-lg');

      // jQuery方式
      // $element.data()
      // 是一个函数 ，专门用于取元素上的自定义属性（data-abc）
      // 函数的参数是我们要取得属性名称（abc）
      //
      // $element.attr('data-abc')
      //
      // JS中的写法
      // element.dataset['abc']
      //
      // element.getAttribute('data-abc')
      // element.setAttribute('data-abc','')

      // 设置背景图片
      $item.css('backgroundImage', 'url("' + imgSrc + '")');
      //
      // 因为我们需要小图时 尺寸等比例变化，所以小图时我们使用img方式
      if (isSmallScreen) {
        $item.html('<img src="' + imgSrc + '" alt="" />');
      } else {
        $item.empty();
      }
    });
  }
  // $(window).on('resize', resize);
  // // 让window对象立即触发一下resize
  // $(window).trigger('resize');

  $(window).on('resize', resize).trigger('resize');
   // 初始化tooltips插件
   $('[data-toggle="tooltip"]').tooltip();

   // 控制标签页的标签容器宽度
   var $ulContainer = $('.nav-tabs');
   var width = 30;
   // console.log( $ulContainer.children());
   $ulContainer.children().each(function(index,element){
   	console.log(element.clientWidth);
   	width += element.clientWidth;
   });
   $ulContainer.css('width',width);

   // 新闻点击时呈现不同的大标题
   var $newsTitle = $('.news-title');
   $('#news .nav-pills a').on('click',function(){
   var $this = $(this);
   var title = $this.data('title');
   
   $newsTitle.text(title);
   });
   
   // 1、获取手指在轮播图元素上的滑动方向（左右）
   var $carousels = $('.carousel'); 
   var startX,endX;
   var offset = 50;
   $carousels.on('touchstart',function(e){
   	    startX = e.originalEvent.touches[0].clientX;
   });
   $carousels.on('touchmove',function(e){
   	    endX = e.originalEvent.touches[0].clientX;
   });
    $carousels.on('touchend',function(e){
        // console.log((startX>endX)?'←':'→');
         // 2、根据获得的方向选择上一张或者下一张
    var chazhi = Math.abs(startX-endX);
    if(chazhi > offset){
    	// 用this预防有的多个轮播图时滑动这个影响下一个
        $(this).carousel(startX>endX?'next':'prev');
    }
   });
  
});
 