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

    //渲染个人中心页面
    // 路由写/user访问不到路径，因为/就直接代表入口文件里的子路由
    router.get('/',(req,res) => {
        res.render('html/user',{
            header:req.session.header
        });
    })

    //渲染修改密码页面
    router.get('/change_passwd',(req,res) => {
        res.render('html/change_passwd');
    });

    //修改密码的数据库验证
    router.post('/change_passwd',(req,res) => {
        let oldPasswd = req.body.oldPasswd;
        let newPasswd = req.body.newPasswd;

        //判断原密码是否正确
        let sql = `SELECT uid,password,username FROM user WHERE username = ? LIMIT 1`;
        mydb.query(sql,req.session.username,(err,result) => {
            console.log('-------------------------');
            console.log(result);
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
    })

    //将头像存入数据库
    router.post('/saveheader',(req,res) => {
        let header = req.body.header;
        //console.log(header);
        let sql = `UPDATE user SET header = ? WHERE uid = ? LIMIT 1`;
        mydb.query(sql,[header,req.session.uid],(err,result) => {
            res.json({r:'ok'});
        })
    })

    return router;
}