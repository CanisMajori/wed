/**
 * Created by 12934 on 2018/8/13.
 */
window.onload=function () {
    chengeinfo();
};
function chengeinfo(){
    $('.changeinfo').click(function () {
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