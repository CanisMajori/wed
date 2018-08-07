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

    //渲染info页面
    router.get('/info',(req,res) => {
        res.render('html/info');
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

    //验证需求型用户登录页面
    router.post('/dlogin',(req,res) => {
        //验证账号是否存在
        let d = req.body;
        let sql = `SELECT uid,username,password FROM user WHERE username = ? OR password = ? LIMIT 1`;
        mydb.query(sql,[d.dusername,d.dpassword],(err,result) => {
            //input标签里要写name属性,否则后台接收不到数据,result是查出来的数据库值
            console.log(result);
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
            res.json({r:'success'});
        })
    })

    //验证服务型用户登录页面
    router.post('/slogin',(req,res) => {
        //验证账号是否存在
        let s = req.body;
        let sql = `SELECT sid,sname,spassword FROM serverclass WHERE sname = ? OR spassword = ? LIMIT 1`;
        mydb.query(sql,[s.susername,s.spassword],(err,result) => {
            console.log(result);
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
            res.json({r:'success'});
        })
    })

    return router;
}