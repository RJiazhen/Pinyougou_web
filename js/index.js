window.addEventListener('load', function () {
    var focus = document.querySelector('.focus');
    var arrowL = document.querySelector('.arrow-l');
    var arrowR = document.querySelector('.arrow-r');
    var focusUl = focus.querySelector('.focus ul');
    var circleDot = focus.querySelector('.circle');

    // 鼠标经过焦点图时才显示左右按钮，以及清楚自动播放的定时器
    focus.addEventListener('mouseenter', function () {
        arrowL.style.display = 'block';
        arrowR.style.display = 'block';
        clearInterval(timer);
        timer = null;
    });
    focus.addEventListener('mouseleave', function () {
        arrowL.style.display = 'none';
        arrowR.style.display = 'none';
        timer = setInterval(function () {
            arrowR.click();
        }, 2000);
    });

    // 根据图片数量控制小圆点数量,且绑定小圆点点击事件
    for (var i = 0; i < focusUl.children.length - 1; i++) {
        var li = this.document.createElement('li');
        circleDot.appendChild(li);
        li.setAttribute('data-index', i);
        li.addEventListener('click', function () {
            for (var i = 0; i < circleDot.children.length; i++) {
                circleDot.children[i].className = '';
            }
            this.className = 'current';
            // 小圆点点击后根据索引号滑动图片
            var index = this.getAttribute('data-index');
            animate(focusUl, -focus.offsetWidth * index);
        });
    }
    circleDot.children[0].className = 'current';
    // 节流阀
    var flag = true;
    // 左按钮点击后图片向左滑动
    arrowL.addEventListener('click', function () {
        if (flag) {
            flag = false;
            var oldli = document.querySelector('.current');
            var index = parseInt(oldli.getAttribute('data-index'));
            // 如果是第一张图片，则先跳转到最后一张图片
            if (index == 0) {
                focusUl.style.left = -focus.offsetWidth * (focusUl.children.length - 1) + 'px';
                var toindex = circleDot.children.length - 1;
            }
            else {
                var toindex = index - 1;
            }
            animate(focusUl, -focus.offsetWidth * toindex, function () {
                flag = true;
            });
            // 设置data-index属性为index-1的小圆点的className为current
            var newli = document.querySelector('[data-index="' + toindex + '"]');
            oldli.className = '';
            newli.className = 'current';
        }
    });

    // 右按钮点击后图片向右滑动
    arrowR.addEventListener('click', function () {
        if (flag) {
            flag = false;
            var oldli = document.querySelector('.current');
            var index = parseInt(oldli.getAttribute('data-index'));
            var toindex = index + 1;

            function callback() { };
            // 如果是最后一张图片，则设置回调函数，让其在动画完成后跳转到第一张
            if (index == circleDot.children.length - 1) {
                animate(focusUl, -focus.offsetWidth * toindex, function () {
                    focusUl.style.left = 0;
                    flag = true;
                });
                toindex = 0;
            }
            else {
                animate(focusUl, -focus.offsetWidth * toindex, function () {
                    flag = true;
                });
            }

            // 设置data-index属性为index-1的小圆点的className为current
            var newli = document.querySelector('[data-index="' + toindex + '"]');
            oldli.className = '';
            newli.className = 'current';
        }
    });

    // 自动播放功能
    var timer = setInterval(function () {
        arrowR.click();
    }, 2000);
});