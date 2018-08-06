/**
 * Created by 12934 on 2018/8/1.
 */
// 这是管理员的登录页面js
window.onload=function () {
    login();
}
function login() {
    $('.login').click(function () {
        $('#ue').html('');
        $('#pe').html('');

        //验正用户名
        let reg_username=/^[\w\u4e00-\u9fa5]{2,12}$/i;
        if(!reg_username.test($('.username').val())){
            $('.username').focus();
            $('#ue').html('账号格式不正确');
            $('#ue').css('color','red');
            return ;
        }

        //验正密码
        if($('.password').val().length<6||$('.password').val().length>16){
            $('.password').focus();
            $('#pe').html('密码格式不正确');
            $('#pe').css('color','red');
            return ;
        }
        //ajax提交给后台
        $.ajax({
            url:'./login',
            type:'POST',
            data:$('.login100-form').serialize(),
            dataType:'JSON',
            success:function (result) {
                //提示验正
                if(result.r=='db_err'){
                    alert('系统错误请重试');
                }
                if(result.r=='account_notexist'){
                    $('#ue').html('此账号不存在');
                    $('#ue').css('color','red');
                }
                if(result.r=='password_err'){
                    $('#pe').html('密码错误');
                    $('#pe').css('color','red');
                }
                if(result.r=='ok'){
                    window.location.href='/admin/qclass';
                }
            }


        });


    })
}