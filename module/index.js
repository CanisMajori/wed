/**
 * Created by Cathy on 2018/8/6.
 */
module.exports = function(){
    //创建路由实例
    let router = express.Router();

    //渲染首页
    router.get('/',(req,res) => {
        res.render('html/index');
    });
    //渲染登录页面
    router.get('/login',(req,res)=>{
        res.render('html/login');
    });
    //渲染普通人员注册页面
    router.get('/reg1',(req,res) => {
        res.render('html/reg1');
    });

    //渲染服务人员注册页面
    router.get('/reg2',(req,res) => {
        res.render('html/reg2');
    });

    //渲染custom页面
    router.get('/custom',(req,res) => {
        res.render('html/custom');
    });

    //成功案例
    router.get('/successwork',(req,res)=>{
        if(!req.session.uid&&!req.session.sid){
            res.render('html/login');
        }
        let sql=`select * from win where 1`;
        mydb.query(sql,(err,result)=>{
            if(err){
                console.log(err);
            }else{
                // console.log(result);
                let n=result.length;
                res.render('html/successwork',{
                    win:result,
                    n:n,
                    header:req.session.header,
                });
            }
        });
    });

    //风俗页面返回首页按钮
    router.get('/shouye',(req,res)=>{
        if(req.session.uid){
            res.render('html/d_ope',{
                header:req.session.header
            });
        }else if(req.session.sid){
            res.render('html/shtml/s_ope',{
                header:req.session.header
            });
        }else if(!req.session.uid&&!req.session.sid){
            res.render('html/index');
        }
    });



    //退出登录
    router.get('/logOut',(req,res) => {
        // console.log(2);
        delete req.session.uid;
        delete req.session.sid;
        delete req.session.username;
        delete req.session.header;
        delete req.Cookie;
        res.redirect('/');
    });




    //注册模块start**************
    //普通用户注册按钮
    router.post('/reg1.do',(req,res)=>{
        let p = req.body;
        // console.log(p);
        if(!p.passwd1){
            res.json({r:'passwd_no'});
            return ;
        }
        let sql = `SELECT uid FROM user WHERE username = ? LIMIT 1`;
        mydb.query(sql, p.username, (err, result)=>{
            if(result.length){
                res.json({r:'username_existed'});
            }else{
                let sql = 'INSERT INTO user(username, password, tel, email, ip, regtime) VALUES (?,?,?,?,?,?)';
                mydb.query(sql, [p.username, md5(p.passwd1), p.tel, p.email, req.ip, new Date().toLocaleString()], (err, result)=>{
                    if(err){
                        console.log(err);
                        res.json({r:'db_err'});
                    }else{
                        res.json({r:'success'});
                    }
                });
            }
        });
    });
    //服务人员注册按钮
    router.post('/reg2.do',(req,res)=>{
        let p = req.body;
        // console.log(p);
        if(!p.passwd1){
            res.json({r:'passwd_no'});
            return ;
        }
        let sql = `SELECT sid FROM serverclass WHERE sname = ? LIMIT 1`;
        mydb.query(sql, p.sname, (err, result)=>{
            // console.log(result);
            if(result.length){
                res.json({r:'username_existed'});
            }else{
                let sql = 'INSERT INTO serverclass(sclass,sname, spassword, tel, email, ip, regtimes) VALUES (?,?,?,?,?,?,?)';
                mydb.query(sql, [p.sclass,p.sname, md5(p.passwd1), p.tel, p.email, req.ip, new Date().toLocaleString()], (err, result)=>{
                    if(err){
                        console.log(err);
                        res.json({r:'db_err'});
                    }else{
                        res.json({r:'success'});
                    }
                });
            }
        });
    });
    //*******end***************



    //登录模块start**********************************
    //验证需求型用户登录页面
    router.post('/dlogin',(req,res) => {
        //验证账号是否存在
        let d = req.body;
        let sql = `SELECT uid,username,password,header FROM user WHERE username = ? OR password = ? LIMIT 1`;
        mydb.query(sql,[d.dusername,d.dpassword],(err,result) => {
            //input标签里要写name属性,否则后台接收不到数据,result是查出来的数据库值
            // console.log(result);
            //判断用户是否存在
            if(!result.length){
                res.json({r:'dusername_not_exist'});
                return;
            }
            //验证密码是否正确
            if(md5(d.dpassword) != result[0].password){
                res.json({r:'dpassword_error'});
                return;
            }

            //登录成功之后将信息存入session
            req.session.uid = result[0].uid;
            req.session.username = result[0].username;
            req.session.header = result[0].header;
            // console.log(req.session);
            //success响应语句要写在session后面，否则session无法响应到客户端
            res.json({r:'success'});
        })
    });

    //验证服务型用户登录页面
    router.post('/slogin',(req,res) => {
        //验证账号是否存在
        let s = req.body;
        let sql = `SELECT * FROM serverclass WHERE sname = ? OR spassword = ? LIMIT 1`;
        mydb.query(sql,[s.susername,s.spassword],(err,result) => {
            // console.log(result);
            //判断用户是否存在
            if(!result.length){
                res.json({r:'susername_not_exist'});
                return;
            }
            //验证密码是否正确
            if(md5(s.spassword) != result[0].spassword){
                res.json({r:'spassword_error'});
                return;
            }

            req.session.sid = result[0].sid;
            req.session.username = result[0].sname;
            req.session.sclass = result[0].sclass;
            req.session.header = result[0].headpic;
            res.json({r:'success'});
        })
    });
    //end*****************************************

    //需求型用户登录成功
    router.get('/info1',(req,res)=>{
        if(!req.session.uid){
            res.redirect('/');
            return ;
        }
        res.render('html/d_ope',{
            header:req.session.header
        });
    });
    //渲染需求性用户的service
    router.get('/service',(req,res)=>{
        if(!req.session.username){
            res.render('html/login');
        }
        let sql=`select * from serverclass where status=0`;
        mydb.query(sql,(err,result)=>{
            if(err){
                console.log(err);
            }else{
                // console.log(result);
                res.render('html/service',{sclass:result,header:req.session.header});
            }
        });

    });
    //存起用户的心愿单
    router.post('/save',(req,res)=>{

        // console.log(req);
        let sql=`insert into xinyuandan(uid,sid) value(?,?)`;
        mydb.query(sql,[req.session.uid,req.body.sid],(err,result)=>{
            if(err){
                console.log(err);
            }else{
                // console.log('成功把'+req.body.sid+'加到'+req.session.uid+'中');
            }
        });
    });
    //服务型用户登录成功
    router.get('/info2',(req,res)=>{
        if(!req.session.sid){
            res.redirect('/');l
            return ;
        }
        res.render('html/shtml/s_ope',{
            header:req.session.header
        });
    });
    //渲染checkuser页面
    router.get('/checkuser',(req,res)=>{
        if(!req.session.sid){
            res.render('html/login');
        }

        let sql=`SELECT  u.username, u.tel, u.email,u.regtime,x.uid
                 FROM  xinyuandan AS x 
                 INNER JOIN user AS u 
                 ON x.uid = u.uid
                 where x.sid=? and x.status=0`;

        mydb.query(sql,req.session.sid,(err,result)=>{

            if(err) console.log(err);
            // console.log(result);
            res.render('html/shtml/checkuser',{userlist:result,
                header:req.session.header
            });
        });




    });
    return router;
};