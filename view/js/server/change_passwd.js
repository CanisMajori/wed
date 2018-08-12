/**
 * Created by Cathy on 2018/8/9.
 */
window.onload = function(){
    changePasswd();
}

function changePasswd() {
    //修改密码页面验证
    $('.changePasswd').click(function () {

        $('.form-group').removeClass('has-error');
        $('.form-group span').html('');

        if($('#old_passwd').val().length < 6 || $('#old_passwd').val().length > 16){
            $('#old_passwd').focus();
            $('#old_passwd').parent().addClass('has-error');
            $('#old_passwd').next().html('please enter a 6-16 digit password');
            return;
        }
        if($('#new_passwd1').val().length < 6 || $('#new_passwd1').val().length > 16){
            $('#new_passwd1').focus();
            $('#new_passwd1').parent().addClass('has-error');
            $('#new_passwd1').next().html('please enter a 6-16 digit password');
            return;
        }
        if($('#new_passwd1').val() != $('#new_passwd2').val()){
            $('#new_passwd2').focus();
            $('#new_passwd2').parent().addClass('has-error');
            $('#new_passwd2').next().html('does not match the last password entered');
            return;
        }

        $.ajax({
            url:'/server/change_passwd',
            type:'POST',
            dataType:'JSON',
            data:{
                oldPasswd:$('#old_passwd').val(),
                newPasswd:$('#new_passwd2').val()
            },
            success:function (data) {
                console.log(data);
                if(data.r == 'old_passwd_err'){
                    $('#old_passwd').focus();
                    $('#old_passwd').parent().addClass('has-error');
                    $('#old_passwd').next().html('please enter the correct original password');
                }else if(data.r == 'success'){
                    $('#myModal').modal();
                    $('#modal_yes').click(function () {
                        window.location.href = '/';
                    })
                }
            }
        })
    });
}