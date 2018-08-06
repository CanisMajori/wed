/**
 * Created by Cathy on 2018/8/6.
 */
function search() {
    let count = 0;
    $('.search').click(function () {
        count++;
        if(count % 2 == 1){
            $('.search_div').addClass('search_show');
        }else{
            $('.search_div').removeClass('search_show');
        }

    })
}
function auto_carousel() {
    $('#carousel_img').carousel({interval:1000});//每隔两秒自动轮播
}