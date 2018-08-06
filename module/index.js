/**
 * Created by Cathy on 2018/8/6.
 */
module.exports = function(){
    //创建路由实例
    let router = express.Router();

    router.get('/',(req,res) => {
        res.render('html/index');
    })

    return router;
}