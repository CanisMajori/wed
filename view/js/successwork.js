/**
 * Created by 12934 on 2018/8/9.
 */
window.onload=function () {
    move();
};
function move() {
    var n=0;
    $('#leftbtn').click(function () {
        n=n-300;
        var wid=$('#wid').attr('wid');
        var width_iteminfo=parseInt($('.item-info').css('width'));
        //获取大盒子宽度
        var width2=$('.middle-row').css('width');
        var middlerow_width=parseInt(width2);
        console.log(middlerow_width-((wid)*width_iteminfo));//-6622
        
        if(n<(middlerow_width-((wid)*width_iteminfo))) {
            $('.item').css({
                left: 0,
                transition: 'left 1s'
            });
            n=0;
        }else{
            $('.item').css({
                left: n,
                transition: 'left 1s'
            });
        }

    });
    $('#rightbtn').click(function () {
        n=n+300;

        if(n>0) {
            $('.item').css({
                left: 0,
                transition: 'left 1s'
            });
            n=0;
        }else{
            $('.item').css({
                left: n,
                transition: 'left 1s'
            });
        }

    })
}
