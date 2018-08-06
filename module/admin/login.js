/**
 * Created by 12934 on 2018/8/1.
 */
module.exports=function () {
    //设置子路由
    let router=express.Router();
    //管理员登录界面
    router.get('/',(req,res)=>{
        res.render('admin/login');
    });
    //验正管理员登录
    router.post('/',(req,res)=>{
        let sql='select aid,account,password from admin where account=? limit 1';
        mydb.query(sql,[req.body.username],(err,result)=>{
            if(err){
                res.json({r:'db_err'});
                return ;
            }
            //检查账户是否存在
            if(!result.length){
                res.json({r:'account_notexist'});
                return ;
            }
            //检查密码
            if(md5(req.body.password)!=result[0].password){
                res.json({r:'password_err'})
                return ;
            }
            //session处理
            req.session.aid=result[0].aid;
            console.log(result[0].account);
            req.session.username=result[0].account;

            //为当前登录用户设置登录信息
            let updatesql='update admin set loginnum=loginnum + 1,lastlogin=?,ip=? where aid=? limit 1';
            mydb.query(updatesql,[new Date().toLocaleString(),req.ip,result[0].aid],(err,result)=>{
                if(err){
                    console.log(err);
                }
                res.json({r:'ok'});
            });
        });

    });
    return router;
};