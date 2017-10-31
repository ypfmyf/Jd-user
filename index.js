/**
 *创建一个Web服务器，可以处理静态资源请求和动态资源请求
 */
const http = require('http');
const express = require('express');
const qs = require('querystring');
const user = require('./user');
const order = require('./order');

var app = express(); //请求处理函数
http.createServer(app).listen(8080);

/**处理静态资源请求**/
app.use(express.static('public'));
app.get('/', (req, res)=>{
    //请求重定向到另一个URL——相当于默认首页
    res.redirect('/register.html');
    res.redirect('/index.html');
    res.redirect('/login.html');
    res.redirect('/usercenter.html');

});

/**处理动态资源请求**/
//处理POST请求主体数据的中间件
app.use((req, res, next)=>{
    if(req.method==='POST'){
        req.on('data', (buf)=>{  //数据解析是异步的
            //把请求主体数据追加为req.body属性
            req.body = qs.parse(buf.toString());
            next(); //等待请求主体数据异步处理完成再调用后面的路由
        })
    }else { //除了POST请求之外的其它请求，如GET，直接放行
        next();
    }
});
app.post('/user/register', user.register);
app.post('/user/login', user.login);
app.get('/order/list', order.list);
app.get('/order/buystat', order.buystat);