var map = document.getElementById("map");

function Food(bound_x, bound_y){
    this.width = 10;
    this.height = 10;

    if(bound_x == undefined || bound_y == undefined){
        this.bound_x = 80;
        this.bound_y = 40;
    }else{
        this.bound_x = bound_x;
        this.bound_y = bound_y;
    }


    this.display = function() {
        var f = document.createElement('div');
        this.flag = f;
        f.style.width = this.width + 'px';
        f.style.height = this.height + 'px';
        f.style.background = 'red';
        f.style.borderRadius = '50%';
        f.style.position = 'absolute';
        this.x = Math.floor(Math.random()*this.bound_x);
        this.y = Math.floor(Math.random()*this.bound_y);
        f.style.left = this.x * this.width + 'px';
        f.style.top = this.y * this.height + 'px';
        map.appendChild(f);
    }
}