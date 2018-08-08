/**
 * Created by 12934 on 2018/8/8.
 */

window.onload=function () {
    save();
};
//将心愿单存起
function save (){
    $('.mybtn').click(function () {
        let $qid = $(this).attr('nid');
        console.log($qid);
        $('#nid').val($qid);
        console.log($('#nid').val());
    })
    $('.mybtn2').click(function () {
        $.ajax({
            url:'/save',
            type:'POST',
            dataType:'JSON',
            data:{
                sid:$('#nid').val()
                },
            success:function () {
                console.log('success');
            }
        });
    });
}