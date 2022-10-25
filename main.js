

var snake = new Snake();
var food = new Food();
snake.display();   // 初始化显示
food.display();

// 给body加按键事件，上下左右
document.body.onkeydown = function(e) {
    // 有事件对象就用事件对象，没有就自己创建一个，兼容低版本浏览器
    var ev = e || window.event;

    switch(ev.keyCode)
    {
        case 38:
            if (snake.direction != 'down') {   // 不允许返回，向上的时候不能向下
                snake.direction = "up";
            }
            break;
        case 40:
            if (snake.direction != "up") {
                snake.direction = "down";
            }
            break;
        case 37:
            if (snake.direction != "right") {
                snake.direction = "left";
            }
            break;
        case 39:
            if (snake.direction != "left") {
                snake.direction = "right";
            }
            break;
    }
};

// 点击开始时，动起来
var begin = document.getElementById('showing_bar');
var timer;
begin.onclick = function() {
    clearInterval(timer);
    // timer = setInterval(snake.run(), 500);   // 先执行run函数，把执行得到的结果，每500毫秒执行一次，不会在执行内部代码
    timer = setInterval("snake.run()", 100);  // 小技巧，每500毫秒执行字符串，字符串执行内部代码
};