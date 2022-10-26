var snake = new Snake();
// var food = new Food();
var foods = [new Food(), new Food(), new Food()];
snake.display();   // 初始化显示
for(i in foods){
    foods[i].display();
}

// var map = document.getElementById("map");
// map.style.width = snake.width * snake.bound_x + "px";
// map.style.height = snake.height * snake.bound_y + "px";

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

var speed_up_rate = 1.5;
var interval = 100;
// 点击开始时，动起来
var begin = document.getElementById('start');
var timer;
begin.onclick = function() {
    clearInterval(timer);
    // timer = setInterval(snake.run(), 500);   // 先执行run函数，把执行得到的结果，每500毫秒执行一次，不会在执行内部代码
    timer = setInterval("snake.run(foods)",interval);  // 小技巧，每500毫秒执行字符串，字符串执行内部代码
};