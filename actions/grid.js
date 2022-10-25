
function Grid(){
    var _this = this;
    this.canvas = document.getElementById("background_drawer");
    this.rect = this.canvas.getBoundingClientRect();

    this.render = function(){
        console.log("rendering grid")
        var ctx = _this.canvas.getContext('2d');
        var x = _this.rect.width, y = _this.rect.height;
        for(let i=1; i<100; i++){
            ctx.moveTo(x*i/100,0);
            ctx.lineTo(x*i/100,y);
            ctx.stroke();

            ctx.moveTo(0,y*i/100);
            ctx.lineTo(x,y*i/100);
            ctx.stroke();
        }
    }

    this.render_px = function(){
        console.log("rendering grid")

        // 1. 设置网格大小
        var girdSize = 10;

        var ctx = _this.canvas.getContext('2d');

        // 2. 获取Canvas的width、height
        var CanvasWidth = _this.rect.width, CanvasHeight = _this.rect.height;

        // 3. 采用遍历的方式，绘画x轴的线条
        var xLineTotals = Math.floor(CanvasHeight / girdSize); // 计算需要绘画的x轴条数
        for (var i = 0; i < xLineTotals; i++) {
            ctx.beginPath(); // 开启路径，设置不同的样式
            ctx.moveTo(0, girdSize * i - 0.5); // -0.5是为了解决像素模糊问题
            ctx.lineTo(CanvasWidth, girdSize * i - 0.5);
            ctx.strokeStyle = "#ccc"; // 设置每个线条的颜色
            ctx.stroke();
        }

        // 4.采用遍历的方式，绘画y轴的线条
        var yLineTotals = Math.floor(CanvasWidth / girdSize); // 计算需要绘画y轴的条数
        for (var j = 0; j < yLineTotals; j++) {
            ctx.beginPath(); // 开启路径，设置不同的样式
            ctx.moveTo(girdSize * j, 0);
            ctx.lineTo(girdSize * j, CanvasHeight);
            ctx.strokeStyle = "#ccc"; // 设置每个线条的颜色
            ctx.stroke();
        }
    }
}

