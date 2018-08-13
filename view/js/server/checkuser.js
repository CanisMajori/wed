/**
 * Created by 12934 on 2018/8/10.
 */
window.onload=function () {
    refuse();
    agree();
};
//拒接用户请求
function refuse() {
    $('.refuse').click(function () {
        let uid=$('.refuse').attr('qcid');
        let This=this;
        $.ajax({
            url:'/server/refuse',
            type:'post',
            dataType:'json',
            data:{uid:uid},
            success:function (data) {
                if(data.r=='ok'){
                    $(This).parent().parent().remove();
                }
            }
        });
    });

}
//接受用户请求
function agree() {
    $('.agree').click(function () {
        //console.log(2);
        let uid=$('.agree').attr('qcid');
        let uname=$('.agree').attr('uname');
        let This=this;
        $.ajax({
            url:'/server/agree',
            type:'post',
            dataType:'json',
            data:{uid:uid,uname:uname},
            success:function (data) {
                if(data.r=='ok'){
                    $('.jieshoubtn').click();
                    $(This).parent().html('已接受');

                }
            }
        });
    });


}
