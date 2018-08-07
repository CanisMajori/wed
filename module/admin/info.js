/**
 * Created by Cathy on 2018/8/7.
 */
const ejs = require('ejs');
module.exports = function () {
    //创建路由实例
    let router = express.Router();
    //渲染管理员首页
    router.get('/',(req,res) => {
        let sql=`select * from user where status=0`;
        mydb.query(sql,(err,result)=>{
            if(err){
                console.log(err);
            }
            console.log(result);
            res.render('admin/admindex',{userlist:result});
        });
    });
    //管理员修改密码
    router.get('/chengepassword',(req,res)=>{
        res.render('admin/chengepassword');
    });
    //管理员修改密码
    router.post('/chengepassword.do',(req,res)=>{
        let p=req.body;
        console.log(p);
        console.log(req.session.username);
        console.log(md5(p.password1));

        let sql = 'SELECT password FROM admin WHERE account = ? LIMIT 1';
        mydb.query(sql, req.session.username, (err, result)=>{
            console.log(result);
            if(result[0].password!= md5(p.password1)){
                res.json({r:'password_err'})
            }else{
                let sql=`UPDATE admin SET password = ?  WHERE aid = ? LIMIT 1`;
                mydb.query(sql,[p.password2,req.session.aid],(err,result)=>{
                    if(err){
                        console.log(err);
                    }
                    res.json({r:'ok'});
                })
            }



        });
    });

    //成功案列管理


    //服务型用户管理
    router.get('/success',(req,res) => {
        let sql=`select * from serverclass where status=0`;
        mydb.query(sql,(err,result)=>{
            if(err){
                console.log(err);
            }
            console.log(result);
            res.render('admin/success',{serverclasslist:result});
        });
    });
    //删除用户操作


    return router;
}