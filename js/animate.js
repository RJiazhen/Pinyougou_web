// 动画函数，obj即html对象，target即目标位置
function animate(obj, target, callback) {
    // 开始之前先清除之前的定时器
    clearInterval(obj.timer);
    var startX = obj.offsetLeft;
    obj.timer = setInterval(function () {
        // 设置一个step变量，用于控制对象移动速度越来越慢
        var step;
        step = (target - obj.offsetLeft) / 10;
        // 根据step的正负值设置向上或向下取整
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            // if (callback) {
            //     callback();
            // }
            // 更简单的写法：
            callback && callback();
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 20);
    // 如果完成了动画，则再执行回调函数

}
