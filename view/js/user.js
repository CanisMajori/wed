/**
 * Created by Cathy on 2018/8/8.
 */
window.onload = function () {
    uploadheader();
}

function uploadheader() {
    //个人中心上传头像
    $('.uploadheader').click(function () {
        $('#header').click();
    });

    //处理上传头像
    $('#header').change(function () {
        //创建一个虚拟表单，上传头像
        let formdata = new FormData();
        //利用虚拟表单提交input中的value值,第一个参数是自定义名字，服务器根据这个名字接收图片地址
        formdata.append('uploadheader', $('#header')[0].files[0]);//input file  value=""

        $.ajax({
            url: '/upload',
            type: 'POST',
            data: formdata,
            dataType:'JSON',
            cache: false,//上传文件不需要缓存
            processData: false,//不需要对数据做处理
            contentType: false,//不需要改变内容类型，因为前面已经申明了是formData对象
            success:function (result) {
                console.log(result);
                $('#myheader').attr('src', result.path);
                // <input type="hidden" name="myheader" value="">
                $('input[name="myheader"]').val(result.path);
            }
        });

        //将头像保存到数据库
        $('.saveheader').click(function () {
            $.ajax({
                url:'/user/saveheader',
                type:'POST',
                dataType:'JSON',
                data:{header:$('input[name="myheader"]').val()},
                success:function (data) {
                    console.log(data);
                }
            })
        });
    });
}