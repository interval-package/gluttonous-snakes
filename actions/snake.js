function Snake(){
    // var this = this;
    var map = document.getElementById('map');

    this.bound_x = 80;
    this.bound_y = 40;

    // 设置蛇的宽、高、默认走的方向
    this.width = 10;
    this.height = 10;
    this.direction = 'right';

    // 记住蛇的状态，当吃完食物的时候，就要加一个，初始为3个小点为一个蛇，
    this.body = [
        {x:2, y:0},   // 蛇头，第一个点
        {x:1, y:0},   // 蛇脖子，第二个点
        {x:0, y:0}    // 蛇尾，第三个点
    ];

    this.create_node = function(i){
        var snake_body_elem = document.createElement('div');
        this.body[i].flag = snake_body_elem;
        snake_body_elem.style.width = this.width + 'px';
        snake_body_elem.style.height = this.height + 'px';
        snake_body_elem.style.borderRadius =  "50%";
        if(i>0){
            snake_body_elem.style.backgroundColor = "blue";
        }else{
            snake_body_elem.style.backgroundColor = "red";
        }

        // 设置位置
        snake_body_elem.style.position = 'absolute';
        snake_body_elem.style.left = this.body[i].x * this.width + 'px';
        snake_body_elem.style.top = this.body[i].y * this.height + 'px';
        // 添加进去
        map.appendChild(snake_body_elem);
    }

    // 显示蛇
    this.display = function() {
        // 创建蛇
        for (var i=0; i<this.body.length; i++) {
            if (this.body[i].x != null) {   // 当吃到食物时，x==null，不能新建，不然会在0，0处新建一个
                this.create_node(i);
            }
        }
    };

    this.clear = function(){
        for (var i=0; i<this.body.length; i++) {
            if (this.body[i].flag != null) {   
                // 当吃到食物时，flag是等于null，且不能删除
                map.removeChild(this.body[i].flag);
            }
        }
    }

    this.eat = function(tar){
        // 判断蛇头吃到食物，xy坐标重合，
        if (this.body[0].x == tar.x && this.body[0].y == tar.y) {
            // 蛇加一节，因为根据最后节点定，下面display时，会自动赋值的
            this.body.push({x:null, y:null, flag: null});

            // 清除食物,重新生成食物
            map.removeChild(tar.flag);
            tar.display();

            console.log("eating!")

            interval /= speed_up_rate;
            clearInterval(timer);
            timer = setInterval("snake.run(foods)",interval)
        }
    }

    this.restart = function(){
        clearInterval(timer);   // 清除定时器，
        alert("you die");
        // 删除旧的
        this.clear();
        this.body = [   // 回到初始状态，
            {x:2, y:0},
            {x:1, y:0},
            {x:0, y:0}
        ];
        this.direction = 'right';
        this.display();   // 显示初始状态
        return false;   // 结束
    }

    // 让蛇跑起来,后一个元素到前一个元素的位置
    // 蛇头根据方向处理，所以i不能等于0
    this.run = function(foods) {
        // 后一个元素到前一个元素的位置
        for (var i=this.body.length-1; i>0; i--) {
            this.body[i].x = this.body[i-1].x;
            this.body[i].y = this.body[i-1].y;
        }

        // 根据方向处理蛇头
        switch(this.direction)
        {
            case "left":
                this.body[0].x -= 1;
                break;
            case "right":
                this.body[0].x += 1;
                break;
            case "up":
                this.body[0].y -= 1;
                break;
            case "down":
                this.body[0].y += 1;
                break;
        }


        // 判断是否出界,一蛇头判断,出界的话，
        if (this.body[0].x < 0 || this.body[0].x > this.bound_x || this.body[0].y < 0 || this.body[0].y > this.bound_y) {
            this.restart();
            return false;   // 结束
        }

        // 吃到自己死亡，从第五个开始与头判断，因为前四个永远撞不到
        for (var i=4; i<this.body.length; i++) {
            if (this.body[0].x == this.body[i].x && this.body[0].y == this.body[i].y) {
                this.restart();
                return false;   // 结束
            }
        }

        for(i in foods){
            this.eat(foods[i]);
        }

        // 先删掉初始的蛇，在显示新蛇
        this.clear();

        // 重新显示蛇
        this.display();

    }
}