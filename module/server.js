/**
 * Created by 12934 on 2018/8/9.
 */

const md5 = require('md5');
module.exports = function () {
    let router = express.Router();
    //session验证，用户进行操作前必须先进行登录
    router.use((req,res,next) => {
        // console.log(req.session.uid);
        if(!req.session.sid){
            res.redirect('/');
            return;
        }

        next();
    });

    //渲染个人中心页面
    // 路由写/server访问不到路径，因为/就直接代表入口文件里的子路由
    router.get('/',(req,res) => {
        res.render('html/shtml/server',{
            header:req.session.header
        });
    });

    //渲染修改密码页面
    router.get('/change_passwd',(req,res) => {
        res.render('html/shtml/change_passwd');
    });

    //修改密码的数据库验证
    router.post('/change_passwd',(req,res) => {
        let oldPasswd = req.body.oldPasswd;
        let newPasswd = req.body.newPasswd;

        //判断原密码是否正确
        let sql = `SELECT sid,password,sname FROM server WHERE sname = ? LIMIT 1`;
        mydb.query(sql,req.session.username,(err,result) => {
            console.log('-------------------------');
            console.log(result);
            //result是一个数组，数组元素是对象，所以要加下标0才能取到第一个对象
            if(md5(oldPasswd) != result[0].password){
                res.json({r:'old_passwd_err'});
            }else{
                let sql = `UPDATE server SET password = ? WHERE sname = ? LIMIT 1`;
                mydb.query(sql,[md5(newPasswd),req.session.username],(err,result) => {
                    if(err){
                        res.json({r:'db_err'});
                    }else{
                        res.json({r:'success'});
                    }
                })
            }

        })
    })

    //将头像存入数据库
    router.post('/saveheader',(req,res) => {
        let header = req.body.header;
        //console.log(header);
        let sql = `UPDATE server SET headpic = ? WHERE sid = ? LIMIT 1`;
        mydb.query(sql,[header,req.session.uid],(err,result) => {
            res.json({r:'ok'});
        })
    });


    //s型用户拒绝普通用户请求
    router.post('/refuse',(req,res)=>{
        let sql=`update  xinyuandan set status=1
                 where sid=? and uid=?`;
        mydb.query(sql,[req.session.sid,req.body.uid],(err,result)=>{
            if(err) console.log(err);
            res.json({r:'ok'});
        });

    });
    //s型用户接受普通用户请求
    router.post('/agree',(req,res)=>{
        let sclass=req.session.sclass;
        //把 当前的登录的s型用户和选择该s型用户的d型用户存入win中
        //?????待修改******************************************************************
        res.json({r:'ok'});
        // let sql=`insert into win (uid,${sclass}) value(?,?) `;
        // mydb.query(sql,[req.body.uid,req.session.username],(err,result)=>{
        //     if(err) console.log(err);
        //     res.json({r:'ok'});
        // });
    });



    return router;
};