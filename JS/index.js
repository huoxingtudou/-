// 登录页js
window.onload = function () {
    var form = document.querySelector('form');
    // 给form添加提交事件
    form.onsubmit = function () {
        var inputs = document.querySelectorAll('input');
        var storage = window.localStorage;
        // 把用户输入的用户名，在localStorage里面找是否存在
        var str = storage.getItem(inputs[0].value);
        if (str == null) {
            alert('当前用户不存在');
            return false;
        } else {
            var data = JSON.parse(str);
            // 判断密码是否和localStorage里面存的密码是否一致
            if (data.userPwd == inputs[1].value) {
                return true;
            } else {
                alert('当前用户密码错误');
                return false;
            }
        }
    }
}