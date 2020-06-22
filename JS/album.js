// 相册页js
window.onload = function () {
    var father = document.querySelector('.nav').querySelector('ul');
    var first_tabs = document.querySelector('.nav_tab1')
    var url = location.search;
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strArr = str.split("&");
        var request = {};
        for (var i = 0; i < strArr.length; i++) {
            var key = strArr[i].split("=")[0];
            var value = strArr[i].split("=")[1];
            request[key] = value;
        }
        var storage = window.localStorage;
        var str = storage.getItem(request.userName);
        var data = JSON.parse(str);
        createPnode(data.userName);
    } else {
        alert('当前未登录，请登录！3秒后返回登录页面！');
        setTimeout(function () {
            location.href = "index.html"
        }, 3000)
    }

    function createPnode(info) {
        var span = document.createElement('span');
        span.className = 'username';
        span.innerHTML = info;
        father.insertBefore(span, first_tabs);
    }
    // 监听导航栏，页面滚动就有背景颜色
    this.addEventListener('scroll', function () {
        console.log(1);
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        father.style.backgroundColor = "rgba(216, 191, 216, 0.5)";
        $('.icon').show('slow');
        if (scrollTop == 0) {
            father.style.backgroundColor = "";
            $('.icon').hide('normal');
        }
    });
    // 点击开始阅读，页面滚动到指定位置
    $('.b').click(function () {
        $('html').animate({
            scrollTop: 720
        }, "slow");
    })
    // 点击向上箭头，页面滚动到顶端
    $('.icon').click(function () {
        $("html").animate({
            scrollTop: 0
        }, "slow");
    });
    $('.article_list').fadeTo('slow');

    // 传参数
    var a = document.querySelector('ul').querySelectorAll('a');
    var search = location.search;
    a[0].addEventListener('click', function () {
        location.href = "../home.html" + search;
    });

    a[1].addEventListener('click', function () {
        location.href = "../log.html" + search;
    });
    a[2].addEventListener('click', function () {
        location.href = "../my.html" + search;
    });

    a[3].addEventListener('click', function () {
        location.href = "../picture.html" + search;
    });

    a[4].addEventListener('click', function () {
        location.href = "../message.html" + search;
    });
    a[5].addEventListener('click', function () {
        location.href = "index.html";
    });
    a[6].addEventListener('click', function () {
        location.href = "regseter.html";
    });

    var imgs = document.querySelectorAll('img');
    var bg = document.querySelector('.bg');
    var close = document.querySelector('.close');
    var left = document.querySelector('.left');
    var right = document.querySelector('.right');
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].addEventListener('click', function () {
            bg.style.display = 'block';
            var img = document.createElement('img');
            var src = "../img/picture/view_" + i + ".jpg"
            img.setAttribute('src', src);
            bg.appendChild(img);
            // 这里不可以用addEventListener
            close.onclick = function () {
                bg.removeChild(img);
                bg.style.display = 'none';
            }
            left.onclick = function () {
                var j = i - 1;
                if (j == 0) {
                    alert('再往前没有照片了！');
                } else {
                    bg.removeChild(img);
                    var img_left = document.createElement('img');
                    var src = "../img/picture/view_" + j + ".jpg";
                    img_left.setAttribute('src', src);
                    bg.appendChild(img_left);
                    img = img_left;
                    i = j
                }
            };
            right.onclick = function () {
                var j = i + 1;
                if (j == imgs.length) {
                    alert('再往后没有照片了！');
                } else {
                    bg.removeChild(img);
                    var img_left = document.createElement('img');
                    var src = "../img/picture/view_" + j + ".jpg";
                    img_left.setAttribute('src', src);
                    bg.appendChild(img_left);
                    img = img_left;
                    i = j
                }
            };
        });
    }
};