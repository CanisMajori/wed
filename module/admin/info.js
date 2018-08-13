/**
 * Created by Cathy on 2018/8/7.
 */
const async=require('async');
const ejs = require('ejs');
module.exports = function () {
    //创建路由实例
    let router = express.Router();
    //渲染管理员首页
    router.get('/',(req,res) => {
        let page=req.query.page?req.query.page:1;
        //每页条数
        let pagenum=6;
        //总页数
        let totalpage=1;
        //链接地址扩展信息
        let urlext='';
        async.series({
            qclist:function (cb) {
                //获取分类信息
                let sql=`select * from user where status=0`;
                mydb.query(sql,(err,results)=>{
                    cb(null,results);
                })
            },
            totalnums:function (cb) {
                let sql=`select count(uid) as totalnums from user where status=0`;
                //根据分类查询试题

                mydb.query(sql,(err,result)=>{

                    cb(null,result[0].totalnums);
                });

            },
            //查询所有并显示到页面
            userlist:function (cb) {
                let sql=`select * from user where status=0`;


                //查询当前页
                sql+=` limit ${pagenum*(page-1)}, ${pagenum}`;
                mydb.query(sql,(err,result)=>{
                    cb(null,result);//result是 数组
                    //console.log(result);
                });
            }


        },(err,results)=>{
            //totalnums  存的是满足条件的总记录数
            //计算总页数
            totalpage = Math.ceil(results.totalnums / pagenum);
            results.totalpage = totalpage;
            results.page = page;
            //显示前后3页  end - start = showpage - 1        6  7  8  9  10  11  12
            let showpage =5;
            let start = page - Math.ceil((showpage-1)/2);
            let end = page + Math.floor((showpage-1)/2);
            //开始页数不能小于  1
            if(start < 1){
                start   = 1;
                end     = showpage - 1 + start;
            }
            //结束页码不能大于总页数
            if(end > totalpage){
                end     = totalpage;
                start   = end + 1 - showpage;
                //开始页数不能小于  1
                if(start < 1){
                    start = 1;
                }
            }
            results.start = start;
            results.end = end;
            //链接地址里面查询信息
            results.urlext = urlext;
            // console.log(results);
            res.render('admin/admindex',{
                userlist:results.userlist,
                page:page,
                urlext:urlext,
                start:start,
                end:end,
                totalpage:totalpage,

            });
        });
        //****************************************
    //     let sql=`select * from user where status=0`;
    //     mydb.query(sql,(err,result)=>{
    //         if(err){
    //             console.log(err);
    //         }
    //         console.log(result);
    //         res.render('admin/admindex',{userlist:result});
    //     });
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
                mydb.query(sql,[md5(p.password2),req.session.aid],(err,result)=>{
                    if(err){
                        console.log(err);
                    }
                    res.json({r:'ok'});
                })
            }



        });
    });

    //成功案列管理
    router.get('/story',(req,res)=>{
        let page=req.query.page?req.query.page:1;
        //每页条数
        let pagenum=6;
        //总页数
        let totalpage=1;
        //链接地址扩展信息
        let urlext='';
        async.series({
            qclist:function (cb) {
                //获取分类信息
                let sql=`select * from win where status=0`;
                mydb.query(sql,(err,results)=>{
                    cb(null,results);
                })
            },
            totalnums:function (cb) {
                let sql=`select count(wid) as totalnums from win where status=0`;
                //根据分类查询试题

                mydb.query(sql,(err,result)=>{

                    cb(null,result[0].totalnums);
                });

            },
            //查询所有并显示到页面
            userlist:function (cb) {
                let sql=`select * from win where status=0`;


                //查询当前页
                sql+=` limit ${pagenum*(page-1)}, ${pagenum}`;
                mydb.query(sql,(err,result)=>{
                    cb(null,result);//result是 数组
                    //console.log(result);
                });
            }


        },(err,results)=>{
            //totalnums  存的是满足条件的总记录数
            //计算总页数
            totalpage = Math.ceil(results.totalnums / pagenum);
            results.totalpage = totalpage;
            results.page = page;
            //显示前后3页  end - start = showpage - 1        6  7  8  9  10  11  12
            let showpage =5;
            let start = page - Math.ceil((showpage-1)/2);
            let end = page + Math.floor((showpage-1)/2);
            //开始页数不能小于  1
            if(start < 1){
                start   = 1;
                end     = showpage - 1 + start;
            }
            //结束页码不能大于总页数
            if(end > totalpage){
                end     = totalpage;
                start   = end + 1 - showpage;
                //开始页数不能小于  1
                if(start < 1){
                    start = 1;
                }
            }
            results.start = start;
            results.end = end;
            //链接地址里面查询信息
            results.urlext = urlext;
            // console.log(results);
            res.render('admin/story',{
                winlist:results.userlist,
                page:page,
                urlext:urlext,
                start:start,
                end:end,
                totalpage:totalpage,

            });
        });
        //****************************************
        //     let sql=`select * from user where status=0`;
        //     mydb.query(sql,(err,result)=>{
        //         if(err){
        //             console.log(err);
        //         }
        //         console.log(result);
        //         res.render('admin/admindex',{userlist:result});
        //     });
    });
    //删除成功案例
    router.post('/windel',(req,res) =>{
        // console.log(req.body);
        let sql=`update win set status= 1 where wid=?`;
        mydb.query(sql,req.body.qcid,(err,result)=>{
            if(err){
                console.log(err);
                res.json({r:'db_err'})
            }else{
                res.json({r:'ok'})
            }
        });
    });


    //服务型用户管理
    router.get('/success',(req,res) => {
        let page=req.query.page?req.query.page:1;
        //每页条数
        let pagenum=6;
        //总页数
        let totalpage=1;
        //链接地址扩展信息
        let urlext='';
        async.series({
            qclist:function (cb) {
                //获取分类信息
                let sql=`select * from serverclass where status=0`;
                mydb.query(sql,(err,results)=>{
                    cb(null,results);
                })
            },
            totalnums:function (cb) {
                let sql=`select count(sid) as totalnums from serverclass where status=0`;


                mydb.query(sql,(err,result)=>{
                    // console.log(result);
                    cb(null,result[0].totalnums);
                });

            },
            //查询所有并显示到页面
            serverlist:function (cb) {
                let sql=`select * from serverclass where status=0`;
                //查询当前页
                sql+=` limit ${pagenum*(page-1)}, ${pagenum}`;
                mydb.query(sql,(err,result)=>{
                    cb(null,result);//result是 数组
                    //console.log(result);
                });
            }
        },(err,results)=>{
            //totalnums  存的是满足条件的总记录数
            //计算总页数
            totalpage = Math.ceil(results.totalnums / pagenum);
            results.totalpage = totalpage;
            results.page = page;
            //显示前后3页  end - start = showpage - 1        6  7  8  9  10  11  12
            let showpage =5;
            let start = page - Math.ceil((showpage-1)/2);
            // console.log('start1'+start);
            let end = page + Math.floor((showpage-1)/2);
            // console.log('end1'+end);
            //开始页数不能小于  1
            if(start < 1){
                start   = 1;
                end     = showpage - 1 + start;
            }
            //结束页码不能大于总页数
            if(end > totalpage){
                end     = totalpage;
                start   = end + 1 - showpage;
                //开始页数不能小于  1
                if(start < 1){
                    start = 1;
                }
            }
            // console.log('start2'+start);
            // console.log('end2'+end);


            results.start = start;
            results.end = end;
            //链接地址里面查询信息
            results.urlext = urlext;
            //console.log(results);
            res.render('admin/success',{
                serverlist:results.serverlist,
                page:page,
                urlext:urlext,
                start:start,
                end:end,
                totalpage:totalpage,

            });
        });











        //***********************
        // let sql=`select * from serverclass where status=0`;
        // mydb.query(sql,(err,result)=>{
        //     if(err){
        //         console.log(err);
        //     }
        //     console.log(result);
        //     res.render('admin/success',{serverclasslist:result});
        // });
    });
    //删除d型用户操作
    router.post('/del1',(req,res) => {
        // console.log(req.body);
        let sql=`update user set status= 1 where uid=?`;
        mydb.query(sql,req.body.qcid,(err,result)=>{
            if(err){
                console.log(err);
                res.json({r:'db_err'})
            }else{
                res.json({r:'ok'})
            }
        });
    });

    //删除s型用户
    router.post('/del2',(req,res) =>{
        // console.log(req.body);
        let sql=`update serverclass set status= 1 where sid=?`;
        mydb.query(sql,req.body.qcid,(err,result)=>{
            if(err){
                console.log(err);
                res.json({r:'db_err'})
            }else{
                res.json({r:'ok'})
            }
        });
    });


    return router;
};