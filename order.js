const pool = require('./pool');

module.exports = {
    //GET /order/list?uid=5
    //GET /order/list/5
    list: (req, res)=>{
        //接收客户端提交的uid
        var uid = req.query.uid;
        //查询出该用户所有的订单
        pool.getConnection((err, conn)=>{
            conn.query("SELECT * FROM jd_order WHERE userId=?",[uid],(err, orderList)=>{
                //此时orderList是：[{}...{}]，其中缺少每个订单对应的商品信息
                //循环遍历每个订单，根据此订单编号查询其对应的商品信息
                var progress = 0; //已经完成的异步查询数量
                for(let order of orderList){
                    //order['productList'] = [];
                    //根据订单编号查询产品列表——23个订单就是23个异步查询——必须等待所有的查询全部完成才能向客户端输出订单列表
                    conn.query("SELECT * FROM jd_product WHERE pid IN (SELECT productId FROM jd_order_detail WHERE orderId=?)",[order.oid],(err,plist)=>{
                        order['productList'] = plist;
                        progress++;
                        if(progress===orderList.length){
                            res.json(orderList);
                            conn.release();
                        }
                    })
                }
                //res.json(orderList);
            });
        })
    },

    //GET /order/buystat?uid=5
    buystat: (req, res)=>{
        //读取用户编号
        //向客户端输出统计数据
        var data = [
            {label: '6月', value: 3500},
            {label: '7月', value: 2500},
            {label: '8月', value: 5000},
            {label: '9月', value: 4000},
            {label: '10月', value: 500},
            {label: '11月', value: 5500},
            {label: '12月', value: 7000},
            {label: '1月', value: 3000},
            {label: '2月', value: 4000},
            {label: '3月', value: 5000},
            {label: '4月', value: 3800},
            {label: '5月', value: 4300}
        ];
        res.json(data);
    }
};