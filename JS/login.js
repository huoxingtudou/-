// 注册页js
window.onload = function () {
    var inputs = document.querySelectorAll('input');
    var spanLabel = document.querySelectorAll('.title');
    var regs = [{
        "reg": /^[a-zA-Z]{4,12}$/,
        "msgs": {
            "success": "用户名输入正确",
            "err": "长度4-12，英文大小写字母"
        },
        "state": false
    }, {
        "reg": /^[a-zA-Z0-9_]{6,20}$/,
        "msgs": {
            "success": "密码输入正确",
            "err": "长度6-20，大小写字母，数字或下划线"
        },
        "state": false
    }, {
        "reg": this.RegExp("^" + inputs[1].value + '$'),
        "msgs": {
            "success": "两次密码输入一致",
            "err": "两次密码输入不一致"
        },
        "state": false
    }, {
        "reg": /^1[34578]\d{9}$/,
        "msgs": {
            "success": "手机号输入正确",
            "err": "13，14，15，17，18开头的11位手机号"
        },
        "state": false
    }]
    // 循环注册事件
    for (var i = 0; i < inputs.length - 1; i++) {
        inputs[i].index = i;
        // 给每一个input添加一个失去焦点得事件
        inputs[i].onblur = function () {
            var value = this.value;
            var spanObj = spanLabel[this.index];
            var reg = regs[this.index];
            // 到localStroage里面看有没有和用户输入得名字一样
            if (this.index == 0) {
                var str = localStorage.getItem(this.value);
            }
            // 如果有的话就提示，该用户名已被注册
            if (str != null) {
                spanObj.innerHTML = "该用户名已经注册";
                spanObj.className = 'title error';
                regs[this.index].state = false;
                return false;
            }
            // 判断重复密码是否和第一次输入密码一致
            if (this.index == 2) {
                regs[2].reg = RegExp('^' + inputs[1].value + '$');
            }
            // 判断每次输入得数据是否和正则表达式一致
            if (reg.reg.test(value)) {
                spanObj.innerHTML = reg.msgs.success;
                spanObj.className = 'title success';
                regs[this.index].state = true;
            } else if (value == '') {
                spanObj.innerHTML = "输入框不能为空";
                spanObj.className = 'title error';
                regs[this.index].state = false;
            } else {
                spanObj.innerHTML = reg.msgs.err;
                spanObj.className = 'title error';
                regs[this.index].state = false;
            }

        }
    }
    // 给表单添加提交事件
    var form = document.querySelector("form");
    form.onsubmit = function () {
        // 把数组里面所有得state状态拿出来
        var state = regs.every(function (item) {
            return item.state;
        });
        // 如果所有的数据都符合正则表达式
        // 就把这些数据存到localStorage里面
        if (state) {
            var data = {};
            data.userName = inputs[0].value;
            data.userPwd = inputs[1].value;
            data.userTel = inputs[3].value;
            var str = JSON.stringify(data);
            var storage = window.localStorage;
            storage.setItem(data.userName, str);
            alert("信息填写无误，注册成功");
            return true;
        } else {
            alert("信息填写有误，注册失败");
            return false;
        }
    }
}