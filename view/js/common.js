/**
 * Created by Cathy on 2018/8/6.
 */
window.onload = function () {
    //search();
    auto_carousel();
    login();
}

// function search() {
//     let count = 0;
//     $('.search').click(function () {
//         count++;
//         if(count % 2 == 1){
//             $('.search_div').addClass('search_show');
//         }else{
//             $('.search_div').removeClass('search_show');
//         }
//
//     })
// }

//自动轮播
function auto_carousel() {
    $('#carousel_img').carousel({interval:1000});//每隔两秒自动轮播
}

//登录页面自动切换
function login() {
    $('#user1').click(function () {
        $('.Demand').css('display','block');
        $('.Service').css('display','none');
        $('#user1').css('border-bottom','3px solid #3c3c3c');
        $('#user2').css('border-bottom','0px');
    })
    $('#user2').click(function () {
        $('.Demand').css('display','none');
        $('.Service').css('display','block');
        $('#user2').css('border-bottom','3px solid #3c3c3c');
        $('#user1').css('border-bottom','0px');
    })
}