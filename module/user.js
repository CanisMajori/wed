/**
 * Created by Cathy on 2018/8/8.
 */
const md5 = require('md5');
module.exports = function () {
    let router = express.Router();
    //session验证，用户进行操作前必须先进行登录
    router.use((req,res,next) => {
        if(!req.session.uid){
            res.redirect('/');
            return;
        }
        next();
    });
    //渲染个人中心页面,上传头像
    // 路由写/user访问不到路径，因为/就直接代表入口文件里的子路由
    router.get('/',(req,res) => {
        res.render('html/user',{
            header:req.session.header
        });
    });

    //渲染修改密码页面
    router.get('/change_passwd',(req,res) => {
        let sql=`select header from user where uid=?`;
        mydb.query(sql,req.session.uid,(err,result)=>{
            // console.log(result[0].header)
            res.render('html/change_passwd',{
                header:result[0].header

            });
        });

    });

    //渲染修改个人信息
    router.get('/chengeinfo',(req,res) => {
        let sql=`select * from user where uid=?`;
        mydb.query(sql,req.session.uid,(err,result)=>{
             // console.log(result);
            res.render('html/chengeinfo',{
                info:result[0],
                header:result[0].header
            });
        });

    });

    //保存个人信息
    router.post('/chengeinfo',(req,res)=>{
        let sql=`update user set username=?,sign=?,tel=?,email=? where uid=? limit 1`;
        mydb.query(sql,[req.body.username,req.body.sign,req.body.tel,req.body.email,req.session.uid],(err,result)=>{
            if(err) console.log(err);
            res.json({r:'ok'});
        });
    });

    //渲染选择人员页面
    router.get('/choose_people',(req,res) => {
        let sql = `SELECT * FROM serverclass  AS s INNER JOIN xinyuandan AS x ON x.sid = s.sid WHERE x.uid = ? and x.status=0`;
        mydb.query(sql,req.session.uid,(err,result) => {
            res.render('html/choose_people',{
                header:req.session.header,
                result:result
            });
        })
    });

    //修改密码的数据库验证
    router.post('/change_passwd',(req,res) => {
        let oldPasswd = req.body.oldPasswd;
        let newPasswd = req.body.newPasswd;

        //判断原密码是否正确
        let sql = `SELECT uid,password,username FROM user WHERE username = ? LIMIT 1`;
        mydb.query(sql,req.session.username,(err,result) => {
            // console.log('-------------------------');
            // console.log(result);
            //result是一个数组，数组元素是对象，所以要加下标0才能取到第一个对象
            if(md5(oldPasswd) != result[0].password){
                res.json({r:'old_passwd_err'});
            }else{
                let sql = `UPDATE user SET password = ? WHERE username = ? LIMIT 1`;
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
        let sql = `UPDATE user SET header = ? WHERE uid = ? LIMIT 1`;
        mydb.query(sql,[header,req.session.uid],(err,result) => {
            res.json({r:'ok'});
        })
    });

    //d型用户删除选择自己选择的s型用户
    router.post('/del',(req,res) =>{
        // console.log(req.body);
        // console.log(1);
        let sql=`update xinyuandan set status= 1 where sid=? and uid=? limit 1`;
        mydb.query(sql,[req.body.sid,req.body.uid],(err,result)=>{
            if(err){
                console.log(err);
                res.json({r:'db_err'})
            }else{
                //console.log(1);
                res.json({r:'ok'})
            }
        });
    });

    return router;
}