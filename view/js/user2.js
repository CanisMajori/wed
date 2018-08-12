/**
 * Created by 12934 on 2018/8/6.
 */
window.onload=function () {
    reg2();
};

//普通用户注册.js
function reg2(){
    $('.regbtn').click(function(){
        //获取用户数据
        let username=$('#sname').val();
        let password1=$('#passwd1').val();
        let password2=$('#passwd2').val();
        let tel=$('#tel').val();
        let email=$('#email').val();
        let u=$('#sname');
        let p1=$('#passwd1');
        //清除错误信息
        $("span").html('');
        $('span').parent().parent().removeClass('has-error');
        //出错数
        let flag = 0;
        //客户端验正
        //验正用户名2-16
        let userReg=/^[\w\u4e00-\u9fa5]{2,12}$/;
        if(!userReg.test(username)){
            flag++;
            u.html('用户名格式不对');
            u.parent().parent().removeClass('has-error');
            u.focus();
        }
        //密码格式
        if (password1.length < 6 || password2.length > 16) {
            flag++;
            p1.next('span').html('密码要在6到16位之间哦');
            p1.parent().parent().addClass('has-error');
            p1.focus();
        }
        //测试重复密码
        if (password1 != password2) {
            flag++;
            $('#passwd2').next('span').html('密码不一致喔');
            $('#passwd2').parent().parent().addClass('has-error');
            $('#passwd2').focus();
        }

        //验正手机号
        let telReg = /^1[35789]{1}[\d]{9}$/;
        if (!telReg.test(tel)) {
            flag++;
            $('#tel').next('span').html('手机格式不对哦');
            $('#tel').parent().parent().addClass('has-error');
            $('#tel').focus();
        }

        //验正邮箱
        let emailReg=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if(!emailReg.test(email)){
            flag++;
            $('#email').next('span').html('邮箱格式不对哦');
            $('#email').parent().parent().addClass('has-error');
            $('#email').focus();
        }
        //出错停止
        if(flag){
            return;
        }
        console.log(222);
        //ajax验正
        $.ajax({
            url:'./reg2.do',
            type:'POST',
            dataType:'JSON',
            data:$('#regform').serialize(),
            success:function (data) {
                console.log(data);
                if(data.r=='username_existed'){
                    u.next('span').html('用户名已存在');
                    u.parent().parent().addClass('has-error');
                    u.focus();
                }else if(data.r=='db_err'){
                    alert('数据库错误');
                }else{
                    alert('注册成功，前往登录页面');
                    window.location.href='./login';
                }
            },
            fail:function (err) {
                console.log(err);
            }



        })

    });
    $('.shouye').click(function () {
        window.location.href='/shouye';
    });
}