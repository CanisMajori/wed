/**
 * Created by Cathy on 2018/8/6.
 */
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