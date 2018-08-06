/**
 * Created by 12934 on 2018/8/6.
 */
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const md5 = require('md5');
const ejs = require('ejs');
global.mysql = require('mysql');
const session = require('express-session');
const path = require('path');
const svgCaptcha = require('svg-captcha');
const cookieParser = require('cookie-parser');

//创建一个web服务
const server = express();
//设置模板引擎
server.engine('html',ejs.renderFile);
server.set('view engine','html');
server.set('views','view');
//数据库连接
global.mydb = mysql.createConnection({
    host:'localhost',
    password:'root',
    user:'root',
    port:3306,
    database: 'only'
});
mydb.connect();
//启用cookie parser，并设置签名密钥
let cookiesigned = 'sign';
server.use(cookieParser(cookiesigned));

//启用session相关的中间件
server.use(session({
    secret: cookiesigned,
    name: 'sessid',
    resave: true, //每次发起请求的时候，有效时间要不要重新及时
    saveUninitialized: false,
    cookie: {maxAge: 1800 * 1000}
}));
//接收post过来的所有的数据
server.use(bodyParser.urlencoded({
    extended: true
}));

//各种路由设置


//后端写在这里    start*************************************************
//实现管理员登录：引用的模块文件后面要有小括号   路径第一个字符 是  /
// server.use('/admin/login', require('./module/admin/login')());



//后端 end****************************************************



//前端 start********************************
server.get('/',(req,res) => {
    res.render('html/index');
});





//前端  end********************




//静态资源托管
server.use(express.static('view'));

//404处理：样式自定义
server.use((req ,res)=>{
    res.send('你访问的路径不存在');
});

//监听端口
server.listen(81);



