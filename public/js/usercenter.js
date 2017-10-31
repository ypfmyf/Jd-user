/**功能点1： 异步请求页头和页尾**/
$('#header').load('header.html', function(){
    //页头内容已经异步加载完成
    $('#welcome').html('欢迎回来：'+sessionStorage['loginUname']);
});
$('#footer').load('footer.html');


/**功能点2：点击附加导航，切换中央部分的主体内容**/
$('.affix').on('click', 'li a', function(e){
    e.preventDefault();
    //切换a的父元素的active
    $(this).parent().addClass('active').siblings('.active').removeClass('active');
    //根据a的href切换中央的div的active
    var divId = $(this).attr('href');
    $(divId).addClass('active').siblings('.active').removeClass('active');
});

/**功能点3：异步请求当前用户的订单列表**/
$.ajax({
    type: 'GET',
    url: '/order/list',
    data: {uid:sessionStorage['loginUid']},
    success: function(orderList){
        console.log(orderList);
        //遍历整个订单列表，向TABLE中拼接HTML片段
        var html='';
        for(var i=0; i<orderList.length; i++){
            var order = orderList[i];
            html+=`
        <tr>
          <td colspan="6">订单编号：${order.oid}</td>
        </tr>
        <tr>
          <td>
            `;
            for(var j=0; j<order.productList.length; j++){
                var p = order.productList[j];
                html+=`
                <a href="#" title="${p.pname}"><img src="${p.pic}" style="width:60px"></a>
                `;
            }
            html += `
          </td>
          <td>${order.rcvName}</td>
          <td>￥${order.price}<br>${order.payment===1?'货到付款':(order.payment===2?'在线支付':'京东白条')}</td>
          <td>${new Date(order.orderTime).toLocaleString()}</td>
          <td>${order.status}</td>
          <td>
            <a href="#">查看</a><br/>
            <a href="#">评价</a>
          </td>
        </tr>
      `;
        }
        $('#table-order tbody').html(html);
    }
})

/**功能点4：异步请求消费统计数据，绘制Canvas统计图**/

/**功能点5：异步请求消费统计数据，绘制SVG统计图**/
$.ajax({
    type: 'GET',
    url: '/order/buystat',
    data: {uid: sessionStorage['loginUid']},
    success: function(list){
        console.log(list);//异步请求到了消费统计数据
        //创建一个图表对象
        var c = new FusionCharts({
            type: 'doughnut3d',//'doughnut2d',//'pie3d',//'pie2d',//'line',//'bar3d',//'bar2d',//'column3d',//'column2d',
            renderAt: 'buy-stat-svg',
            width: 800,
            height: 500,
            dataSource: {
                data: list    //[{label:x, value:x}]
            }
        });
        //渲染出来
        c.render();
    }
})



