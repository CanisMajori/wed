/**
 * Created by 12934 on 2018/8/13.
 */
window.onload=function () {
    chengeinfo();
};
function chengeinfo(){
    $('.changeinfo').click(function () {
            //获取用户数据
            // let username=$('#username').val();
            // let tel=$('#tel').val();
            // let email=$('#email').val();
            // let u=$('#username');
            // //清除错误信息
            //
            // //出错数
            // let flag = 0;
            // //客户端验正
            // //验正用户名2-16
            // if(!username){
            //     flag++;
            //     u.next('span').html('用户名格式不对');
            //     u.parent().removeClass('has-error');
            //     u.focus();
            // }
            // //密码格式
            // if (password1.length < 6 || password2.length > 16) {
            //     flag++;
            //     p1.next('span').html('密码要在6到16位之间哦');
            //     p1.parent().parent().addClass('has-error');
            //     p1.focus();
            // }
            // //测试重复密码
            // if (password1 != password2) {
            //     flag++;
            //     $('#passwd2').next('span').html('密码不一致喔');
            //     $('#passwd2').parent().parent().addClass('has-error');
            //     $('#passwd2').focus();
            // }
            //
            // //验正手机号
            // let telReg = /^1[35789]{1}[\d]{9}$/;
            // if (!telReg.test(tel)) {
            //     flag++;
            //     $('#tel').next('span').html('手机格式不对哦');
            //     $('#tel').parent().parent().addClass('has-error');
            //     $('#tel').focus();
            // }
            //
            // //验正邮箱
            // let emailReg=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            // if(!emailReg.test(email)){
            //     flag++;
            //     $('#email').next('span').html('邮箱格式不对哦');
            //     $('#email').parent().parent().addClass('has-error');
            //     $('#email').focus();
            // }
            // //出错停止
            // if(flag){
            //     return;
            // }
            // // console.log(222);
        //todo：客户端验正待写...
        $.ajax({
            url:'./chengeinfo',
            type:'post',
            dataType:'JSON',
            data:$('#chengeinfo').serialize(),
            success:function (data) {
                if(data.r=='ok'){
                    $('.info').click();//点击模态框弹出修改成功提醒
                }

            }
        });
    });
}