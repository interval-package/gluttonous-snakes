function Snake(){
    
    var map = document.getElementById('map');

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

    // 显示蛇
    this.display = function() {
        // 创建蛇
        for (var i=0; i<this.body.length; i++) {
            if (this.body[i].x != null) {   // 当吃到食物时，x==null，不能新建，不然会在0，0处新建一个
                var s = document.createElement('div');
                // 将节点保存到状态中，以便于后面删除
                this.body[i].flag = s;
                // 设置宽高
                s.style.width = this.width + 'px';
                s.style.height = this.height + 'px';
                s.style.borderRadius =  "50%";
                s.style.background = "rgb(" + Math.floor(Math.random()*256) + "," + Math.floor(Math.random()*256) + "," + Math.floor(Math.random()*256) + ")";
                // 设置位置
                s.style.position = 'absolute';
                s.style.left = this.body[i].x * this.width + 'px';
                s.style.top = this.body[i].y * this.height + 'px';
                // 添加进去
                map.appendChild(s);
            }
        }
    };

    // 让蛇跑起来,后一个元素到前一个元素的位置
    // 蛇头根据方向处理，所以i不能等于0
    this.run = function() {
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
        if (this.body[0].x < 0 || this.body[0].x > 79 || this.body[0].y < 0 || this.body[0].y > 39) {
            clearInterval(timer);   // 清除定时器，
            alert("die");
            // 删除旧的
            for (var i=0; i<this.body.length; i++) {
                if (this.body[i].flag != null) {   // 如果刚吃完就死掉，会加一个值为null的
                    map.removeChild(this.body[i].flag);
                }
            }
            this.body = [   // 回到初始状态，
                {x:2, y:0},
                {x:1, y:0},
                {x:0, y:0}
            ];
            this.direction = 'right';
            this.display();   // 显示初始状态
            return false;   // 结束
        }

        // 判断蛇头吃到食物，xy坐标重合，
        if (this.body[0].x == food.x && this.body[0].y == food.y) {
            // 蛇加一节，因为根据最后节点定，下面display时，会自动赋值的
            this.body.push({x:null, y:null, flag: null});

            // 清除食物,重新生成食物
            map.removeChild(food.flag);
            food.display();
        }

        // 吃到自己死亡，从第五个开始与头判断，因为前四个永远撞不到
        for (var i=4; i<this.body.length; i++) {
            if (this.body[0].x == this.body[i].x && this.body[0].y == this.body[i].y) {
                clearInterval(timer);   // 清除定时器，
                alert("die");
                // 删除旧的
                for (var i=0; i<this.body.length; i++) {
                    if (this.body[i].flag != null) {   // 如果刚吃完就死掉，会加一个值为null的
                        map.removeChild(this.body[i].flag);
                    }
                }
                this.body = [   // 回到初始状态，
                    {x:2, y:0},
                    {x:1, y:0},
                    {x:0, y:0}
                ];
                this.direction = 'right';
                this.display();   // 显示初始状态
                return false;   // 结束
            }
        }

        // 先删掉初始的蛇，在显示新蛇
        for (var i=0; i<this.body.length; i++) {
            if (this.body[i].flag != null) {   // 当吃到食物时，flag是等于null，且不能删除
                map.removeChild(this.body[i].flag);
            }
        }

        // 重新显示蛇
        this.display();

    }
}