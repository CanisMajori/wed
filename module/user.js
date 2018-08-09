/**
 * Created by Cathy on 2018/8/8.
 */
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

    router.post('/saveheader',(req,res) => {
        let header = req.body.header;
        console.log(header);
        let sql = `UPDATE user SET header = ? WHERE uid = ? LIMIT 1`;
        mydb.query(sql,[header,req.session.uid],(err,result) => {
            res.json({r:'ok'});
        })
    })

    return router;
}