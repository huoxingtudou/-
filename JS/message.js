// 留言页js
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
      location.href = "../index.html"
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

  // 点击留言板的小表情出现所有表情，再点一次小表情所有表情消失
  var emoji = document.querySelector('.emoji');
  var emojis = document.querySelector('.emojis');
  emoji.addEventListener('click', function () {
    if (emojis.style.display == 'none') {
      emoji.className = 'change';
      emojis.style.display = 'block';
    } else {
      emoji.className = 'emoji';
      emojis.style.display = 'none';
    }
  });
  // 点击表情，在textarea中显示表情的标签
  // 获取元素
  var textarea = document.querySelector('textarea');
  var emojis_img = emojis.querySelectorAll('img');
  console.log(emojis_img.length);
  for (let i = 0; i < emojis_img.length; i++) {
    emojis_img[i].addEventListener('click', function () {
      textarea.value = emojis_img[i].title;
    });
  }
  // 点击发布按钮，下面将会显示留言的内容
  // 获取元素
  var btn = document.querySelector('.btn');
  var visit_name = document.querySelector('.visit_input');
  var visitor_comment = document.querySelector('.visitor_comment');
  // 监听事件
  btn.addEventListener('click', function () {
    var str = visit_name.value;
    var t_str = textarea.value;
    str = str.replace(/(^\s*)|(\s*$)/g, ''); //去除空格;
    // 判断用户名是否为空
    if (str == '' || str == undefined || str == null) {
      alert('用户名为空,必需输入用户名！');
    } else {
      // 判断评论内容是否为空
      if (t_str == '' || t_str == undefined || t_str == null) {
        alert('评论内容为空！');
      } else {
        // 获取当前的时间
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = (month < 10) ? '0' + month : month;
        var day = date.getDate();
        day = (day < 10) ? '0' + day : day;
        var hour = date.getHours();
        hour = (hour < 10) ? '0' + hour : hour;
        var minute = date.getMinutes();
        minute = (minute < 10) ? '0' + minute : minute;
        var now_time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
        // 创建元素和插入元素
        var visitor_comment_main = document.createElement('div');
        visitor_comment_main.setAttribute('class', 'comment_main_user');
        var visitor = document.createElement('div');
        visitor.setAttribute('class', 'visitor_message');
        var span_name = document.createElement('span');
        span_name.setAttribute('class', 'name');
        span_name.innerHTML = str;
        var span = document.createElement('span');
        span.setAttribute('class', 'visit');
        span.innerHTML = '访客';
        var time = document.createElement('div');
        time.setAttribute('class', 'time');
        time.innerHTML = now_time;
        visitor.appendChild(span_name);
        visitor.appendChild(span);
        visitor.appendChild(time);
        visitor_comment_main.appendChild(visitor);
        visitor_comment.appendChild(visitor_comment_main);
        // 判断是否有表情
        var img = emojis.querySelectorAll('img');
        if (textarea.value.search("tv") != -1) {
          var img_index = t_str.match(/tv[0-9]*/);
          for (let i = 0; i < img.length; i++) {
            if (img[i].title == img_index) {
              var comment_content = document.createElement('div');
              comment_content.setAttribute('class', 'comment_content');
              var content_span = document.createElement('span');
              var t_str = t_str.replace(/tv[0-9]*/, '');
              content_span.innerHTML = t_str;
              var img = document.createElement('img');
              i += 1;
              var src = 'img/comment/emoji' + i + '.png';
              img.setAttribute('src', src);
              comment_content.appendChild(img);
              comment_content.appendChild(content_span);
              visitor_comment_main.appendChild(comment_content);
            }
          }
        } else {
          var comment_content = document.createElement('div');
          comment_content.setAttribute('class', 'comment_content');
          var content_span = document.createElement('span');
          content_span.innerHTML = t_str;
          comment_content.appendChild(content_span);
          visitor_comment_main.appendChild(comment_content);
        }
      }
    }
  });
}