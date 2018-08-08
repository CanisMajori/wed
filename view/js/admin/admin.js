window.onload = function () {

    //删除用户
    delClass();
    //管理员修改密码
    chengepassword();
}

    function chengepassword(){
        $('.btn-chengepassword').click(function () {
            let password1 = $('#inputPassword1').val();
            let password2 = $('#inputPassword2').val();
            let password3 = $('#inputPassword3').val();
            //清除错误信息
            $("span").html('');
            $('span').parent().parent().removeClass('has-error');
            //出错数
            let flag = 0;
            //客户端验正
            //密码格式
            if (password1.length < 6 || password1.length > 16) {
                flag++;
                $('#inputPassword1').next('span').html('密码要在6到16位之间哦');
                $('#inputPassword1').parent().parent().addClass('has-error');
                $('#inputPassword1').focus();
            }
            if (password2.length < 6 || password2.length > 16) {
                flag++;
                $('#inputPassword2').next('span').html('密码要在6到16位之间哦');
                $('#inputPassword2').parent().parent().addClass('has-error');
                $('#inputPassword2').focus();
            }
            //测试重复密码
            if (password3 != password2) {
                flag++;
                $('#inputPassword3').next('span').html('密码不一致喔');
                $('#inputPassword3').parent().parent().addClass('has-error');
                $('#inputpassword3').focus();
            }
            //出错停止
            if (flag) {
                return;
            }
            //ajax验正
            $.ajax({
                url: 'chengepassword.do',
                type: 'POST',
                dataType: 'JSON',
                data:{
                    password1:password1,
                    password2:password2
                },
                success: function (data) {
                    console.log(data);
                    if (data.r == 'password_err'){
                        $('#inputPassword1').next('span').html('原密码错误');
                        $('#inputPassword1').parent().parent().addClass('has-error');
                        $('#inputPassword1').focus();
                    } else if (data.r == 'db_err') {
                        alert('数据库错误');
                    } else {
                        alert('修改密码成功');
                        window.location.href='/admin/info';
                    }
                },
                fail: function (err) {
                    console.log(err);
                }
            })
        })
}
//删除用户12
function delClass() {
    $('.delc1').click(function () {
        if(!confirm('是否确认删除？')){
            return ;
        }
        //删除普通用户对应的信息 通过主键来对应
        let $qcid = $(this).attr('qcid');
        let This = this;
        $.ajax({
            url:'/admin/info/del1',
            type:'POST',
            data:{qcid:$qcid},
            dataType:'JSON',
            success:function(result){
                console.log(result);
                if(result.r == 'ok'){
                    $(This).parent().parent().remove();
                }
            }
        });
    });
    //删除服务人员信息
    $('.delc2').click(function () {
        if(!confirm('是否确认删除？')){
            return ;
        }
        let $qcid = $(this).attr('qcid');
        let This = this;
        $.ajax({
            url:'/admin/info/del2',
            type:'POST',
            data:{qcid:$qcid},
            dataType:'JSON',
            success:function(result){
                console.log(result);
                if(result.r == 'ok'){
                    $(This).parent().parent().remove();
                }
            }
        });
    });
}


