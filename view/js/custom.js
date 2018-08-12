/**
 * Created by 12934 on 2018/8/10.
 */
window.onload=function () {
    shouye();
};
//发送get请求，服务器判断session
function shouye() {
    $('.shouye').click(function () {
        window.location.href='/shouye';
    });
}