/**
 * Created by Cathy on 2018/8/6.
 */
module.exports = function(){
    //创建路由实例
    let router = express.Router();

    //渲染登录首页
    router.get('/',(req,res) => {
        res.render('html/index');
    });

    //渲染登录页面
    router.get('/login',(req,res) => {
        res.render('html/login');
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