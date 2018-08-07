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
    //习俗页面
    router.get('/custom',(req,res) => {
        res.render('html/custom');
    });
    //渲染普通用户注册页面
    router.get('/reg1',(req,res) => {
        res.render('html/reg1');
    });
    //渲染服务人员注册页面
    router.get('/reg2',(req,res) => {
        res.render('html/reg2');
    });
    //普通用户注册按钮
    router.post('/reg1.do',(req,res)=>{
        let p = req.body;
        console.log(p);
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
        console.log(p);
        if(!p.passwd1){
            res.json({r:'passwd_no'});
            return ;
        }
        let sql = `SELECT sid FROM serverclass WHERE sname = ? LIMIT 1`;
        mydb.query(sql, p.sname, (err, result)=>{
            console.log(result);
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
     //验证登录页面
    router.post('/dlogin',(req,res) => {
        //验证账号是否存在
        let d = req.body;
        let sql = `SELECT uid,username,password FROM user LIMIT 1`;
        mydb.query(sql,[d.dusername,d.dpassword],(err,result) => {
            console.log(result);
        })
    })

    return router;
}