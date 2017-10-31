//图片轮播:加效果 淡入
    //<div id="slider">
      //<img   class="active"  src="Images/index/banner_02.jpg">
      //<img src="Images/index/banner_01.jpg">
      //<img src="Images/index/banner_03.jpg">
      //<img src="Images/index/banner_04.jpg">
      //<img src="Images/index/banner_05.jpg">
      //<ul>
        //<li class="active">1</li>
        //<li>2</li>
        //<li>3</li>
        //<li>4</li>
        //<li>5</li>
      //</ul>
    //</div> 17:33-17:43
//1:添加事件页面加载成功后执行;
window.onload = function(){
//2:获取所有图片列表
  var aImg = document.querySelectorAll("#slider>img");
//3:获取所有页码列表
  var aNum = document.querySelectorAll("#slider li");
//4:创建二个定时器变量 timer(淡入) play(切换)
  var timer = play = null;
//5:创建二个变量保存(下标) i  index
//  初始值0
  var i = index = 0;
//6:创建核心函数切换图片
//              切换数字
//              淡入 show(a) a 下标
  function show(a){
    //6.1:将参数中a值保存index变量中
    index = a;
    //6.2:创建变量保存透明度 alpha = 0
    var alpha = 0;
    //6.3:清除所有页码class
    for(i=0;i<aNum.length;i++){
       aNum[i].className = "";
    }
    //6.4:当前index下标页码添加class
    //    active
    aNum[index].className = "active";
    //000:提前清除淡入效果定时器
    clearInterval(timer);
    //6.5:将所有图片透明度 = 0
    for(i=0;i<aImg.length;i++){
        aImg[i].style.opacity = 0;
        aImg[i].style.filter = "alpha(opacity=0)";
    }
    //6.6:启动定时器(淡入效果)
    timer = setInterval(function(){
      //6.7:alpha += 2;  IE 0-100
      //                    0-1
      alpha += 2;
      //6.8:alpha > 100 定时器0.0  0.02 0.04 0.06 1
      alpha > 100 && (alpha = 100);
      //6.9:给index图片元素修改透明 alpha     
      aImg[index].style.opacity = alpha/100;
      aImg[index].style.filter = "alpha(opacity="+alpha+")";
      alpha==100&&clearInterval(timer);
    },20);

     
  }//show end

  //show(1);

  //自动启动轮播
  autoPlay();
  function autoPlay(){
     play = setInterval(function(){
       index++;
       index >= aImg.length && (index=0);
       show(index)
     },2000);
  }

}