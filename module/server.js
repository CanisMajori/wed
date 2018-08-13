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
    router.get('/successwork',(req,res) => {
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

    //渲染修改密码页面
    router.get('/change_passwd',(req,res) => {

        res.render('html/shtml/change_passwd',{
                header:req.session.header
        });
    });
    //s型用户查看选择了自己的用户
    router.get('/u_s',(req,res) => {

        let sql=`
                SELECT *
                FROM  seccept AS e
                INNER JOIN user AS x 
                ON x.uid = e.uid
                where e.sid=? and e.status=0  and x.status=0;
            `;
        mydb.query(sql,[req.session.sid],(err,result)=>{
            // console.log(result);
            res.render('html/shtml/u_s',{
                 win:result
                ,header:req.session.header
            });
        });

    });

    //修改密码的数据库验证
    router.post('/change_passwd',(req,res) => {

        let oldPasswd = req.body.oldPasswd;
        let newPasswd = req.body.newPasswd;

        //判断原密码是否正确
        let sql = `SELECT sid,password,sname FROM server WHERE sname = ? LIMIT 1`;
        mydb.query(sql,req.session.username,(err,result) => {
            // console.log('-------------------------');
            // console.log(result);
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
    });

    //将头像存入数据库
    router.post('/saveheader',(req,res) => {
        let header = req.body.header;
        //console.log(header);
        let sql = `UPDATE server SET headpic = ? WHERE sid = ? LIMIT 1`;
        mydb.query(sql,[header,req.session.sid],(err,result) => {
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
        let sql=`insert into seccept (username,uid,sid,sname) values(?,?,?,?)`;
        mydb.query(sql,[req.body.uname,req.body.uid,req.session.sid,req.session.username],(err,result)=>{
            res.json({r:'ok'});
        });
        //todo:怎么让5种用户都接受之后和成功案例表联系起来？？？？
        // let sql=`insert into win (uid,${sclass}) value(?,?) `;
        // mydb.query(sql,[req.body.uid,req.session.username],(err,result)=>{
        //     if(err) console.log(err);
        //     res.json({r:'ok'});
        // });
    });

    //d型用户删除选择自己选择的s型用户
    router.post('/del',(req,res) =>{
        // console.log(req.body);
        // console.log(1);
        let sql=`update seccept set status= 1 where sid=? and uid=? limit 1`;
        mydb.query(sql,[req.session.sid,req.body.uid],(err,result)=>{
            if(err){
                console.log(err);
                res.json({r:'db_err'})
            }else{
                console.log(1);
                res.json({r:'ok'})
            }
        });
    });

    return router;
};