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
        location.href = "home.html" + search;
    });

    a[1].addEventListener('click', function () {
        location.href = "log.html" + search;
    });
    a[2].addEventListener('click', function () {
        location.href = "my.html" + search;
    });

    a[3].addEventListener('click', function () {
        location.href = "picture.html" + search;
    });

    a[4].addEventListener('click', function () {
        location.href = "message.html" + search;
    });
    a[5].addEventListener('click', function () {
        location.href = "index.html";
    });
    a[6].addEventListener('click', function () {
        location.href = "regseter.html";
    });
    // 相册页传参数
    var picture_a = this.document.querySelector('.album_list').querySelector('a');
    picture_a.addEventListener('click', function () {
        location.href = "pictures/picture1.html" + search;
    });
    // 轮播图
    var innerItems = document.querySelectorAll('.item');
    var lists = document.querySelector('#carousel-indicators').querySelector('ul').querySelectorAll('li');
    var left = document.querySelector('.left');
    var right = document.querySelector('.right');
    var current = 0;
    innerItems[current].className = 'item active';
    lists[current].className = 'liactive';

    function slide() {
        for (var i in lists) {
            innerItems[i].className = 'item';
            lists[i].className = '';
        }
        innerItems[current].className = 'item active';
        lists[current].className = 'liactive';
    }
    for (var i in lists) {
        lists[i].index = i;
        lists[i].onclick = function () {
            current = this.index;
            slide();
        }
    }
    left.onclick = function () {
        current--;
        if (current == -1) {
            current = lists.length - 1;
        }
        slide();
    };
    right.onclick = function () {
        current++;
        if (current == lists.length) {
            current = 0;
        }
        slide();
    };
    var timer = this.setInterval(right.onclick, 3000);
    left.onmouseover = right.onmouseover = function () {
        clearInterval(timer)
    }
    left.onmouseout = right.onmouseover = function () {
        timer = setInterval(right.onclick, 3000);
    }
};